import Icon from '../components/Icon';
import TrackRow from '../components/TrackRow';
import { playlistRows, recentLists, queue, artStyle } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/** 재생목록 — 이 탭의 존재 이유가 맨 위 '지금 재생 중' 카드입니다. */
export default function Playlist() {
  const { track, play, openPlayer } = usePlayer();

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-5 lg:px-8 pt-5 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">재생목록</h1>
        <button type="button" aria-label="새 재생목록" className="text-primary hover:text-secondary">
          <Icon name="plus" size={24} />
        </button>
      </div>

      <div className="px-5 lg:px-8">
        <button
          type="button"
          onClick={openPlayer}
          className="flex w-full items-center gap-4 rounded-card bg-elevated p-3 text-left transition-colors hover:bg-line/40"
        >
        <div className="size-16 shrink-0 rounded-art" style={artStyle(track.art)} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-accent">
            지금 재생 중 · 대기열 {queue.length + 9}곡
          </p>
          <p className="mt-0.5 truncate text-[17px] font-semibold tracking-tight">{track.title}</p>
          <p className="mt-1 truncate text-[13px] text-secondary">{track.artist}</p>
        </div>
          <Icon name="up" size={22} className="shrink-0 text-secondary" />
        </button>
      </div>

      <section className="pt-7">
        <div className="mb-2 flex items-baseline justify-between px-5 lg:px-8">
          <h2 className="text-[15px] font-semibold">내 재생목록</h2>
          <button type="button" className="text-xs text-secondary hover:text-primary">
            전체 보기
          </button>
        </div>
        {playlistRows.map((item) => (
          <TrackRow key={item.id} item={item} onPlay={play} />
        ))}
      </section>

      <section className="pt-7">
        <h2 className="mb-2 px-5 lg:px-8 text-[15px] font-semibold">최근 들은 목록</h2>
        {recentLists.map((item) => (
          <TrackRow key={item.id} item={item} onPlay={play} />
        ))}
      </section>
    </div>
  );
}
