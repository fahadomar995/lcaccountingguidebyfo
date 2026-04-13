import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { OrderData } from '@/data/chapter-review-bank';

interface Props {
  data: OrderData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong') => void;
}

function SortableStep({ id, label, index, isCorrect, isWrong, disabled }: {
  id: string; label: string; index: number; isCorrect?: boolean; isWrong?: boolean; disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  let classes = 'flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs transition-all touch-none ';
  if (isCorrect) classes += 'border-accent bg-accent/10 text-accent';
  else if (isWrong) classes += 'border-destructive/50 bg-destructive/5 text-destructive';
  else if (isDragging) classes += 'border-accent bg-accent/5 text-foreground shadow-md';
  else classes += 'border-border bg-card text-foreground hover:border-accent/40 cursor-grab';

  return (
    <div ref={setNodeRef} style={style} className={classes} {...attributes} {...listeners}>
      <GripVertical className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="font-mono text-[10px] text-muted-foreground shrink-0">{index + 1}</span>
      <span className="flex-1">{label}</span>
    </div>
  );
}

export default function OrderRenderer({ data, submitted, onSubmit }: Props) {
  // Shuffle steps
  const [order, setOrder] = useState<string[]>(() => {
    const ids = data.steps.map((_, i) => `step-${i}`);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  });

  const [results, setResults] = useState<Record<string, boolean>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (submitted) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder(prev => {
      const oldIndex = prev.indexOf(active.id as string);
      const newIndex = prev.indexOf(over.id as string);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    const res: Record<string, boolean> = {};
    let allCorrect = true;
    order.forEach((stepId, i) => {
      const correctIdx = parseInt(stepId.split('-')[1]);
      const isCorrect = correctIdx === i;
      res[stepId] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });
    setResults(res);
    onSubmit(allCorrect ? 'correct' : 'wrong');
  };

  // If submitted and wrong, show correct order
  const showCorrectOrder = submitted && Object.values(results).some(v => !v);

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Drag the steps into the correct order
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {order.map((id, i) => {
              const stepIdx = parseInt(id.split('-')[1]);
              return (
                <SortableStep
                  key={id}
                  id={id}
                  label={data.steps[stepIdx]}
                  index={i}
                  isCorrect={submitted ? results[id] === true : undefined}
                  isWrong={submitted ? results[id] === false : undefined}
                  disabled={submitted}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {showCorrectOrder && (
        <div className="mt-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-2">Correct order</p>
          {data.steps.map((step, i) => (
            <p key={i} className="text-xs text-foreground leading-relaxed">
              <span className="font-mono text-[10px] text-accent mr-1.5">{i + 1}.</span>
              {step}
            </p>
          ))}
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Submit
        </button>
      )}
    </div>
  );
}
