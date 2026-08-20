import { useCallback, useMemo, useState } from 'react';
import { PlayerContext } from './playerContext';
import { nowPlaying, queue as initialQueue } from '../data/mock';

/**
 * 전역 재생 상태.
 *
 * 왜 Context인가 — 곡을 누르는 곳(홈 카드 · 보관함 행 · 재생목록)과
 * 그 결과가 보이는 곳(미니 플레이어 · 플레이어 화면)이 서로 멀리 떨어져 있습니다.
 * props로 내리면 중간 컴포넌트들이 전부 관련 없는 값을 들고 있어야 해서 Context로 뺐습니다.
 */
export function PlayerProvider({ children }) {
  const [track, setTrack] = useState(nowPlaying);
  const [queue, setQueue] = useState(initialQueue);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(true);
  const [progress, setProgress] = useState(nowPlaying.progress);
  const [expanded, setExpanded] = useState(false); // 플레이어 전체 화면 여부

  /** 어떤 화면에서 곡을 눌러도 이 하나를 통과합니다 */
  const play = useCallback((item) => {
    setTrack({
      id: item.id,
      title: item.title,
      artist: item.artist ?? item.sub ?? '',
      art: item.art,
    });
    setProgress(0);
    setIsPlaying(true);
    setLiked(false);
  }, []);

  const toggle = useCallback(() => setIsPlaying((v) => !v), []);
  const seek = useCallback((ratio) => setProgress(Math.min(1, Math.max(0, ratio))), []);
  const openPlayer = useCallback(() => setExpanded(true), []);
  const closePlayer = useCallback(() => setExpanded(false), []);

  const value = useMemo(
    () => ({
      track,
      queue,
      isPlaying,
      liked,
      progress,
      expanded,
      play,
      toggle,
      seek,
      setQueue,
      setLiked,
      openPlayer,
      closePlayer,
    }),
    [track, queue, isPlaying, liked, progress, expanded, play, toggle, seek, openPlayer, closePlayer],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}
