import React from 'react';
import { Achievement, AchievementType } from '../types';

interface AchievementListProps {
  achievements: Achievement[];
  onToggleAchievement: (id: string) => void;
}


import GalacatGold from "../icons/Galacat-Gold-Achievement.webp";
import GalacatSilver from "../icons/Galacat-Silver-Achievement.webp";
import GalacatBronze from "../icons/Galacat-Bronze-Achievement.webp";

import RivalryGold from "../icons/Rivalry-Gold-Achievement.webp"; 
import RivalrySilver from "../icons/Rivalry-Silver-Achievement.webp";
import RivalryBronze from "../icons/Rivalry-Bronze-Achievement.webp";

import HeroicGold from "../icons/Heroic-Gold-Achievement.webp";
import HeroicSilver from "../icons/Heroic-Silver-Achievement.webp";
import HeroicBronze from "../icons/Heroic-Bronze-Achievement.webp";

import ChronoversyGold from "../icons/Chronoverse-Gold-Achievement.webp";
import ChronoversySilver from "../icons/Chronoverse-Silver-Achievement.webp";
import ChronoversyBronze from "../icons/Chronoverse-Bronze-Achievement.webp";

import DefaultIcon from "../icons/default.webp";

const iconMap: Record<AchievementType, Record<string, string>> = {
  gold: {
    "galactas-guide": GalacatGold,
    "rivalry-rising": RivalryGold,
    "heroic-journey": HeroicGold,
    "chronoversy-saga": ChronoversyGold,
  },
  silver: {
    "galactas-guide": GalacatSilver,
    "rivalry-rising": RivalrySilver,
    "heroic-journey": HeroicSilver,
    "chronoversy-saga": ChronoversySilver,
  },
  bronze: {
    "galactas-guide": GalacatBronze,
    "rivalry-rising": RivalryBronze,
    "heroic-journey": HeroicBronze,
    "chronoversy-saga": ChronoversyBronze,
  },
};


const TypeIcon: React.FC<{ type: AchievementType; categoryId: string }> = ({ type, categoryId }) => {
  console.log(`Rendering icon for type: ${type}, categoryId: ${categoryId}`);
  const imageSrc = iconMap[type][categoryId] || DefaultIcon;
  return imageSrc ? <img src={imageSrc} alt={`${type}-${categoryId}`} className="w-13 h-13" /> : null;
};
export const AchievementList: React.FC<AchievementListProps> = ({
  achievements,
  onToggleAchievement,
}) => {
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.completed === b.completed) {
      const typeOrder = { silver: 0, gold: 1, bronze: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    }
    return a.completed ? 1 : -1;
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