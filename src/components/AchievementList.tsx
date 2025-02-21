import React from 'react';
import { Achievement, AchievementType } from '../types';

interface AchievementListProps {
  achievements: Achievement[];
  onToggleAchievement: (id: string) => void;
}

const TypeIcon: React.FC<{ type: AchievementType; categoryId: string }> = ({ type, categoryId }) => {
  console.log(`Rendering icon for type: ${type}, categoryId: ${categoryId}`);

  const iconMap: Record<AchievementType, Record<string, string>> = {
    silver: {
      "galactas-guide": '../../icons/Galacat-Silver-Achievement.webp',
      "rivalry-rising": '../../icons/Rivalry-Silver-Achievement.webp',
      "heroic-journey": '../../icons/Heroic-Silver-Achievement.webp',
      "chronoversy-saga": '../../icons/Heroic-Silver-Achievement.webp',
    },
    gold: {
      "galactas-guide": '../../icons/Galacat-Gold-Achievement.webp',
      "rivalry-rising": '../../icons/Rivalry-Gold-Achievement.webp',
      "heroic-journey": '../../icons/Heroic-Gold-Achievement.webp',
      "chronoversy-saga": '../../icons/Heroic-Silver-Achievement.webp',
    },
    bronze: {
      "galactas-guide": '../../icons/Galacat-Bronze-Achievement.webp',
      "rivalry-rising": '../../icons/Rivalry-Bronze-Achievement.webp',
      "heroic-journey": '../../icons/Heroic-Bronze-Achievement.webp',
      "chronoversy-saga": '../../icons/Chronoverse-Bronze-Achievement.webp',
    },
  };

  const imageSrc = iconMap[type][categoryId] || '../../icons/default.webp';

  return <img src={imageSrc} alt={`${type}-${categoryId}`} className="w-13 h-13" />;
};

export const AchievementList: React.FC<AchievementListProps> = ({
  achievements,
  onToggleAchievement,
}) => {
  const sortedAchievements = [...achievements].sort((a, b) => {
    const typeOrder = { gold: 0, silver: 1, bronze: 2 };
    return typeOrder[a.type] - typeOrder[b.type]; // Sort only by type
  });
  
  
  
  
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sortedAchievements.map((achievement) => (
        <div
          key={achievement.id}
          onClick={() => onToggleAchievement(achievement.id)}
          className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 hover:transform hover:scale-[1.02] overflow-hidden ${
            achievement.completed ? 'bg-gray-800/50 opacity-75' : 'bg-gray-800/80'
          }`}
        >
          {/* Green completion overlay */}
          <div
            className={`absolute inset-0 bg-green-500/20 transition-transform duration-500 ${
              achievement.completed ? 'translate-x-0' : '-translate-x-full'
            }`}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-3">
              <TypeIcon type={achievement.type} categoryId={achievement.categoryId} />
              <div className="flex-1">
                <h3 className="font-semibold text-white">{achievement.title}</h3>
                <p className="text-sm text-gray-400 max-w-[250px] break-words">
                  {achievement.description}
                </p>
                <span className="block mt-2 text-purple-400 font-medium">
                  {achievement.points} points
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end">
              <div 
                className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                  achievement.completed ? 'bg-green-500 border-green-400 scale-110' : 'border-gray-500 scale-100'
                }`}
              >
                {achievement.completed && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
