import { useState } from 'react';
import type { Task, FilterType, Priority } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import ActionButtons from './components/ActionButtons';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  function handleAdd() {
    const text = inputValue.trim();
    if (!text) return;
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString('zh-CN'),
      priority,
    };
    setTasks([newTask, ...tasks]);
    setInputValue('');
    setPriority('medium');
  }

  function handleToggle(id: number) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function handleDelete(id: number) {
    if (window.confirm('确定要删除这个任务吗？')) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  }

  function handleClearCompleted() {
    const count = tasks.filter((t) => t.completed).length;
    if (count === 0) {
      alert('没有已完成的任务！');
      return;
    }
    if (window.confirm(`确定要清除 ${count} 个已完成的任务吗？`)) {
      setTasks(tasks.filter((t) => !t.completed));
    }
  }

  function handleClearAll() {
    if (tasks.length === 0) {
      alert('任务列表已经是空的！');
      return;
    }
    if (window.confirm('确定要清除所有任务吗？此操作不可撤销！')) {
      setTasks([]);
    }
  }

  return (
    <div className="container">
      <Header total={totalCount} completed={completedCount} pending={pendingCount} />
      <AddTaskForm
        value={inputValue}
        priority={priority}
        onChange={setInputValue}
        onPriorityChange={setPriority}
        onAdd={handleAdd}
      />
      <FilterButtons filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} filter={filter} onToggle={handleToggle} onDelete={handleDelete} />
      <ActionButtons onClearCompleted={handleClearCompleted} onClearAll={handleClearAll} />
    </div>
  );
}

export default App;
