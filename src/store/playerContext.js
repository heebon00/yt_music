import { createContext, useContext } from 'react';

/**
 * 컨텍스트 객체와 훅만 담긴 파일.
 * Provider(JSX)와 분리해 두면 Vite의 Fast Refresh가 정상 동작합니다.
 */
export const PlayerContext = createContext(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer는 PlayerProvider 안에서만 쓸 수 있습니다');
  return ctx;
}
