import Icon from './Icon';
import { artStyle } from '../data/mock';

/**
 * 가로 캐러셀용 정사각 카드 (나의 재생목록 / 빠른 선곡)
 * 마우스를 올리면 아트 위에 재생 버튼이 떠오릅니다 — 상세 화면에 들어갈 필요를 없앤 인터랙션.
 */
export default function AlbumCard({ item, onPlay }) {
  return (
    <button
      type="button"
      onClick={() => onPlay?.(item)}
      className="group w-31 shrink-0 text-left lg:w-40"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-art" style={artStyle(item.art)}>
        {/* hover 시에만 나타나는 어둠막 + 재생 버튼 */}
        <div className="absolute inset-0 bg-black/35 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span
          className="absolute right-2 bottom-2 grid size-9 translate-y-1.5 place-items-center rounded-full bg-accent
                     opacity-0 shadow-lg transition-all duration-200
                     group-hover:translate-y-0 group-hover:opacity-100
                     group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <Icon name="play" size={18} className="ml-0.5 text-white" />
        </span>
      </div>
      <p className="mt-3 truncate text-[13px] font-medium">{item.title}</p>
      <p className="mt-0.5 truncate text-[11px] text-secondary">{item.sub}</p>
    </button>
  );
}
