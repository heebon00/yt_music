import Icon from './Icon';
import { NAV } from '../data/nav';

/** 하단 탭바 — 모바일 · 태블릿 전용. 데스크톱에서는 사이드바가 대신합니다. */
export default function TabBar({ active, onChange }) {
  return (
    <nav
      className="shrink-0 border-t border-line bg-surface lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex h-14">
        {NAV.map((tab) => {
          const on = tab.id === active;
          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={on ? 'page' : undefined}
                className={`flex size-full flex-col items-center justify-center gap-1 transition-colors ${
                  on ? 'text-accent' : 'text-disabled hover:text-secondary'
                }`}
              >
                <Icon name={tab.icon} size={24} />
                <span className={`text-[10px] ${on ? 'font-semibold' : 'font-medium'}`}>{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
