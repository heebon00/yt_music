import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/**
 * 가로 스크롤 줄.
 *
 * - 좌우 화살표: 끝에 닿으면 그쪽이 사라져, 화살표 자체가 남은 양을 알려주는 표시가 됩니다.
 * - 마우스 드래그: PC 에서는 휠로 가로 스크롤이 안 되므로 잡아끌 수 있게 했습니다.
 *   터치는 브라우저 기본 스크롤이 관성까지 있어 더 자연스러우므로 가로채지 않습니다.
 */
export default function Carousel({ children }) {
  const ref = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [dragging, setDragging] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    // 스크롤 여지가 1px 이하면 화살표를 아예 띄우지 않습니다
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    sync();
    // 창 크기나 카드 수가 바뀌어도 다시 계산합니다
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  }, [sync]);

  const step = (dir) => {
    const el = ref.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  /* ── 마우스 드래그 스크롤 (클릭 방해 없는 안전한 구현) ── */
  const dragInfo = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    hasDragged: false,
  });

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    const el = ref.current;
    if (!el) return;
    dragInfo.current = {
      isDown: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      hasDragged: false,
    };
  };

  const onMouseMove = (e) => {
    const d = dragInfo.current;
    if (!d.isDown) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - d.startX;
    // 8px 이상 마우스를 끌었을 때만 드래그로 판정
    if (Math.abs(dx) > 8) {
      d.hasDragged = true;
      setDragging(true);
      el.scrollLeft = d.scrollLeft - dx;
    }
  };

  const onMouseUp = () => {
    const d = dragInfo.current;
    d.isDown = false;
    setDragging(false);
  };

  const onMouseLeave = () => {
    const d = dragInfo.current;
    d.isDown = false;
    setDragging(false);
  };

  // 실제로 드래그(8px 초과)했을 때만 카드의 클릭 이벤트를 막습니다
  const onClickCapture = (e) => {
    if (dragInfo.current.hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      dragInfo.current.hasDragged = false;
    }
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={sync}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onClickCapture={onClickCapture}
        className={`no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1 lg:px-8 ${
          dragging ? 'cursor-grabbing select-none' : ''
        }`}
      >
        {children}
      </div>

      {!atStart && <Arrow dir="left" onClick={() => step(-1)} />}
      {!atEnd && <Arrow dir="right" onClick={() => step(1)} />}
    </div>
  );
}

function Arrow({ dir, onClick }) {
  const left = dir === 'left';
  return (
    <>
      {/* 카드가 화살표 뒤로 자연스럽게 사라지도록 깔아주는 그라데이션 */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-16 ${
          left ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'
        } from-base to-transparent`}
      />
      <button
        type="button"
        onClick={onClick}
        aria-label={left ? '이전' : '다음'}
        className={`absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full
                    border border-line bg-surface/90 text-primary shadow-lg backdrop-blur-sm
                    transition-transform active:scale-90 ${left ? 'left-2 lg:left-3' : 'right-2 lg:right-3'}`}
      >
        <Icon name={left ? 'chevron-left' : 'chevron-right'} size={20} />
      </button>
    </>
  );
}
