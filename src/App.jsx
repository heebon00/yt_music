import { useState } from 'react';
import TabBar from './components/TabBar';
import MiniPlayer from './components/MiniPlayer';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import { nowPlaying } from './data/mock';

const TITLES = { search: '검색', playlist: '재생목록', library: '보관함' };

export default function App() {
  // 라우터 대신 상태 하나로 탭을 전환합니다.
  // schedule.md의 "라우팅 복잡도 줄이기"이자, 화면을 갈아끼워도 플레이어가 언마운트되지 않게 하는 장치이기도 합니다.
  const [tab, setTab] = useState('home');
  const [track] = useState(nowPlaying);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(true);

  const toggle = () => setIsPlaying((v) => !v);

  return (
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-base">
      {/* 화면이 바뀌는 부분은 여기뿐입니다 */}
      <main className="no-scrollbar flex-1 overflow-y-auto">
        {tab === 'home' ? (
          <Home track={track} isPlaying={isPlaying} onToggle={toggle} onPlay={() => setIsPlaying(true)} />
        ) : (
          <Placeholder title={TITLES[tab]} />
        )}
      </main>

      {/* 아래 두 줄은 탭이 바뀌어도 다시 그려지지 않습니다 — 재생 맥락이 끊기지 않는 이유 */}
      <div className="shrink-0">
        <MiniPlayer
          track={track}
          isPlaying={isPlaying}
          liked={liked}
          onToggle={toggle}
          onLike={() => setLiked((v) => !v)}
          onExpand={() => {}}
        />
        <TabBar active={tab} onChange={setTab} />
      </div>
    </div>
  );
}
