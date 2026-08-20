import Icon from './Icon';

/** 하단 탭 4개. 재생목록은 요청대로 보관함 왼쪽입니다. */
const TABS = [
  { id: 'home', label: '홈', icon: 'home' },
  { id: 'search', label: '검색', icon: 'search' },
  { id: 'playlist', label: '재생목록', icon: 'playlist' },
  { id: 'library', label: '보관함', icon: 'library' },
];

export default function TabBar({ active, onChange }) {
  return (
    <nav
      className="border-t border-line bg-surface"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex h-14">
        {TABS.map((tab) => {
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
