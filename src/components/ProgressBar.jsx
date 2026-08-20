import { useCallback, useRef, useState } from 'react';

/**
 * 드래그 가능한 진행 바.
 * 포인터 이벤트 + setPointerCapture 라서 마우스가 바 밖으로 나가도 드래그가 이어집니다(터치도 동일).
 */
export default function ProgressBar({ value, onChange }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const ratioFrom = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const start = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    onChange(ratioFrom(e.clientX));
  };
  const move = (e) => dragging && onChange(ratioFrom(e.clientX));
  const end = (e) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={start}
      onPointerMove={move}
      onPointerUp={end}
      onPointerCancel={end}
      role="slider"
      aria-label="재생 위치"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onChange(value + 0.02);
        if (e.key === 'ArrowLeft') onChange(value - 0.02);
      }}
      className="group relative -my-3 cursor-pointer touch-none py-3"
    >
      <div className="h-[3px] w-full rounded-full bg-line">
        <div className="h-full rounded-full bg-accent" style={{ width: `${value * 100}%` }} />
      </div>
      {/* 손잡이 — 드래그 중이거나 마우스를 올리면 커집니다 */}
      <span
        className={`absolute top-1/2 -ml-1.5 size-3 -translate-y-1/2 rounded-full bg-accent transition-transform ${
          dragging ? 'scale-125' : 'scale-100 group-hover:scale-125'
        }`}
        style={{ left: `${value * 100}%` }}
      />
    </div>
  );
}
