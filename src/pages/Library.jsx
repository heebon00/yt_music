import { useState } from 'react';
import Icon from '../components/Icon';
import TrackRow from '../components/TrackRow';
import { savedTracks, libraryFilters, genres, artStyle } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/**
 * 보관함 — 보관함과 둘러보기를 세그먼트 하나로 합쳤습니다.
 * 화면을 바꾸지 않고 목록만 갈아끼우기 때문에 뒤로 돌아올 이동이 생기지 않습니다.
 */
export default function Library() {
  const [segment, setSegment] = useState('library'); // 'library' | 'explore'
  const [filter, setFilter] = useState('전체');
  const { play, track } = usePlayer();

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-5 lg:px-8 pt-5 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">보관함</h1>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="검색" className="text-primary hover:text-secondary">
            <Icon name="search" size={24} />
          </button>
          <button type="button" aria-label="추가" className="text-primary hover:text-secondary">
            <Icon name="plus" size={24} />
          </button>
        </div>
      </div>

      {/* 세그먼트 — 라우팅 없이 이 상태 하나로 갈립니다 */}
      <div className="mx-5 lg:mx-8 grid grid-cols-2 rounded-full bg-surface p-1">
        {[
          ['library', '보관함'],
          ['explore', '둘러보기'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSegment(id)}
            aria-pressed={segment === id}
            className={`rounded-full py-2 text-sm transition-colors ${
              segment === id ? 'bg-elevated font-semibold text-primary' : 'text-secondary hover:text-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {segment === 'library' ? (
        <>
          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5 lg:px-8">
            {libraryFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[13px] transition-colors ${
                  filter === f
                    ? 'border-accent bg-accent font-semibold text-white'
                    : 'border-line bg-surface text-secondary hover:text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between px-5 lg:px-8">
            <button type="button" className="flex items-center gap-1 text-xs text-secondary hover:text-primary">
              최근 추가순
              <Icon name="down" size={14} />
            </button>
            <button type="button" aria-label="보기 방식" className="text-disabled hover:text-secondary">
              <Icon name="grid" size={18} />
            </button>
          </div>

          <div className="mt-2">
            {savedTracks.map((item) => (
              <TrackRow key={item.id} item={item} onPlay={play} active={item.id === track.id} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 px-5 lg:px-8">
          {genres.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => play({ id: g.id, title: g.name, sub: '장르 라디오', art: g.art })}
              className="flex h-19 items-end rounded-xl p-4 text-left transition-transform active:scale-[0.98]"
              style={artStyle(g.art)}
            >
              <span className="text-[17px] font-bold text-white">{g.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
