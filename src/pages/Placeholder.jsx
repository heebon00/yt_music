/** Day 3에서 구현할 화면 자리. 디자인은 피그마에 이미 있습니다. */
export default function Placeholder({ title }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-10 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-secondary">Day 3에서 구현할 화면입니다.</p>
      <p className="mt-4 text-xs text-disabled">
        하단 미니 플레이어가 탭을 바꿔도 그대로 남아 있는지 확인해보세요.
      </p>
    </div>
  );
}
