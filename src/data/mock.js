/**
 * 목업 데이터 — 백엔드 없이 정적으로 화면을 채웁니다.
 *
 * art:   [시작색, 끝색] — 자켓이 없거나 이미지 로딩 전·실패 시 보이는 그라디언트.
 *        재생목록·장르처럼 실물 자켓이 없는 항목은 이것만 씁니다.
 * cover: 실제 앨범 자켓 이미지 주소 (아래 COVERS 참고)
 */

/**
 * 앨범 자켓 — Apple의 아트워크 CDN 주소를 직접 참조합니다.
 * 저작권 있는 이미지를 저장소에 복사해 넣지 않기 위해서입니다.
 * 로딩 실패(오프라인·차단)나 커버가 없는 항목은 아래 art 그라디언트가 그대로 보입니다.
 */
const IT = 'https://is1-ssl.mzstatic.com/image/thumb';
const COVERS = {
  'bite-me':
    IT + '/Music116/v4/1c/89/10/1c891026-08a1-bbcd-e18e-b5acfe0bd2c7/196922402876_Cover.jpg/400x400bb.jpg',
  'glitch':
    IT + '/Music116/v4/17/3a/82/173a823c-0fc9-48dd-ab7a-d847e39dfd81/NCTDREAM_02_Glitch_Mode_digital_cover.jpg/400x400bb.jpg',
  'walk':
    IT + '/Music211/v4/4c/b1/e3/4cb1e35d-5ce4-af40-7635-2a5e6a80c047/888735948176.png/400x400bb.jpg',
  'istj':
    IT + '/Music126/v4/ef/5a/97/ef5a971c-5701-f85b-11b7-85d21d607290/888735944307.png/400x400bb.jpg',
  'candy':
    IT + '/Music122/v4/41/0f/bd/410fbda4-aff9-9807-6014-f51bdd19fe3c/Digital_Cover_NCT_DREAM_Candy.jpg/400x400bb.jpg',
  'first-meet':
    IT + '/Music211/v4/17/bb/d4/17bbd45f-fee7-a9dd-ff01-e7b174cc1462/196922759543_Cover.jpg/400x400bb.jpg',
  'sn':
    IT + '/Music221/v4/b3/3e/3c/b33e3c34-4911-a654-7665-474122fccf7d/196922975639_Cover.jpg/400x400bb.jpg',
  'mv-bite':
    IT + '/Music116/v4/1c/89/10/1c891026-08a1-bbcd-e18e-b5acfe0bd2c7/196922402876_Cover.jpg/400x400bb.jpg',
  'mv-walk':
    IT + '/Music211/v4/4c/b1/e3/4cb1e35d-5ce4-af40-7635-2a5e6a80c047/888735948176.png/400x400bb.jpg',
};

export const nowPlaying = {
  id: 'bite-me',
  title: 'Bite Me',
  artist: 'ENHYPEN',
  art: ['#FF2D55', '#5E0F26'],
  cover: COVERS['bite-me'],
  progress: 0.33, // 0~1
  currentTime: '2:14',
  duration: '4:02',
};

/**
 * 재생목록 — 실물 자켓이 없으므로 목록에 든 곡 중 하나를 무작위로 골라 보여줍니다.
 * (실제 음악 앱도 수록곡 자켓을 대표 이미지로 씁니다)
 * 매 렌더마다 바뀌면 깜빡이므로, 화면에서 useMemo 로 한 번만 고릅니다.
 */
export const randomCover = (ids) => COVERS[ids[Math.floor(Math.random() * ids.length)]];

export const myPlaylists = [
  {
    id: 'liked',
    title: '좋아요 표시한 음악',
    sub: '128곡',
    art: ['#FF2D55', '#5E0F26'],
    trackIds: ['bite-me', 'glitch', 'walk', 'istj', 'candy', 'first-meet', 'sn'],
  },
  { id: 'enhypen', title: 'ENHYPEN 모음', sub: '42곡', art: ['#2B2F6B', '#101227'], trackIds: ['bite-me'] },
  {
    id: 'night',
    title: '밤에 듣는 노래',
    sub: '31곡',
    art: ['#4A2B6B', '#1A0F27'],
    trackIds: ['glitch', 'candy', 'first-meet'],
  },
];

export const fromShorts = [
  { id: 'walk', title: '삐그덕', artist: 'NCT 127', art: ['#6B1E3A', '#270B16'] , cover: COVERS['walk'] },
  { id: 'istj', title: 'ISTJ', artist: 'NCT DREAM', art: ['#1E5A4A', '#0B241D'] , cover: COVERS['istj'] },
  { id: 'candy', title: 'Candy', artist: 'NCT DREAM', art: ['#3A2B6B', '#140F27'] , cover: COVERS['candy'] },
];

export const quickPicks = [
  { id: 'bite-me', title: 'Bite Me', sub: 'ENHYPEN', art: ['#FF2D55', '#5E0F26'] , cover: COVERS['bite-me'] },
  { id: 'glitch', title: 'Glitch Mode', sub: 'NCT DREAM', art: ['#2B2F6B', '#101227'] , cover: COVERS['glitch'] },
  { id: 'first-meet', title: '첫 만남은…', sub: 'TWS', art: ['#1E4A6B', '#0B1A27'] , cover: COVERS['first-meet'] },
];

export const musicVideos = [
  // duration은 목업용 임시값입니다 (실제 영상 길이를 확인하지 않았습니다)
  { id: 'mv-bite', title: 'Bite Me', sub: 'ENHYPEN · 뮤직비디오', duration: '3:24', art: ['#FF2D55', '#5E0F26'] , cover: COVERS['mv-bite'] },
  { id: 'mv-walk', title: '삐그덕', sub: 'NCT 127 · 뮤직비디오', duration: '3:52', art: ['#6B1E3A', '#270B16'] , cover: COVERS['mv-walk'] },
];

/** 그라디언트 CSS 문자열로 변환 — 피그마의 대각선 그라디언트와 같은 각도 */
export const artStyle = ([from, to]) => ({
  backgroundImage: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
});

/* ── 재생 대기열 ─────────────────────────────── */
export const queue = [
  { id: 'glitch', title: 'Glitch Mode', artist: 'NCT DREAM', art: ['#2B2F6B', '#101227'] , cover: COVERS['glitch'] },
  { id: 'walk', title: '삐그덕', artist: 'NCT 127', art: ['#6B1E3A', '#270B16'] , cover: COVERS['walk'] },
  { id: 'first-meet', title: '첫 만남은 계획대로 되지 않아', artist: 'TWS', art: ['#1E4A6B', '#0B1A27'] , cover: COVERS['first-meet'] },
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
  { id: 'bite-me', title: 'Bite Me', artist: 'ENHYPEN', art: ['#FF2D55', '#5E0F26'] , cover: COVERS['bite-me'] },
  { id: 'glitch', title: 'Glitch Mode', artist: 'NCT DREAM', art: ['#2B2F6B', '#101227'] , cover: COVERS['glitch'] },
  { id: 'walk', title: '삐그덕', artist: 'NCT 127', art: ['#6B1E3A', '#270B16'] , cover: COVERS['walk'] },
  { id: 'first-meet', title: '첫 만남은 계획대로 되지 않아', artist: 'TWS', art: ['#1E5A4A', '#0B241D'] , cover: COVERS['first-meet'] },
  { id: 'istj', title: 'ISTJ', artist: 'NCT DREAM', art: ['#4A2B6B', '#1A0F27'] , cover: COVERS['istj'] },
  { id: 'sn', title: '내가 S면 넌 나의 N이 되어줘', artist: 'TWS', art: ['#6B3A1E', '#241108'] , cover: COVERS['sn'] },
  { id: 'candy', title: 'Candy', artist: 'NCT DREAM', art: ['#1E4A6B', '#0B1A27'] , cover: COVERS['candy'] },
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
  {
    id: 'liked',
    title: '좋아요 표시한 음악',
    artist: '128곡',
    art: ['#FF2D55', '#5E0F26'],
    trackIds: ['bite-me', 'glitch', 'walk', 'istj', 'candy', 'first-meet', 'sn'],
  },
  { id: 'enhypen', title: 'ENHYPEN 모음', artist: '42곡', art: ['#2B2F6B', '#101227'], trackIds: ['bite-me'] },
  {
    id: 'night',
    title: '밤에 듣는 노래',
    artist: '31곡',
    art: ['#4A2B6B', '#1A0F27'],
    trackIds: ['glitch', 'candy', 'first-meet'],
  },
  {
    id: 'workout',
    title: '운동할 때',
    artist: '58곡',
    art: ['#6B3A1E', '#241108'],
    trackIds: ['walk', 'istj', 'sn'],
  },
];

export const recentLists = [
  {
    id: 'nctmix',
    title: 'NCT DREAM 믹스',
    artist: '어제 들음',
    art: ['#1E5A4A', '#0B241D'],
    trackIds: ['glitch', 'istj', 'candy'],
  },
  { id: 'twsradio', title: 'TWS 라디오', artist: '3일 전', art: ['#1E4A6B', '#0B1A27'], trackIds: ['first-meet', 'sn'] },
];
