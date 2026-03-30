export type Priority = 'high' | 'medium' | 'low';
export type FilterType = 'all' | 'pending' | 'completed';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
}
