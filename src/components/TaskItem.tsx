import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const priorityLabels: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const priority = task.priority ?? 'medium';

  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <span className={`priority-badge ${priority}`}>{priorityLabels[priority]}</span>
      <span className="task-time">{task.createdAt}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        删除
      </button>
    </li>
  );
}
