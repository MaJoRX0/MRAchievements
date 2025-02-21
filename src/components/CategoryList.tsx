import React from 'react';
import { Category } from '../types';
import { Trophy } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const calculateProgress = (category: Category) => {
    const totalPoints = category.achievements.reduce((sum, ach) => sum + ach.points, 0);
    const earnedPoints = category.achievements
      .filter(ach => ach.completed)
      .reduce((sum, ach) => sum + ach.points, 0);
    return { earned: earnedPoints, total: totalPoints };
  };

  return (
    <div className="space-y-3 w-80 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
      {categories.map(category => {
        const progress = calculateProgress(category);
        const progressPercentage = (progress.earned / progress.total) * 100 || 0;
        const checkpoints = Math.floor(progress.total / 40);
        
        return (
          <div
            key={category.id}
            className={`p-4 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
              selectedCategory === category.id
                ? 'bg-purple-900/80 text-white shadow-lg shadow-purple-900/20'
                : 'bg-gray-800/80 text-gray-200 hover:bg-gray-700/80'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="flex items-center gap-3">
              <Trophy className={`w-5 h-5 ${selectedCategory === category.id ? 'text-purple-300' : 'text-gray-400'}`} />
              <span className="font-semibold tracking-wide">{category.name}</span>
            </div>
            
            <div className="mt-3">
              <div className="text-sm text-gray-300 mb-2 flex justify-between items-center">
                <span>Progress</span>
                <span className="font-medium">{progress.earned}/{progress.total}</span>
              </div>
              <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="relative h-1 mt-1">
                {Array.from({ length: checkpoints }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`absolute w-1 h-3 -top-1 transition-colors ${
                      progress.earned >= (idx + 1) * 40
                        ? 'bg-green-400'
                        : 'bg-gray-600'
                    }`}
                    style={{ left: `${((idx + 1) * 40 * 100) / progress.total}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};