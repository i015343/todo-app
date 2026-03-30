import type { FilterType } from '../types';

interface EmptyStateProps {
  filter: FilterType;
}

const messages: Record<FilterType, string> = {
  all: '还没有任务，开始添加吧！',
  pending: '没有待完成的任务！',
  completed: '没有已完成的任务！',
};

export default function EmptyState({ filter }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <div className="empty-state-text">{messages[filter]}</div>
    </div>
  );
}
