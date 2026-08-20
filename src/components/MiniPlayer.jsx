import Icon from './Icon';
import { artStyle } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/**
 * 미니 플레이어 — 이 프로젝트의 주장 그 자체.
 * 어느 탭으로 이동해도 화면에서 사라지지 않습니다. 그래서 <main> 바깥, App 레벨에 둡니다.
 * 상태는 props로 받지 않고 Context에서 직접 꺼냅니다 (중간 컴포넌트가 몰라도 되게).
 */
export default function MiniPlayer() {
  const { track, isPlaying, liked, progress, toggle, setLiked, openPlayer } = usePlayer();

  return (
    <div className="relative shrink-0 border-t border-line bg-elevated">
      <div className="flex h-15 items-center gap-3 px-4">
        {/* 곡 정보 어디를 눌러도 플레이어가 확장됩니다 */}
        <button type="button" onClick={openPlayer} className="flex min-w-0 flex-1 items-center gap-3 text-left">
          <div className="size-10 shrink-0 rounded-md" style={artStyle(track.art)} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{track.title}</p>
            <p className="mt-0.5 truncate text-xs text-secondary">{track.artist}</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label="좋아요"
          aria-pressed={liked}
          className={`shrink-0 transition-colors ${liked ? 'text-accent' : 'text-secondary hover:text-primary'}`}
        >
          <Icon name="heart" size={20} />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? '일시정지' : '재생'}
          className="shrink-0 text-primary transition-transform active:scale-90"
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={24} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
        <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}
