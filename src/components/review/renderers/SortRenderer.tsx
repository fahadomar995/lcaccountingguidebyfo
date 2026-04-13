import { useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { SortData } from '@/data/chapter-review-bank';

interface Props {
  data: SortData;
  submitted: boolean;
  onSubmit: (result: 'correct' | 'wrong') => void;
}

function DraggableItem({ id, label, isCorrect, isWrong, disabled }: {
  id: string; label: string; isCorrect?: boolean; isWrong?: boolean; disabled: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 20 : 0,
  };

  let classes = 'px-3 py-1.5 rounded-full border text-xs font-medium transition-all touch-none inline-block ';
  if (isCorrect) classes += 'border-accent bg-accent/10 text-accent';
  else if (isWrong) classes += 'border-destructive/50 bg-destructive/5 text-destructive';
  else if (isDragging) classes += 'border-accent bg-accent/5 text-foreground shadow-md opacity-80';
  else if (!disabled) classes += 'border-border bg-card text-foreground hover:border-accent/40 cursor-grab';
  else classes += 'border-border bg-card text-foreground';

  return (
    <div ref={setNodeRef} style={style} className={classes} {...listeners} {...attributes}>
      {label}
    </div>
  );
}

function DroppableBucket({ id, label, items, submitted, correctMap }: {
  id: string; label: string; items: string[]; submitted: boolean; correctMap: Record<string, boolean>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-h-[80px] rounded-lg border-2 border-dashed p-3 transition-colors ${
        isOver ? 'border-accent bg-accent/5' : 'border-border bg-muted/20'
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map(itemId => (
          <DraggableItem
            key={itemId}
            id={itemId}
            label={itemId}
            isCorrect={submitted ? correctMap[itemId] === true : undefined}
            isWrong={submitted ? correctMap[itemId] === false : undefined}
            disabled={submitted}
          />
        ))}
      </div>
    </div>
  );
}

export default function SortRenderer({ data, submitted, onSubmit }: Props) {
  // Initialize all items in an "unsorted" pool
  const [assignments, setAssignments] = useState<Record<string, string>>(() => {
    const a: Record<string, string> = {};
    // Shuffle items
    const shuffled = [...data.items].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => { a[item.label] = '__pool__'; });
    return a;
  });
  const [correctMap, setCorrectMap] = useState<Record<string, boolean>>({});

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const poolItems = Object.entries(assignments).filter(([, b]) => b === '__pool__').map(([l]) => l);
  const bucketItems = (bucket: string) =>
    Object.entries(assignments).filter(([, b]) => b === bucket).map(([l]) => l);

  const handleDragEnd = (event: DragEndEvent) => {
    if (submitted) return;
    const { active, over } = event;
    if (!over) return;

    const itemLabel = active.id as string;
    const targetBucket = over.id as string;

    // Only accept drops on bucket IDs or pool
    if (targetBucket === '__pool__' || data.buckets.includes(targetBucket)) {
      setAssignments(prev => ({ ...prev, [itemLabel]: targetBucket }));
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    const cMap: Record<string, boolean> = {};
    let allCorrect = true;
    data.items.forEach(item => {
      const assigned = assignments[item.label];
      const correct = assigned === item.correctBucket;
      cMap[item.label] = correct;
      if (!correct) allCorrect = false;
    });
    setCorrectMap(cMap);
    onSubmit(allCorrect ? 'correct' : 'wrong');
  };

  const allPlaced = poolItems.length === 0;

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Pool */}
        {poolItems.length > 0 && (
          <DroppableBucket
            id="__pool__"
            label="Drag each item to the correct bucket"
            items={poolItems}
            submitted={submitted}
            correctMap={correctMap}
          />
        )}

        {/* Buckets */}
        <div className={`grid gap-3 mt-3 ${data.buckets.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {data.buckets.map(bucket => (
            <DroppableBucket
              key={bucket}
              id={bucket}
              label={bucket}
              items={bucketItems(bucket)}
              submitted={submitted}
              correctMap={correctMap}
            />
          ))}
        </div>
      </DndContext>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allPlaced}
          className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      )}
    </div>
  );
}
