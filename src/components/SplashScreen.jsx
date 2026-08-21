import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ytm_splash_seen';

/** 이번 세션에서 이미 봤는지 — 첫 렌더에서 한 번만 읽습니다 */
function shouldShow() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return true; // 시크릿 모드 등 sessionStorage 차단 환경에서는 그냥 띄웁니다
  }
}

/**
 * 모바일 첫 진입 시 나타나는 미니멀 스플래시 로딩 화면
 * 중앙에 리디자인 원형 로고가 부드럽게 나타나며 은은한 펄스 효과를 보여준 뒤 페이드아웃됩니다.
 *
 * 탭 세션당 한 번만 띄웁니다. 새로고침할 때마다 1.4초를 기다리게 하면
 * 포트폴리오를 훑어보는 사람에게는 브랜딩이 아니라 방해가 됩니다.
 */
export default function SplashScreen() {
  // 초기값을 함수로 넘기면 첫 렌더에서 한 번만 실행됩니다.
  const [show, setShow] = useState(shouldShow);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) return undefined;

    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // 저장하지 못해도 이번 표시 자체에는 영향이 없습니다
    }

    // 1초 동안 로고 표시 후 부드러운 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1000);

    // 페이드아웃 완료(0.4초 후) 시 화면에서 완전 제거
    const removeTimer = setTimeout(() => {
      setShow(false);
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base transition-opacity duration-400 ease-out select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="로딩 중"
    >
      <div className="flex flex-col items-center gap-5">
        {/* 리디자인 원형 로고 */}
        <div className="relative size-20 lg:size-24 animate-splash-logo">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-full drop-shadow-2xl"
          >
            {/* 액센트 레드 원 */}
            <circle cx="16" cy="16" r="16" fill="#CF032A" />
            {/* 내부 동심원 링 */}
            <circle cx="16" cy="16" r="10.4" stroke="#FFFFFF" strokeWidth="1.6" />
            {/* 재생 삼각형 */}
            <path d="M13.3 11.2 L20.7 16 L13.3 20.8 Z" fill="#FFFFFF" />
          </svg>
        </div>

        {/* 미니멀 브랜드 타이틀 */}
        <div className="flex flex-col items-center text-center">
          <p className="text-[19px] font-bold tracking-tight text-primary">YouTube Music</p>
          <p className="mt-0.5 text-[10px] font-semibold tracking-[0.2em] text-accent-bright uppercase">
            Redesign
          </p>
        </div>
      </div>
    </div>
  );
}
