import Icon from './Icon';
import { NAV } from '../data/nav';

/**
 * 사이드바 — 데스크톱(lg 이상) 전용.
 * 모바일의 하단 탭바가 넓은 화면에서 세로로 펼쳐진 형태입니다. 항목은 완전히 동일합니다.
 */
export default function Sidebar({ active, onChange }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-surface lg:flex">
      <div className="px-6 pt-7 pb-6">
        <p className="text-[10px] font-medium tracking-[0.16em] text-disabled">YOUTUBE MUSIC</p>
        <p className="mt-1 text-lg font-bold tracking-tight">Redesign</p>
      </div>

      <nav className="px-3">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const on = item.id === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onChange(item.id)}
                  aria-current={on ? 'page' : undefined}
                  className={`flex w-full items-center gap-3.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    on
                      ? 'bg-elevated font-semibold text-accent'
                      : 'text-secondary hover:bg-elevated/60 hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={22} className="shrink-0" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-auto px-6 pb-6 text-[11px] leading-relaxed text-disabled">
        듣는 동안,
        <br />
        화면을 떠나지 않게.
      </p>
    </aside>
  );
}
