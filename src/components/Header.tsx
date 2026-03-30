interface HeaderProps {
  total: number;
  completed: number;
  pending: number;
}

export default function Header({ total, completed, pending }: HeaderProps) {
  return (
    <header>
      <h1>📝 我的待办事项</h1>
      <div className="stats">
        <span>总计: {total}</span>
        <span>已完成: {completed}</span>
        <span>待完成: {pending}</span>
      </div>
    </header>
  );
}
