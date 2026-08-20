/**
 * 목업 데이터 — 백엔드 없이 정적으로 화면을 채웁니다.
 * art: [시작색, 끝색] — 앨범 아트를 이미지 대신 그라디언트로 표현합니다.
 *      (디자인 단계부터 그라디언트로 잡아서, 저작권 있는 앨범 이미지를 쓰지 않습니다)
 */

export const nowPlaying = {
  id: 'bite-me',
  title: 'Bite Me',
  artist: 'ENHYPEN',
  art: ['#FF2D55', '#5E0F26'],
  progress: 0.33, // 0~1
  currentTime: '2:14',
  duration: '4:02',
};

export const myPlaylists = [
  { id: 'liked', title: '좋아요 표시한 음악', sub: '128곡', art: ['#FF2D55', '#5E0F26'] },
  { id: 'enhypen', title: 'ENHYPEN 모음', sub: '42곡', art: ['#2B2F6B', '#101227'] },
  { id: 'night', title: '밤에 듣는 노래', sub: '31곡', art: ['#4A2B6B', '#1A0F27'] },
];

export const fromShorts = [
  { id: 'sticker', title: 'Sticker', artist: 'NCT 127', art: ['#6B1E3A', '#270B16'] },
  { id: 'istj', title: 'ISTJ', artist: 'NCT DREAM', art: ['#1E5A4A', '#0B241D'] },
  { id: 'candy', title: 'Candy', artist: 'NCT DREAM', art: ['#3A2B6B', '#140F27'] },
];

export const quickPicks = [
  { id: 'bite-me', title: 'Bite Me', sub: 'ENHYPEN', art: ['#FF2D55', '#5E0F26'] },
  { id: 'glitch', title: 'Glitch Mode', sub: 'NCT DREAM', art: ['#2B2F6B', '#101227'] },
  { id: 'first-meet', title: '첫 만남은…', sub: 'TWS', art: ['#1E4A6B', '#0B1A27'] },
];

export const musicVideos = [
  { id: 'mv-bite', title: 'Bite Me', sub: 'ENHYPEN · 뮤직비디오', art: ['#FF2D55', '#5E0F26'] },
  { id: 'mv-sticker', title: 'Sticker', sub: 'NCT 127 · 뮤직비디오', art: ['#6B1E3A', '#270B16'] },
];

/** 그라디언트 CSS 문자열로 변환 — 피그마의 대각선 그라디언트와 같은 각도 */
export const artStyle = ([from, to]) => ({
  backgroundImage: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
});
