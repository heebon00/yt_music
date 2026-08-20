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
  // duration은 목업용 임시값입니다 (실제 영상 길이를 확인하지 않았습니다)
  { id: 'mv-bite', title: 'Bite Me', sub: 'ENHYPEN · 뮤직비디오', duration: '3:24', art: ['#FF2D55', '#5E0F26'] },
  { id: 'mv-sticker', title: 'Sticker', sub: 'NCT 127 · 뮤직비디오', duration: '3:52', art: ['#6B1E3A', '#270B16'] },
];

/** 그라디언트 CSS 문자열로 변환 — 피그마의 대각선 그라디언트와 같은 각도 */
export const artStyle = ([from, to]) => ({
  backgroundImage: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
});

/* ── 재생 대기열 ─────────────────────────────── */
export const queue = [
  { id: 'glitch', title: 'Glitch Mode', artist: 'NCT DREAM', art: ['#2B2F6B', '#101227'] },
  { id: 'sticker', title: 'Sticker', artist: 'NCT 127', art: ['#6B1E3A', '#270B16'] },
  { id: 'first-meet', title: '첫 만남은 계획대로 되지 않아', artist: 'TWS', art: ['#1E4A6B', '#0B1A27'] },
];

/**
 * 가사 — 저작권 문제를 피하려고 실제 가사가 아닌 예시 문장을 씁니다.
 * activeIndex: 지금 부르고 있는 줄
 */
export const lyrics = {
  activeIndex: 2,
  lines: [
    '어두운 방 안에 남은 소리',
    '창밖으로 번지는 불빛처럼',
    '오늘 밤은 조금 더 머물러 줘',
    '내일이 오기 전에',
    '우리 이야기 끝나기 전에',
  ],
};

/* ── 보관함 ──────────────────────────────────── */
export const savedTracks = [
  { id: 'bite-me', title: 'Bite Me', artist: 'ENHYPEN', art: ['#FF2D55', '#5E0F26'] },
  { id: 'glitch', title: 'Glitch Mode', artist: 'NCT DREAM', art: ['#2B2F6B', '#101227'] },
  { id: 'sticker', title: 'Sticker', artist: 'NCT 127', art: ['#6B1E3A', '#270B16'] },
  { id: 'first-meet', title: '첫 만남은 계획대로 되지 않아', artist: 'TWS', art: ['#1E5A4A', '#0B241D'] },
  { id: 'istj', title: 'ISTJ', artist: 'NCT DREAM', art: ['#4A2B6B', '#1A0F27'] },
  { id: 'sn', title: '내가 S면 넌 나의 N이 되어줘', artist: 'TWS', art: ['#6B3A1E', '#241108'] },
  { id: 'candy', title: 'Candy', artist: 'NCT DREAM', art: ['#1E4A6B', '#0B1A27'] },
];

export const libraryFilters = ['전체', '플레이리스트', '앨범', '아티스트'];

/* ── 검색 ────────────────────────────────────── */
export const recentQueries = ['ENHYPEN', 'NCT DREAM', 'TWS', 'NCT 127', '밤에 듣는 노래'];

export const genres = [
  { id: 'kpop', name: 'K-POP', art: ['#FF2D55', '#5E0F26'] },
  { id: 'ballad', name: '발라드', art: ['#2B2F6B', '#101227'] },
  { id: 'hiphop', name: '힙합', art: ['#6B3A1E', '#241108'] },
  { id: 'rnb', name: 'R&B', art: ['#4A2B6B', '#1A0F27'] },
  { id: 'indie', name: '인디', art: ['#1E5A4A', '#0B241D'] },
  { id: 'jazz', name: '재즈', art: ['#1E4A6B', '#0B1A27'] },
  { id: 'rock', name: '록', art: ['#6B1E3A', '#270B16'] },
  { id: 'ost', name: 'OST', art: ['#3A3A6B', '#141427'] },
];

/* ── 재생목록 탭 ─────────────────────────────── */
export const playlistRows = [
  { id: 'liked', title: '좋아요 표시한 음악', artist: '128곡', art: ['#FF2D55', '#5E0F26'] },
  { id: 'enhypen', title: 'ENHYPEN 모음', artist: '42곡', art: ['#2B2F6B', '#101227'] },
  { id: 'night', title: '밤에 듣는 노래', artist: '31곡', art: ['#4A2B6B', '#1A0F27'] },
  { id: 'workout', title: '운동할 때', artist: '58곡', art: ['#6B3A1E', '#241108'] },
];

export const recentLists = [
  { id: 'nctmix', title: 'NCT DREAM 믹스', artist: '어제 들음', art: ['#1E5A4A', '#0B241D'] },
  { id: 'twsradio', title: 'TWS 라디오', artist: '3일 전', art: ['#1E4A6B', '#0B1A27'] },
];
