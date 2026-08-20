import { useCallback, useMemo, useState } from 'react';
import { PlayerContext } from './playerContext';
import { nowPlaying, queue as initialQueue, tracks } from '../data/mock';

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

  /**
   * 어떤 화면에서 곡을 눌러도 이 하나를 통과합니다.
   * 항목을 통째로 펼쳐 담습니다 — 필드를 골라 담으면 cover 처럼 새로 생긴 값이 조용히 빠집니다.
   * (재생목록 카드는 artist 대신 sub 에 곡 수가 들어 있어 그것만 맞춰줍니다)
   */
  const play = useCallback((item) => {
    // 재생목록 카드를 누르면 목록 자체가 아니라 수록곡 첫 곡이 재생되어야 합니다
    const t = item.trackIds ? tracks[item.trackIds[0]] : item;
    setTrack({ ...t, artist: t.artist ?? t.sub ?? '' });
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
