import { useMemo, useRef, useState } from 'react';
import Icon from '../components/Icon';
import TrackRow from '../components/TrackRow';
import { recentQueries as initialRecentQueries, genres, tracks, myPlaylists, artStyle } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/**
 * 검색 페이지 — 실시간 라이브 검색 및 장르 탐색
 */
export default function Search() {
  const { play, track: currentTrack } = usePlayer();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentList, setRecentList] = useState(initialRecentQueries);
  const inputRef = useRef(null);

  const allTracks = useMemo(() => Object.values(tracks), []);

  // 실시간 검색 결과 필터링
  const { matchedTracks, matchedPlaylists } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { matchedTracks: [], matchedPlaylists: [] };

    const filteredTracks = allTracks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q),
    );

    const filteredPlaylists = myPlaylists.filter((p) => p.title.toLowerCase().includes(q));

    return { matchedTracks: filteredTracks, matchedPlaylists: filteredPlaylists };
  }, [query, allTracks]);

  const hasQuery = query.trim().length > 0;
  const hasResults = matchedTracks.length > 0 || matchedPlaylists.length > 0;

  const handleSelectQuery = (q) => {
    setQuery(q);
    setIsFocused(true);
    // 최근 검색어 맨 앞으로 이동
    setRecentList((prev) => [q, ...prev.filter((item) => item !== q)]);
  };

  const handleClearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleClearRecent = () => {
    setRecentList([]);
  };

  const handlePlayTrack = (item) => {
    // 검색에서 곡을 재생할 때 최근 검색어에 추가
    if (query.trim() && !recentList.includes(query.trim())) {
      setRecentList((prev) => [query.trim(), ...prev.slice(0, 7)]);
    }
    play(item);
  };

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between px-5 pt-5 pb-4 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight">검색</h1>
        {hasQuery && (
          <button
            type="button"
            onClick={handleClearQuery}
            className="text-xs font-semibold text-accent-bright transition-colors hover:underline"
          >
            초기화
          </button>
        )}
      </div>

      {/* 검색 입력창 */}
      <div className="px-5 lg:px-8">
        <div
          className={`flex h-11.5 w-full items-center gap-3 rounded-full border bg-surface px-4 transition-all ${
            isFocused || hasQuery
              ? 'border-accent-bright ring-1 ring-accent-bright/30 bg-elevated'
              : 'border-line hover:border-disabled'
          }`}
        >
          <Icon name="search" size={22} className="shrink-0 text-secondary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="아티스트, 곡, 앨범, 장르 검색"
            className="w-full bg-transparent text-[15px] text-primary placeholder:text-disabled focus:outline-none"
          />
          {hasQuery && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClearQuery}
              aria-label="검색어 지우기"
              className="grid size-5 shrink-0 place-items-center rounded-full bg-line text-secondary hover:text-primary transition-colors cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── 검색어 입력 시 실시간 검색 결과 영역 ── */}
      {hasQuery ? (
        <div className="animate-fade-in pt-5">
          {hasResults ? (
            <div className="space-y-6">
              {matchedTracks.length > 0 && (
                <section>
                  <div className="mb-2 px-5 lg:px-8">
                    <h2 className="text-[15px] font-semibold text-primary">
                      곡 <span className="ml-1 text-xs font-normal text-secondary">{matchedTracks.length}</span>
                    </h2>
                  </div>
                  <div className="divide-y divide-line/20">
                    {matchedTracks.map((item) => (
                      <TrackRow
                        key={item.id}
                        item={item}
                        onPlay={handlePlayTrack}
                        active={currentTrack?.id === item.id}
                      />
                    ))}
                  </div>
                </section>
              )}

              {matchedPlaylists.length > 0 && (
                <section className="pt-2">
                  <div className="mb-2 px-5 lg:px-8">
                    <h2 className="text-[15px] font-semibold text-primary">
                      재생목록 <span className="ml-1 text-xs font-normal text-secondary">{matchedPlaylists.length}</span>
                    </h2>
                  </div>
                  <div className="divide-y divide-line/20">
                    {matchedPlaylists.map((item) => (
                      <TrackRow
                        key={item.id}
                        item={item}
                        onPlay={handlePlayTrack}
                        active={currentTrack?.id === item.id}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="px-5 py-16 text-center lg:px-8">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-surface text-disabled mb-3">
                <Icon name="search" size={24} />
              </div>
              <p className="text-sm font-semibold text-primary">
                &lsquo;{query}&rsquo;에 대한 검색 결과가 없습니다
              </p>
              <p className="mt-1 text-xs text-secondary">
                철자가 정확한지 확인하거나 다른 검색어를 입력해 보세요.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* ── 검색어 없을 때: 최근 검색어 & 장르 둘러보기 ── */
        <div className="animate-fade-in">
          {recentList.length > 0 && (
            <section className="pt-7">
              <div className="mb-3 flex items-baseline justify-between px-5 lg:px-8">
                <h2 className="text-[15px] font-semibold">최근 검색어</h2>
                <button
                  type="button"
                  onClick={handleClearRecent}
                  className="text-xs text-secondary transition-colors hover:text-primary cursor-pointer"
                >
                  지우기
                </button>
              </div>
              <div className="flex flex-wrap gap-2 px-5 lg:px-8">
                {recentList.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSelectQuery(q)}
                    className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-secondary
                               transition-all hover:border-disabled hover:text-primary active:scale-95 cursor-pointer"
                  >
                    <Icon name="search" size={14} className="opacity-60" />
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="pt-8">
            <h2 className="mb-3.5 px-5 lg:px-8 text-[15px] font-semibold">장르 둘러보기</h2>
            <div className="grid grid-cols-2 gap-3 px-5 lg:grid-cols-4 lg:gap-4 lg:px-8">
              {genres.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleSelectQuery(g.name)}
                  className="flex h-19 items-end rounded-xl p-4 text-left transition-transform active:scale-[0.98] cursor-pointer"
                  style={artStyle(g.art)}
                >
                  <span className="text-[17px] font-bold text-white">{g.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
