export interface Habit {
  id?: number;
  name: string;
  description: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  lastCompletedDate?: string;
  userId?: number;
}
