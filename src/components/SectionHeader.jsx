/** 섹션 제목 + 우측 '전체 보기' — 홈의 모든 섹션이 이 한 줄을 씁니다 */
export default function SectionHeader({ title, action = '전체 보기', onAction }) {
  return (
    <div className="mb-3.5 flex items-baseline justify-between px-5">
      <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="text-xs text-secondary transition-colors hover:text-primary"
        >
          {action}
        </button>
      )}
    </div>
  );
}
