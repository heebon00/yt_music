import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'ytm_portfolio_notice_hidden_until';

/** YYYY-MM-DD */
const today = () => new Date().toISOString().slice(0, 10);

/**
 * 첫 진입 시 뜨는 포트폴리오 안내 모달.
 *
 * - "오늘 하루 보지 않기"를 체크하고 닫으면 localStorage에 오늘 날짜를 저장하고,
 *   다음 날이 되면 다시 뜹니다.
 * - ESC · 배경 클릭으로도 닫힙니다.
 */
/** 오늘 이미 닫았는지 — 첫 렌더에서 한 번만 읽습니다 */
function shouldShow() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== today();
  } catch {
    return true; // 시크릿 모드 등 localStorage 차단 환경에서는 그냥 띄웁니다
  }
}

export default function PortfolioNotice() {
  // 초기값을 함수로 넘기면 첫 렌더에서 한 번만 실행됩니다.
  // effect 안에서 setState 하면 렌더가 한 번 더 돌면서 팝업이 깜빡입니다.
  const [open, setOpen] = useState(shouldShow);
  const [hideToday, setHideToday] = useState(false);
  const closeRef = useRef(null);

  const close = useCallback(() => {
    if (hideToday) {
      try {
        localStorage.setItem(STORAGE_KEY, today());
      } catch {
        /* 저장 못 해도 닫기는 되어야 합니다 */
      }
    }
    setOpen(false);
  }, [hideToday]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-title"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
    >
      <div className="animate-pop w-full max-w-md overflow-hidden rounded-2xl border border-line bg-elevated shadow-2xl">
        <div className="flex items-start gap-4 px-6 pt-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </span>
          <div>
            <h2 id="notice-title" className="text-base font-bold tracking-tight">
              포트폴리오 안내
            </h2>
            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-secondary">
              PORTFOLIO NOTICE
            </p>
          </div>
        </div>

        <div className="space-y-4 px-6 pt-5">
          <div className="space-y-1">
            <p className="text-[15px] font-bold text-accent">이 프로젝트는 구직용 포트폴리오입니다.</p>
            <p className="text-sm font-bold">YouTube · Google과 무관한 비공식 재해석입니다.</p>
          </div>

          <div className="space-y-2.5 rounded-xl bg-surface p-4 text-xs leading-relaxed text-secondary">
            <p>
              본 웹사이트는 유튜브 뮤직의 UI/UX를 학습 목적으로 다시 설계하고 프론트엔드로 구현한{' '}
              <strong className="font-semibold text-primary">개인 포트폴리오 작품</strong>입니다.
            </p>
            <p>
              실제 음악은 재생되지 않으며, 화면의 곡·앨범 정보는 모두 목업 데이터입니다. 가사도 실제 가사가 아닌
              예시 문장입니다.
            </p>
            <p>
              <strong className="font-semibold text-primary">앨범 자켓 이미지의 저작권은 각 아티스트와 음반사에
              있습니다.</strong>{' '}
              화면 구현을 보여주기 위한 목적으로만 표시하며, 권리자의 요청이 있으면 즉시 내리겠습니다.
            </p>
            <p>수집하거나 저장하는 개인정보는 없습니다.</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-secondary select-none">
            <input
              type="checkbox"
              checked={hideToday}
              onChange={(e) => setHideToday(e.target.checked)}
              className="size-4 cursor-pointer accent-accent"
            />
            오늘 하루 보지 않기
          </label>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="w-full rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-white transition-transform active:scale-95 sm:w-auto"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
