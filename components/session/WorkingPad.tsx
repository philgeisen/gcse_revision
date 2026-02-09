import { useEffect, useRef, useState } from 'react';

export type Stroke = {
  tool: string;
  width: number;
  color: string;
  points: { x: number; y: number; t: number }[];
};

export const WorkingPad = ({
  onSave
}: {
  onSave: (strokes: Stroke[]) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [tool, setTool] = useState('pen');
  const [width, setWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0C0F14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    strokes.forEach((stroke) => {
      ctx.strokeStyle = stroke.tool === 'eraser' ? '#0C0F14' : stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.beginPath();
      stroke.points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  }, [strokes]);

  const startStroke = (x: number, y: number) => {
    const newStroke: Stroke = {
      tool,
      width,
      color: '#E6EAF2',
      points: [{ x, y, t: Date.now() }]
    };
    setStrokes((prev) => [...prev, newStroke]);
    setRedoStack([]);
  };

  const extendStroke = (x: number, y: number) => {
    setStrokes((prev) => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      if (!last) return prev;
      last.points.push({ x, y, t: Date.now() });
      return updated;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    startStroke(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.buttons !== 1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    extendStroke(event.clientX - rect.left, event.clientY - rect.top);
  };

  return (
    <div className="rounded-xl border border-stroke bg-panel p-3">
      <div className="flex flex-wrap gap-2 pb-3">
        <button type="button" className="rounded border border-stroke px-2 py-1 text-xs" onClick={() => setTool('pen')}>
          Pen
        </button>
        <button type="button" className="rounded border border-stroke px-2 py-1 text-xs" onClick={() => setTool('eraser')}>
          Eraser
        </button>
        <button type="button" className="rounded border border-stroke px-2 py-1 text-xs" onClick={() => setWidth(2)}>
          Fine
        </button>
        <button type="button" className="rounded border border-stroke px-2 py-1 text-xs" onClick={() => setWidth(4)}>
          Standard
        </button>
        <button type="button" className="rounded border border-stroke px-2 py-1 text-xs" onClick={() => setWidth(6)}>
          Bold
        </button>
        <button
          type="button"
          className="rounded border border-stroke px-2 py-1 text-xs"
          onClick={() => {
            setRedoStack((prev) => [strokes[strokes.length - 1], ...prev].filter(Boolean) as Stroke[]);
            setStrokes((prev) => prev.slice(0, -1));
          }}
        >
          Undo
        </button>
        <button
          type="button"
          className="rounded border border-stroke px-2 py-1 text-xs"
          onClick={() => {
            const redo = redoStack[0];
            if (!redo) return;
            setRedoStack((prev) => prev.slice(1));
            setStrokes((prev) => [...prev, redo]);
          }}
        >
          Redo
        </button>
        <button type="button" className="rounded border border-stroke px-2 py-1 text-xs" onClick={() => setStrokes([])}>
          Clear
        </button>
        <button
          type="button"
          className="ml-auto rounded border border-stroke px-2 py-1 text-xs"
          onClick={() => onSave(strokes)}
        >
          Attach Working
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        className="w-full rounded border border-stroke bg-ink"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      />
    </div>
  );
};
