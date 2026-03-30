import type { Priority } from '../types';
import { useRef } from 'react';

interface AddTaskFormProps {
  value: string;
  priority: Priority;
  onChange: (value: string) => void;
  onPriorityChange: (priority: Priority) => void;
  onAdd: () => void;
}

export default function AddTaskForm({ value, priority, onChange, onPriorityChange, onAdd }: AddTaskFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd();
      inputRef.current?.focus();
    }
  };

  const handleAdd = () => {
    onAdd();
    inputRef.current?.focus();
  };

  return (
    <div className="add-task-form">
      <input
        ref={inputRef}
        type="text"
        className="task-input"
        placeholder="添加新任务..."
        maxLength={200}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Priority)}
      >
        <option value="high">🔴 高</option>
        <option value="medium">🟡 中</option>
        <option value="low">🟢 低</option>
      </select>
      <button className="add-btn" onClick={handleAdd}>
        添加
      </button>
    </div>
  );
}
