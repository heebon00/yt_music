import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon';

/**
 * 가로 스크롤 줄.
 *
 * 좌우에 화살표를 띄워 "옆에 더 있다"를 눈에 보이게 합니다.
 * 끝에 닿으면 그쪽 화살표는 사라지므로, 화살표 자체가 남은 양을 알려주는 표시가 됩니다.
 * 스크롤·리사이즈·자식 변경을 모두 감지해야 화살표 상태가 어긋나지 않습니다.
 */
export default function Carousel({ children }) {
  const ref = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

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

  return (
    <div className="relative">
      <div ref={ref} onScroll={sync} className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1 lg:px-8">
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
