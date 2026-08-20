import { useMemo } from 'react';
import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';
import ContinueCard from '../components/ContinueCard';
import AlbumCard from '../components/AlbumCard';
import ShortsCard from '../components/ShortsCard';
import VideoCard from '../components/VideoCard';
import Carousel from '../components/Carousel';
import { myPlaylists, fromShorts, quickPicks, musicVideos, randomCover } from '../data/mock';
import { usePlayer } from '../store/playerContext';

export default function Home() {
  const { play } = usePlayer();

  // 재생목록 대표 자켓은 수록곡 중 하나를 무작위로. 한 번만 뽑아 렌더마다 바뀌지 않게 합니다.
  const playlists = useMemo(
    () => myPlaylists.map((p) => ({ ...p, cover: randomCover(p.trackIds) })),
    [],
  );

  return (
    <div className="pb-8">
      <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium tracking-[0.1em] text-secondary">MONDAY EVENING</p>
          <h1 className="mt-1 truncate text-2xl font-bold tracking-tight">이어서 들을까요?</h1>
        </div>
        <div className="flex shrink-0 items-center gap-3 pt-1">
          <button type="button" aria-label="검색" className="text-primary transition-colors hover:text-secondary">
            <Icon name="search" size={24} />
          </button>
          <span className="grid size-7 place-items-center rounded-full bg-elevated text-xs font-semibold text-secondary">
            희
          </span>
        </div>
      </header>

      <ContinueCard />

      <section className="pt-8">
        <SectionHeader title="나의 재생목록" />
        <Carousel>
          {playlists.map((item) => (
            <AlbumCard key={item.id} item={item} onPlay={play} />
          ))}
        </Carousel>
      </section>

      <section className="pt-8">
        <SectionHeader title="Shorts에서 들은 음악" />
        <Carousel>
          {fromShorts.map((item) => (
            <ShortsCard key={item.id} item={item} onPlay={play} />
          ))}
        </Carousel>
      </section>

      <section className="pt-8">
        <SectionHeader title="빠른 선곡" />
        <Carousel>
          {quickPicks.map((item) => (
            <AlbumCard key={item.id} item={item} onPlay={play} />
          ))}
        </Carousel>
      </section>

      <section className="pt-8">
        <SectionHeader title="맞춤 추천 뮤직비디오" />
        <Carousel>
          {musicVideos.map((item) => (
            <VideoCard key={item.id} item={item} onPlay={play} />
          ))}
        </Carousel>
      </section>
    </div>
  );
}
