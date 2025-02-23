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
              <div className="relative">
                <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center">
                  {Array.from({ length: checkpoints }).map((_, idx) => {
                    const isCompleted = progress.earned >= (idx + 1) * 40;
                    const position = ((idx + 1) * 40 * 100) / progress.total;
                    
                    return (
                      <div
                        key={idx}
                        className="absolute group"
                        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                      >
                        <div 
                          className={`
                            w-3 h-3 rounded-full border-2 
                            ${isCompleted 
                              ? 'border-purple-400 bg-purple-600 shadow-lg shadow-purple-500/50' 
                              : 'border-gray-600 bg-gray-800'
                            }
                            transition-all duration-300 hover:scale-110
                          `}
                        />
                        <div 
                          className={`
                            absolute -top-8 left-1/2 -translate-x-1/2 
                            text-xs font-medium px-2 py-1 rounded-md
                            ${isCompleted 
                              ? 'bg-purple-500/50 text-purple-100' 
                              : 'bg-gray-700/50 text-gray-100'
                            }
                            opacity-0 group-hover:opacity-100 transition-opacity
                          `}
                        >
                          {(idx + 1) * 40}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};