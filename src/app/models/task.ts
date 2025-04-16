export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: Date;
  status: 'PENIDNG' | 'COMPLETED';
  userId?: number;
  reminderMessage?: string;
}
