/**
 * 아이콘 세트 — 피그마 `Icon` 컴포넌트(16 variants)와 같은 패스입니다.
 * 색은 currentColor 라서 부모의 text-* 클래스를 그대로 따라갑니다.
 *   <Icon name="play" className="text-accent-bright" />
 */

const PATHS = {
  home: 'M12 3l9 8.2h-3V21h-4.8v-5.8h-2.4V21H6v-9.8H3z',
  search:
    'M10.5 3a7.5 7.5 0 105.2 12.9l4.3 4.2 1.5-1.5-4.2-4.3A7.5 7.5 0 0010.5 3zm0 2.2a5.3 5.3 0 110 10.6 5.3 5.3 0 010-10.6z',
  playlist: 'M3 5h13v2H3zm0 4.5h13v2H3zm0 4.5h9v2H3zM15.5 12.4l6 3.6-6 3.6z',
  library: 'M4 5h2.4v14H4zm4.4 0h2.4v14H8.4zM14 5.6l2.3-.6L20 18.4l-2.3.6z',
  play: 'M8 5v14l11-7z',
  pause: 'M6 5h4v14H6zM14 5h4v14h-4z',
  prev: 'M6 6h2.2v12H6zm3.6 6l8.4 6V6z',
  next: 'M15.8 6H18v12h-2.2zM14.4 12L6 18V6z',
  heart:
    'M12 20.6S4.6 16 2.8 12C1.4 8.8 3.3 5.6 6.5 5.6c1.9 0 3.1 1 4.5 2.6h2c1.4-1.6 2.6-2.6 4.5-2.6 3.2 0 5.1 3.2 3.7 6.4-1.8 4-9.2 8.6-9.2 8.6z',
  shuffle:
    'M16.5 3.5L21 8l-4.5 4.5V9.6h-2L13 11.4l-1.4-1.7 2.1-2.5h2.8zM3 7.6h4.4l7.1 8.8h2v-2.9L21 18l-4.5 4.5v-2.9h-3.5l-7.1-8.8H3zM3 18v-2h3.2l1.7-2.1 1.4 1.7L7 18z',
  repeat: 'M7 7.6h9.4V5l4 3.8-4 3.8V10H8.9v3.4H7zm10 8.8H7.6V19l-4-3.8 4-3.8v2.6h11z',
  more: 'M5.5 10a2 2 0 100 4 2 2 0 000-4zm6.5 0a2 2 0 100 4 2 2 0 000-4zm6.5 0a2 2 0 100 4 2 2 0 000-4z',
  plus: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z',
  down: 'M6.4 9.2L12 14.8l5.6-5.6 1.5 1.5-7.1 7-7.1-7z',
  up: 'M6.4 14.8L12 9.2l5.6 5.6 1.5-1.5-7.1-7-7.1 7z',
  grid: 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z',
};

export default function Icon({ name, size = 24, className = '' }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
