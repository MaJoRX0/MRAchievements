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
  hero: HeroName | "";
  partner: HeroName | "";  // Partner can be empty if not required
  target: HeroName | "";   // Target can be empty if not required
  hint: string;
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

export const validHeroes = [
  'Hulk', 'The Punisher', 'Storm', 'Loki', 'Human Torch', 
  'Doctor Strange', 'Mantis', 'Hawkeye', 'Captain America', 
  'Rocket Raccoon', 'Hela', 'Cloak & Dagger', 'Black Panther', 
  'Groot', 'Magik', 'Moon Knight', 'Luna Snow', 'Squirrel Girl', 
  'Black Widow', 'Iron Man', 'Venom', 'Spider-Man', 'Magneto', 
  'Scarlet Witch', 'Thor', 'Mister Fantastic', 'Winter Soldier', 
  'Peni Parker', 'Star-Lord', 'Namor', 'Adam Warlock', 
  'Jeff the Land Shark', 'Psylocke', 'Wolverine', 'Invisible Woman', 
  'The Thing', 'Iron Fist', 'Bruce Banner', 'Guardians of the Galaxy', 'Avengers', 'Mutant', 'Fantastic Four', 'X-Men',
  'Emma Frost', 'Ultron', 'Phoenix', 'Blade', 'Angela', 'Daredevil', 'Marvel Knights', 'Gambit', 'Rogue', 'Deadpool'
] as const;

type HeroName = (typeof validHeroes)[number]; // Type-safe hero list

  
