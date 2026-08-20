import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import PortfolioNotice from './components/PortfolioNotice';
import Sidebar from './components/Sidebar';
import TabBar from './components/TabBar';
import MiniPlayer from './components/MiniPlayer';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import Library from './pages/Library';
import Player from './pages/Player';
import { PlayerProvider } from './store/PlayerProvider';
import { usePlayer } from './store/playerContext';

const PAGES = { home: Home, search: Search, playlist: Playlist, library: Library };

function Shell() {
  // 라우터 대신 상태 하나로 탭을 전환합니다.
  // 화면을 갈아끼워도 MiniPlayer / TabBar 는 <main> 바깥에 있어 언마운트되지 않습니다.
  const [tab, setTab] = useState('home');
  const { expanded, closePlayer } = usePlayer();
  const Page = PAGES[tab];

  const handleTabChange = (nextTab) => {
    setTab(nextTab);
    if (expanded) {
      closePlayer();
    }
  };

  return (
    // 모바일: 480px 한 칸. 데스크톱(lg): 폭 제한을 풀고 사이드바가 들어옵니다.
    <div className="mx-auto flex h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-base lg:max-w-none">
      <div className="flex min-h-0 flex-1">
        <Sidebar active={tab} onChange={handleTabChange} />

        {/*
          min-w-0 이 없으면 안쪽 가로 캐러셀의 최소 너비 때문에 이 컬럼이 화면 밖으로 밀려납니다.
          (flex 자식의 기본값 min-width:auto — 가로 스크롤 영역을 품을 때 반드시 0으로 눌러줘야 합니다)
        */}
        <div className="relative flex min-h-0 w-0 min-w-0 flex-1 flex-col">
          <main className="no-scrollbar min-w-0 flex-1 overflow-y-auto">
            {/* key를 주면 탭이 바뀔 때마다 페이드인이 다시 실행됩니다 */}
            <div key={tab} className="animate-fade-in mx-auto w-full max-w-[1120px]">
              <Page onNavigate={handleTabChange} />
            </div>
          </main>

          {/* 플레이어는 본문 위만 덮습니다. 사이드바 · 미니 플레이어 · 탭바는 그대로 남습니다. */}
          {expanded && (
            <div className="absolute inset-0 z-20">
              <Player />
            </div>
          )}
        </div>
      </div>

      {/* 아래 두 줄은 탭이 바뀌어도 다시 그려지지 않습니다 — 재생 맥락이 끊기지 않는 이유 */}
      <MiniPlayer />
      <TabBar active={tab} onChange={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <SplashScreen />
      <PortfolioNotice />
      <Shell />
    </PlayerProvider>
  );
}
