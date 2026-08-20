import Cover from '../components/Cover';
import { useMemo } from 'react';
import Icon from '../components/Icon';
import TrackRow from '../components/TrackRow';
import { playlistRows, recentLists, queueCount, randomCover } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/** 재생목록 — 이 탭의 존재 이유가 맨 위 '지금 재생 중' 카드입니다. */
export default function Playlist() {
  const { track, play, openPlayer } = usePlayer();

  // 재생목록 대표 자켓 — 수록곡 중 무작위로 한 번만 뽑습니다
  const mine = useMemo(() => playlistRows.map((p) => ({ ...p, cover: randomCover(p.trackIds) })), []);
  const recent = useMemo(() => recentLists.map((p) => ({ ...p, cover: randomCover(p.trackIds) })), []);

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4 lg:px-8">
        <h1 className="min-w-0 flex-1 truncate text-2xl font-bold tracking-tight">재생목록</h1>
        <button type="button" aria-label="새 재생목록" className="shrink-0 text-primary hover:text-secondary">
          <Icon name="plus" size={24} />
        </button>
      </div>

      <div className="px-5 lg:px-8">
        <button
          type="button"
          onClick={openPlayer}
          className="flex w-full items-center gap-4 rounded-card bg-elevated p-3 text-left transition-colors hover:bg-line/40"
        >
        <Cover item={track} className="size-16 shrink-0 rounded-art" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.08em] text-accent-bright">
            지금 재생 중 · 대기열 {queueCount}곡
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
        {mine.map((item) => (
          <TrackRow key={item.id} item={item} onPlay={play} />
        ))}
      </section>

      <section className="pt-7">
        <h2 className="mb-2 px-5 lg:px-8 text-[15px] font-semibold">최근 들은 목록</h2>
        {recent.map((item) => (
          <TrackRow key={item.id} item={item} onPlay={play} />
        ))}
      </section>
    </div>
  );
}
