export type AchievementType = 'silver' | 'gold' | 'bronze';
export type SortOption = 'type' | 'name' | 'points';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: AchievementType;
  points: 5 | 10 | 20;
  completed: boolean;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  achievements: Achievement[];
}

export interface AppState {
  categories: Category[];
  selectedCategory: string | null;
}