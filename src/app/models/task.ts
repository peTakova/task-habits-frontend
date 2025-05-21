export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date | null;
  status: 'PENDING' | 'COMPLETED';
  userId?: number;
  //reminderMessage?: string;
}
