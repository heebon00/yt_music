import Cover from './Cover';
import Icon from './Icon';

/** 보관함 · 재생목록 · 대기열이 공용으로 쓰는 리스트 행 */
export default function TrackRow({ item, onPlay, active = false }) {
  return (
    <div className="group flex items-center gap-4 px-5 lg:px-8 py-2.5 transition-colors hover:bg-surface">
      <button type="button" onClick={() => onPlay?.(item)} className="flex min-w-0 flex-1 items-center gap-4 text-left">
        <Cover item={item} className="size-11 shrink-0 rounded-md" />
        <div className="min-w-0">
          <p className={`truncate text-[15px] font-medium ${active ? 'text-accent' : ''}`}>{item.title}</p>
          <p className="mt-0.5 truncate text-[13px] text-secondary">{item.artist}</p>
        </div>
      </button>
      <button type="button" aria-label="더보기" className="shrink-0 text-disabled transition-colors hover:text-secondary">
        <Icon name="more" size={20} />
      </button>
    </div>
  );
}
