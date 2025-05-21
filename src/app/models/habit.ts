export interface Habit {
  id: number;
  name: string;
  description: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  lastCompletedDate: Date | null;
  userId?: number;
  completed?: boolean;
}
