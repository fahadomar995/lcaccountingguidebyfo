import { useState, useMemo } from 'react';
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
import type { MatchData } from '@/data/chapter-review-bank';

interface Props {
  data: MatchData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong') => void;
}

function SortableCard({ id, label, isCorrect, isWrong, disabled }: {
  id: string; label: string; isCorrect?: boolean; isWrong?: boolean; disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  let classes = 'px-3 py-2 rounded-lg border text-xs transition-all touch-none ';
  if (isCorrect) classes += 'border-accent bg-accent/10 text-accent';
  else if (isWrong) classes += 'border-destructive/50 bg-destructive/5 text-destructive animate-shake';
  else if (isDragging) classes += 'border-accent bg-accent/5 text-foreground shadow-md';
  else classes += 'border-border bg-card text-foreground hover:border-accent/40 cursor-grab';

  return (
    <div ref={setNodeRef} style={style} className={classes} {...attributes} {...listeners}>
      {label}
    </div>
  );
}

export default function MatchRenderer({ data, submitted, onSubmit }: Props) {
  // Shuffle definitions once
  const [defOrder, setDefOrder] = useState<string[]>(() => {
    const ids = data.pairs.map((_, i) => `def-${i}`);
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

    setDefOrder(prev => {
      const oldIndex = prev.indexOf(active.id as string);
      const newIndex = prev.indexOf(over.id as string);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    const res: Record<string, boolean> = {};
    let allCorrect = true;
    defOrder.forEach((defId, i) => {
      const defIdx = parseInt(defId.split('-')[1]);
      const isCorrect = defIdx === i;
      res[defId] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });
    setResults(res);
    onSubmit(allCorrect ? 'correct' : 'wrong');
  };

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
        Drag definitions to match the terms
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Left: Terms (fixed) */}
        <div className="space-y-2">
          {data.pairs.map((pair, i) => (
            <div key={i} className="px-3 py-2 rounded-lg border border-accent/20 bg-accent/5 text-xs font-medium text-foreground">
              {pair.term}
            </div>
          ))}
        </div>

        {/* Right: Definitions (sortable) */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={defOrder} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {defOrder.map(id => {
                const idx = parseInt(id.split('-')[1]);
                return (
                  <SortableCard
                    key={id}
                    id={id}
                    label={data.pairs[idx].definition}
                    isCorrect={submitted ? results[id] === true : undefined}
                    isWrong={submitted ? results[id] === false : undefined}
                    disabled={submitted}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>

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
