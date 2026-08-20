import Icon from './Icon';
import { artStyle } from '../data/mock';

/**
 * 미니 플레이어 — 이 프로젝트의 주장 그 자체.
 * 어느 탭으로 이동해도 화면에서 사라지지 않습니다. 그래서 App 최상단에 고정으로 둡니다.
 */
export default function MiniPlayer({ track, isPlaying, onToggle, onExpand, onLike, liked }) {
  return (
    <div className="relative border-t border-line bg-elevated">
      <div className="flex h-15 items-center gap-3 px-4">
        {/* 카드 전체가 확장 버튼 — 곡 정보 어디를 눌러도 플레이어가 열립니다 */}
        <button type="button" onClick={onExpand} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <div className="size-10 shrink-0 rounded-md" style={artStyle(track.art)} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{track.title}</p>
            <p className="mt-0.5 truncate text-xs text-secondary">{track.artist}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={onLike}
          aria-label="좋아요"
          aria-pressed={liked}
          className={`shrink-0 transition-colors ${liked ? 'text-accent' : 'text-secondary hover:text-primary'}`}
        >
          <Icon name="heart" size={20} />
        </button>
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? '일시정지' : '재생'}
          className="shrink-0 text-primary transition-transform active:scale-90"
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={24} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
        <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${track.progress * 100}%` }} />
      </div>
    </div>
  );
}
