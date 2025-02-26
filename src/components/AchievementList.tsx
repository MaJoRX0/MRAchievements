import React, { useState, useEffect, useRef } from 'react';
import { Achievement, AchievementType, SortOption } from '../types';
import { HelpCircle, ExternalLink } from 'lucide-react';
import { hasSharedProgress } from '../utils/shareUtils';


interface AchievementListProps {
  achievements: Achievement[];
  onToggleAchievement: (id: string) => void;
  sortCompleted: boolean;
  sortOption: SortOption;
  sortDirection: 'asc' | 'desc';
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
  const imageSrc = iconMap[type][categoryId] || DefaultIcon;
  return imageSrc ? <img src={imageSrc} alt={`${type}-${categoryId}`} className="w-13 h-13" /> : null;
};


const HintContent: React.FC<{ content: string }> = ({ content }) => {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.match(urlRegex)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="underline">Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

const HighlightedText: React.FC<{ text: string; achievement: Achievement }> = ({ text, achievement }) => {
  const matches = [];
  let lastIndex = 0;

  // Find all matches for hero, partner, and target
  if (achievement.hero) {
    const index = text.toLowerCase().indexOf(achievement.hero.toLowerCase());
    if (index !== -1) {
      matches.push({
        index,
        length: achievement.hero.length,
        type: 'hero',
        text: text.slice(index, index + achievement.hero.length)
      });
    }
  }

  if (achievement.partner) {
    const index = text.toLowerCase().indexOf(achievement.partner.toLowerCase());
    if (index !== -1) {
      matches.push({
        index,
        length: achievement.partner.length,
        type: 'partner',
        text: text.slice(index, index + achievement.partner.length)
      });
    }
  }

  if (achievement.target) {
    const index = text.toLowerCase().indexOf(achievement.target.toLowerCase());
    if (index !== -1) {
      matches.push({
        index,
        length: achievement.target.length,
        type: 'target',
        text: text.slice(index, index + achievement.target.length)
      });
    }
  }


  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);

  // Build the result
  const result = [];
  matches.forEach((match) => {
    // Add text before the match
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }

    // Add the highlighted match
    result.push(
      <span
        key={`${match.type}-${match.index}`}
        className={`font-semibold ${
          match.type === 'hero' ? 'text-blue-400' :
          match.type === 'partner' ? 'text-green-400' :
          'text-red-400'
        }`}
      >
        {match.text}
      </span>
    );

    lastIndex = match.index + match.length;
  });

  // Add any remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return <>{result}</>;
};

export const AchievementList: React.FC<AchievementListProps> = ({
  achievements,
  onToggleAchievement,
  sortCompleted,
  sortOption,
  sortDirection
}) => {
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const isSharedView = hasSharedProgress();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hintRef.current && !hintRef.current.contains(event.target as Node)) {
        setActiveHint(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (sortCompleted && a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    let comparison = 0;
    switch (sortOption) {
      case 'type':
        const typeOrder = { silver: 0, gold: 1, bronze: 2 };
        comparison = typeOrder[a.type] - typeOrder[b.type];
        break;
      case 'name':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'points':
        comparison = a.points - b.points;
        break;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {sortedAchievements.map((achievement) => (
        <div
          key={achievement.id}
          onClick={() => !isSharedView && onToggleAchievement(achievement.id)}
          className={`relative p-4 rounded-lg ${
            !isSharedView ? 'cursor-pointer hover:transform hover:scale-[1.02]' : 'cursor-default'
          } transition-all duration-300 overflow-hidden ${
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
              <div className="flex-1 min-w-0"> {/* Add min-w-0 to enable text truncation */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white truncate">{achievement.title}</h3>
                  {achievement.hint && (
                    <div className="relative" ref={hintRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHint(activeHint === achievement.id ? null : achievement.id);
                        }}
                        className="group flex-shrink-0"
                      >
                        <HelpCircle className={`w-5 h-5 transition-colors ${
                          activeHint === achievement.id ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'
                        }`} />
                      </button>
                      
                      {/* Hint Tooltip */}
                      {activeHint === achievement.id && (
                        <div 
                          className="absolute right-0 mt-2 w-64 p-3 bg-gray-900 rounded-lg shadow-xl border border-purple-500/30 z-50 break-words"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-sm text-gray-300">
                            <HintContent content={achievement.hint} />
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-400 break-words">
                  <HighlightedText text={achievement.description} achievement={achievement} />
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