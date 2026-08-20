import { artStyle } from '../data/mock';

/** Shorts에서 들은 음악 — 9:16 세로 카드. 곡 정보는 아트 위에 얹습니다. */
export default function ShortsCard({ item, onPlay }) {
  return (
    <button
      type="button"
      onClick={() => onPlay?.(item)}
      className="group relative aspect-[118/210] w-[118px] shrink-0 lg:w-[150px] overflow-hidden rounded-xl text-left"
      style={artStyle(item.art)}
    >
      <span className="absolute top-2.5 left-2.5 rounded-md bg-black/55 px-2 py-1 text-[9px] font-semibold tracking-widest text-white">
        Shorts
      </span>
      {/* 글자 가독성을 위한 하단 그라디언트 스크림 */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-x-2.5 bottom-3">
        <p className="truncate text-[13px] font-semibold text-white">{item.title}</p>
        <p className="mt-1 truncate text-[11px] text-white/75">{item.artist}</p>
      </div>
    </button>
  );
}
