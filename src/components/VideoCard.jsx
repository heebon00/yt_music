import Cover from './Cover';

/** 맞춤 추천 뮤직비디오 — 16:9 썸네일 + MV 뱃지 */
export default function VideoCard({ item, onPlay }) {
  return (
    <button
      type="button"
      onClick={() => onPlay?.(item)}
      className="w-60 shrink-0 text-left lg:w-72 cursor-pointer transition-transform active:scale-[0.98]"
    >
      <Cover item={item} className="aspect-video w-full rounded-art">
        <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white">
          {item.duration}
        </span>
      </Cover>
      <p className="mt-2.5 truncate text-sm font-medium">{item.title}</p>
      <p className="mt-0.5 truncate text-xs text-secondary">{item.sub}</p>
    </button>
  );
}
