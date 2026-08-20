import Cover from './Cover';
import Icon from './Icon';

/**
 * 이어듣기 카드 — 이 리디자인의 핵심.
 * 앱을 열자마자 마지막 재생 지점으로 1탭 복귀. 하단의 얇은 라인이 어디까지 들었는지입니다.
 */
export default function ContinueCard({ track, isPlaying, onToggle }) {
  return (
    <div className="relative mx-5 overflow-hidden rounded-card bg-elevated lg:mx-8">
      <div className="flex items-center gap-4 p-3">
        <Cover item={track} className="size-16 shrink-0 rounded-art" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-accent-bright">이어듣기</p>
          <p className="mt-0.5 truncate text-[17px] font-semibold tracking-tight">{track.title}</p>
          <p className="mt-1 truncate text-[13px] text-secondary">{track.artist}</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? '일시정지' : '재생'}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent transition-transform active:scale-95"
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={20} className={isPlaying ? 'text-white' : 'ml-0.5 text-white'} />
        </button>
      </div>
      {/* 재생 진행률 */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
        <div className="h-full bg-accent" style={{ width: `${track.progress * 100}%` }} />
      </div>
    </div>
  );
}
