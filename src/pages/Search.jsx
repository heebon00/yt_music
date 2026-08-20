import Icon from '../components/Icon';
import { recentQueries, genres, artStyle } from '../data/mock';
import { usePlayer } from '../store/playerContext';

/**
 * 검색 — 검색창을 비워두지 않는 것이 핵심.
 * 검색어가 떠오르지 않아도 장르 타일에서 탐색이 시작되게 했습니다.
 */
export default function Search() {
  const { play } = usePlayer();

  return (
    <div className="pb-8">
      <h1 className="px-5 lg:px-8 pt-5 pb-4 text-2xl font-bold tracking-tight">검색</h1>

      <div className="px-5 lg:px-8">
        <button
          type="button"
          className="flex h-11.5 w-full items-center gap-3 rounded-full border border-line bg-surface px-4 text-left
                     transition-colors hover:border-disabled"
        >
          <Icon name="search" size={22} className="shrink-0 text-secondary" />
          <span className="text-[15px] text-disabled">아티스트, 곡, 앨범</span>
        </button>
      </div>

      <section className="pt-8">
        <div className="mb-3 flex items-baseline justify-between px-5 lg:px-8">
          <h2 className="text-[15px] font-semibold">최근 검색어</h2>
          <button type="button" className="text-xs text-secondary hover:text-primary">
            지우기
          </button>
        </div>
        <div className="flex flex-wrap gap-2 px-5 lg:px-8">
          {recentQueries.map((q) => (
            <button
              key={q}
              type="button"
              className="rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-secondary
                         transition-colors hover:border-disabled hover:text-primary"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      <section className="pt-8">
        <h2 className="mb-3.5 px-5 lg:px-8 text-[15px] font-semibold">장르 둘러보기</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 px-5 lg:px-8">
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
      </section>
    </div>
  );
}
