'use client';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { ContentItem } from '@/types/content';
import ContentCard from './ContentCard';

const ITEM_TYPE = 'CONTENT_CARD';

interface DraggableCardProps {
  content: ContentItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isDraggingEnabled?: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function DraggableCard({ 
  content, 
  index, 
  moveCard,
  isDraggingEnabled = true 
}: DraggableCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Simplified for grid layout: just swap when hovering over another card
      // This allows dropping in any direction (left, right, up, down)
      moveCard(dragIndex, hoverIndex);

      // Update the index for performance
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: content.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggingEnabled,
  });

  const opacity = isDragging ? 0.4 : 1;

  // Combine drag and drop refs
  if (isDraggingEnabled) {
    drag(drop(ref));
  }

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`relative ${isDragging ? 'scale-105' : ''} transition-all duration-200 cursor-move`}
    >
      {/* {isDraggingEnabled && (
        <div className="absolute top-2 left-2 z-10 bg-white/80 dark:bg-gray-800/80 rounded p-1 text-gray-500 dark:text-gray-400 backdrop-blur-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      )} */}
      <ContentCard content={content} />
    </div>
  );
}
