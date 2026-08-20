import Cover from '../components/Cover';
import Icon from '../components/Icon';
import ProgressBar from '../components/ProgressBar';
import { lyrics, queue } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/** 초 단위 진행률을 mm:ss 로 — duration은 목업이라 고정 242초(4:02) 기준입니다 */
const TOTAL = 242;
const fmt = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

/**
 * 플레이어 — 이 리디자인의 핵심 화면.
 * 앨범아트를 108px로 줄인 대신, 남은 공간을 가사와 대기열에 나눠줬습니다.
 * 둘을 탭으로 가르지 않기 때문에 "가사 보다가 다음 곡을 확인"하는 이동이 사라집니다.
 */
export default function Player() {
  const { track, isPlaying, liked, progress, toggle, seek, setLiked, closePlayer } = usePlayer();

  return (
    <div className="animate-sheet-up h-full overflow-y-auto bg-base">
      <div className="mx-auto flex w-full max-w-[560px] flex-col pb-2">
      <div className="flex items-center justify-between px-4 pt-4">
        <button type="button" onClick={closePlayer} aria-label="닫기" className="text-primary hover:text-secondary">
          <Icon name="down" size={26} />
        </button>
        <p className="text-xs text-secondary">재생목록에서 재생 중</p>
        <button type="button" aria-label="더보기" className="text-primary hover:text-secondary">
          <Icon name="more" size={22} />
        </button>
      </div>

      <div className="flex items-start gap-6 px-5 pt-8">
        <Cover item={track} className="size-27 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1 pt-1">
          <p className="truncate text-[22px] font-bold tracking-tight">{track.title}</p>
          <p className="mt-1.5 truncate text-sm text-secondary">{track.artist}</p>
          <p className="mt-1.5 truncate text-xs text-disabled">다음 곡까지 {queue.length + 9}곡</p>
        </div>
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label="좋아요"
          aria-pressed={liked}
          className={`shrink-0 pt-1 transition-colors ${liked ? 'text-accent' : 'text-disabled hover:text-secondary'}`}
        >
          <Icon name="heart" size={22} />
        </button>
      </div>

      <div className="px-5 pt-8">
        <ProgressBar value={progress} onChange={seek} />
        <div className="mt-3 flex justify-between text-[11px] tabular-nums text-disabled">
          <span>{fmt(progress * TOTAL)}</span>
          <span>{fmt(TOTAL)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 pt-6">
        <button type="button" aria-label="셔플" className="text-disabled hover:text-secondary">
          <Icon name="shuffle" size={22} />
        </button>
        <button type="button" aria-label="이전 곡" className="text-primary active:scale-90">
          <Icon name="prev" size={30} />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? '일시정지' : '재생'}
          className="grid size-16 place-items-center rounded-full bg-accent transition-transform active:scale-95"
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={26} className={isPlaying ? 'text-white' : 'ml-1 text-white'} />
        </button>
        <button type="button" aria-label="다음 곡" className="text-primary active:scale-90">
          <Icon name="next" size={30} />
        </button>
        <button type="button" aria-label="반복" className="text-disabled hover:text-secondary">
          <Icon name="repeat" size={22} />
        </button>
      </div>

      {/* 가사 — 대기열과 같은 화면에 있습니다 */}
      <div className="mt-8 border-t border-line px-5 pt-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold">가사</h2>
          <button type="button" className="text-[11px] text-secondary hover:text-primary">
            전체 보기
          </button>
        </div>
        <ul className="mt-3 space-y-2">
          {lyrics.lines.map((line, i) => (
            <li
              key={line}
              className={
                i === lyrics.activeIndex
                  ? 'text-[17px] font-semibold text-accent'
                  : 'text-[15px] text-disabled'
              }
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* 대기열 시트 — 접히지 않고 늘 보입니다 */}
      <div className="mx-5 mt-6 mb-6 overflow-hidden rounded-card bg-elevated">
        <div className="flex items-center justify-between px-4 pt-3.5">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-accent">다음 곡</p>
          <button type="button" aria-label="대기열 펼치기" className="text-secondary hover:text-primary">
            <Icon name="up" size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 pt-2.5 pb-3">
          <Cover item={queue[0]} className="size-10 shrink-0 rounded-md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{queue[0].title}</p>
            <p className="mt-0.5 truncate text-[11px] text-secondary">{queue[0].artist}</p>
          </div>
        </div>
        <ul className="border-t border-line px-4 py-2.5">
          {queue.slice(1).map((q, i) => (
            <li key={q.id} className="flex items-center gap-3 py-1 text-xs">
              <span className="w-3 shrink-0 text-disabled">{i + 3}</span>
              <span className="min-w-0 flex-1 truncate text-secondary">{q.title}</span>
              <span className="shrink-0 text-disabled">· {q.artist}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
