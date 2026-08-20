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
 * 로딩 실패(오프라인·차단)나 커버가 없는 항목은 art 그라디언트가 그대로 보입니다.
 */
const IT = 'https://is1-ssl.mzstatic.com/image/thumb';
const C = (p) => IT + p + '/400x400bb.jpg';

const COVERS = {
  'bite-me': C('/Music116/v4/1c/89/10/1c891026-08a1-bbcd-e18e-b5acfe0bd2c7/196922402876_Cover.jpg'),
  xo: C('/Music221/v4/9b/b3/43/9bb34374-15bd-d2ff-2397-6173b929518f/198704025143_Cover.jpg'),
  'sweet-venom': C('/Music116/v4/39/48/3a/39483a7b-71a2-67b2-993d-081d4da36877/196922723216_Cover.jpg'),
  tamed: C('/Music125/v4/07/f2/86/07f286a5-be02-94dd-4e0e-a781aba6d1d4/192641841651_Cover.jpg'),
  glitch: C('/Music116/v4/17/3a/82/173a823c-0fc9-48dd-ab7a-d847e39dfd81/NCTDREAM_02_Glitch_Mode_digital_cover.jpg'),
  istj: C('/Music126/v4/ef/5a/97/ef5a971c-5701-f85b-11b7-85d21d607290/888735944307.png'),
  candy: C('/Music122/v4/41/0f/bd/410fbda4-aff9-9807-6014-f51bdd19fe3c/Digital_Cover_NCT_DREAM_Candy.jpg'),
  broken: C('/Music126/v4/a8/e2/c9/a8e2c927-e67d-4699-d63d-5bcf0c8ca851/888735944109.png'),
  'hello-future': C('/Music125/v4/df/96/8e/df968ee9-ab22-1f14-a2ee-4943204b2324/cover.jpg'),
  walk: C('/Music211/v4/4c/b1/e3/4cb1e35d-5ce4-af40-7635-2a5e6a80c047/888735948176.png'),
  'fact-check': C('/Music126/v4/d5/5a/a8/d55aa88e-cfb4-1524-d93b-c990df87d147/888735945144.png'),
  favorite: C('/Music115/v4/12/5f/58/125f5839-f924-b8f2-aa98-c27ed8391a85/NCT_127_Favorite_Digital_Album_Cover.jpg'),
  'first-meet': C('/Music211/v4/17/bb/d4/17bbd45f-fee7-a9dd-ff01-e7b174cc1462/196922759543_Cover.jpg'),
  sn: C('/Music221/v4/b3/3e/3c/b33e3c34-4911-a654-7665-474122fccf7d/196922975639_Cover.jpg'),
  'hey-hey': C('/Music221/v4/20/66/32/2066323d-435f-e6d7-5c32-907903719e36/196922975615_Cover.jpg'),
  'last-fest': C('/Music221/v4/f4/4e/ba/f44ebacd-1e87-d3ec-79d5-f3dde10b9cab/198704208546_Cover.jpg'),
};

/** 곡 목록 한 곳에서 관리 — 모든 화면이 여기서 꺼내 씁니다 */
const T = (id, title, artist, art) => ({ id, title, artist, art, cover: COVERS[id] });

export const tracks = {
  'bite-me': T('bite-me', 'Bite Me', 'ENHYPEN', ['#FF2D55', '#5E0F26']),
  xo: T('xo', 'XO (Only If You Say Yes)', 'ENHYPEN', ['#4A2B6B', '#1A0F27']),
  'sweet-venom': T('sweet-venom', 'Sweet Venom', 'ENHYPEN', ['#6B3A1E', '#241108']),
  tamed: T('tamed', 'Tamed-Dashed', 'ENHYPEN', ['#1E4A6B', '#0B1A27']),
  glitch: T('glitch', 'Glitch Mode', 'NCT DREAM', ['#2B2F6B', '#101227']),
  istj: T('istj', 'ISTJ', 'NCT DREAM', ['#1E5A4A', '#0B241D']),
  candy: T('candy', 'Candy', 'NCT DREAM', ['#3A2B6B', '#140F27']),
  broken: T('broken', 'Broken Melodies', 'NCT DREAM', ['#1E3A6B', '#0B1427']),
  'hello-future': T('hello-future', 'Hello Future', 'NCT DREAM', ['#6B5A1E', '#27210B']),
  walk: T('walk', '삐그덕', 'NCT 127', ['#6B1E3A', '#270B16']),
  'fact-check': T('fact-check', 'Fact Check', 'NCT 127', ['#5A1E6B', '#200B27']),
  favorite: T('favorite', 'Favorite', 'NCT 127', ['#1E6B5A', '#0B2721']),
  'first-meet': T('first-meet', '첫 만남은 계획대로 되지 않아', 'TWS', ['#1E4A6B', '#0B1A27']),
  sn: T('sn', '내가 S면 넌 나의 N이 되어줘', 'TWS', ['#6B4A1E', '#271A0B']),
  'hey-hey': T('hey-hey', 'hey! hey!', 'TWS', ['#6B1E4A', '#270B1A']),
  'last-fest': T('last-fest', '마지막 축제', 'TWS', ['#3A3A6B', '#141427']),
};

const pick = (...ids) => ids.map((id) => tracks[id]);

/* ── 지금 재생 중 ────────────────────────────── */
export const nowPlaying = { ...tracks['bite-me'], progress: 0.33, currentTime: '2:14', duration: '4:02' };

/* ── 홈 ──────────────────────────────────────── */
export const fromShorts = pick('walk', 'istj', 'candy', 'sweet-venom', 'sn', 'last-fest');

export const quickPicks = pick(
  'bite-me',
  'glitch',
  'first-meet',
  'xo',
  'favorite',
  'hey-hey',
  'broken',
  'candy',
).map((t) => ({ ...t, sub: t.artist }));

export const musicVideos = [
  // duration은 목업용 임시값입니다 (실제 영상 길이를 확인하지 않았습니다)
  { ...tracks['bite-me'], sub: 'ENHYPEN · 뮤직비디오', duration: '3:24' },
  { ...tracks.walk, sub: 'NCT 127 · 뮤직비디오', duration: '3:52' },
  { ...tracks.xo, sub: 'ENHYPEN · 뮤직비디오', duration: '3:41' },
  { ...tracks.broken, sub: 'NCT DREAM · 뮤직비디오', duration: '3:06' },
  { ...tracks['hey-hey'], sub: 'TWS · 뮤직비디오', duration: '2:58' },
];

/**
 * 재생목록 — 실물 자켓이 없으므로 목록에 든 곡 중 하나를 무작위로 골라 보여줍니다.
 * (실제 음악 앱도 수록곡 자켓을 대표 이미지로 씁니다)
 * 매 렌더마다 바뀌면 깜빡이므로, 화면에서 useMemo 로 한 번만 고릅니다.
 */
export const randomCover = (ids) => COVERS[ids[Math.floor(Math.random() * ids.length)]];

const LISTS = [
  {
    id: 'liked',
    title: '좋아요 표시한 음악',
    count: '128곡',
    art: ['#FF2D55', '#5E0F26'],
    trackIds: ['bite-me', 'glitch', 'walk', 'istj', 'candy', 'first-meet', 'sn', 'xo'],
  },
  {
    id: 'enhypen',
    title: 'ENHYPEN 모음',
    count: '42곡',
    art: ['#2B2F6B', '#101227'],
    trackIds: ['bite-me', 'xo', 'sweet-venom', 'tamed'],
  },
  {
    id: 'night',
    title: '밤에 듣는 노래',
    count: '31곡',
    art: ['#4A2B6B', '#1A0F27'],
    trackIds: ['glitch', 'candy', 'first-meet', 'broken'],
  },
  {
    id: 'workout',
    title: '운동할 때',
    count: '58곡',
    art: ['#6B3A1E', '#241108'],
    trackIds: ['walk', 'istj', 'sn', 'fact-check'],
  },
  {
    id: 'nct',
    title: 'NCT 모아듣기',
    count: '76곡',
    art: ['#1E5A4A', '#0B241D'],
    trackIds: ['glitch', 'istj', 'candy', 'walk', 'favorite', 'broken'],
  },
  {
    id: 'drive',
    title: '드라이브',
    count: '24곡',
    art: ['#1E4A6B', '#0B1A27'],
    trackIds: ['hey-hey', 'tamed', 'hello-future', 'last-fest'],
  },
];

export const myPlaylists = LISTS.map((l) => ({ ...l, sub: l.count }));
export const playlistRows = LISTS.map((l) => ({ ...l, artist: l.count }));

export const recentLists = [
  {
    id: 'nctmix',
    title: 'NCT DREAM 믹스',
    artist: '어제 들음',
    art: ['#1E5A4A', '#0B241D'],
    trackIds: ['glitch', 'istj', 'candy', 'broken'],
  },
  {
    id: 'twsradio',
    title: 'TWS 라디오',
    artist: '3일 전',
    art: ['#1E4A6B', '#0B1A27'],
    trackIds: ['first-meet', 'sn', 'hey-hey', 'last-fest'],
  },
  {
    id: 'enhmix',
    title: 'ENHYPEN 믹스',
    artist: '지난주',
    art: ['#6B1E3A', '#270B16'],
    trackIds: ['bite-me', 'xo', 'sweet-venom'],
  },
];

/* ── 재생 대기열 ─────────────────────────────── */
export const queue = pick('glitch', 'walk', 'first-meet', 'xo', 'istj');

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
export const savedTracks = pick(
  'bite-me',
  'glitch',
  'walk',
  'first-meet',
  'istj',
  'sn',
  'candy',
  'xo',
  'favorite',
  'hey-hey',
  'sweet-venom',
  'broken',
);

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

/** 그라디언트 CSS 문자열로 변환 — 피그마의 대각선 그라디언트와 같은 각도 */
export const artStyle = ([from, to]) => ({
  backgroundImage: `linear-gradient(145deg, ${from} 0%, ${to} 100%)`,
});
