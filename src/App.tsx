import React, { useState, useEffect, useRef } from 'react';
import { CategoryList } from './components/CategoryList';
import { AchievementList } from './components/AchievementList';
import { AppState, SortOption } from './types';
import { initialCategories } from './data';
import { generateShareableUrl, hasSharedProgress, getSharedProgress } from './utils/shareUtils';
import { Check, Share2, Download, Upload, CheckSquare, Square, Menu, X, Eye, EyeOff, MoveDown, ChevronDown, Settings, Search, Plus } from 'lucide-react';
import { PopConfirm } from './components/PopConfirm';

import Icon from "./icons/default.webp";


function App() {
  const settingsRef = useRef<HTMLDivElement>(null);
  const saved = localStorage.getItem('completedAchievements');
  const completedIds: Record<string, string[]> = saved ? JSON.parse(saved) : {};
  let isSharedView = hasSharedProgress();

  // Load states from localStorage
  const savedHideCompleted = localStorage.getItem('hideCompleted');
  const initialHideCompleted = savedHideCompleted ? JSON.parse(savedHideCompleted) : false;
  const savedSortCompleted = localStorage.getItem('sortCompleted');
  const initialSortCompleted = savedSortCompleted ? JSON.parse(savedSortCompleted) : true;
  const savedSelectedCategory = localStorage.getItem('selectedCategory');
  const savedSortOption = localStorage.getItem('sortOption');
  const savedSortDirection = localStorage.getItem('sortDirection');

  const [state, setState] = useState<AppState>({
    categories: initialCategories.map(category => ({
      ...category,
      achievements: category.achievements.map(achievement => ({
        ...achievement,
        completed: completedIds[category.id]?.includes(achievement.id) || false,
      })),
    })),
    selectedCategory: savedSelectedCategory || initialCategories[0]?.id || null
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(initialHideCompleted);
  const [sortCompleted, setSortCompleted] = useState(initialSortCompleted);
  const [sortOption, setSortOption] = useState<SortOption>(savedSortOption as SortOption || 'type');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(savedSortDirection as 'asc' | 'desc' || 'asc');
  const [copied, setCopied] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // New filter states
  const [selectedHero, setSelectedHero] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<string>('');
  const [selectedTarget, setSelectedTarget] = useState<string>('');

  // Click outside handler for settings menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get unique heroes, partners, and targets
  const getUniqueValues = () => {
    const heroes = new Set<string>();
    const partners = new Set<string>();
    const targets = new Set<string>();

    state.categories.forEach(category => {
      category.achievements.forEach(achievement => {
        if (achievement.hero) heroes.add(achievement.hero);
        if (achievement.partner) partners.add(achievement.partner);
        if (achievement.target) targets.add(achievement.target);
      });
    });

    return {
      heroes: Array.from(heroes).sort(),
      partners: Array.from(partners).sort(),
      targets: Array.from(targets).sort()
    };
  };

  const { heroes, partners, targets } = getUniqueValues();




  useEffect(() => {
    localStorage.setItem('hideCompleted', JSON.stringify(hideCompleted));
  }, [hideCompleted]);

  useEffect(() => {
    localStorage.setItem('sortCompleted', JSON.stringify(sortCompleted));
  }, [sortCompleted]);

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('sortDirection', sortDirection);
  }, [sortDirection]);

  useEffect(() => {
    const completedAchievements = state.categories.reduce((acc, category) => {
      const completedIds = category.achievements
        .filter(ach => ach.completed)
        .map(ach => ach.id);
      if (completedIds.length > 0) {
        acc[category.id] = completedIds;
      }
      return acc;
    }, {} as Record<string, string[]>);

    !isSharedView ? localStorage.setItem('completedAchievements', JSON.stringify(completedAchievements)) : null;
  }, [state.categories]);

  const handleSelectCategory = (categoryId: string) => {
    setState(prev => ({ ...prev, selectedCategory: categoryId }));
    localStorage.setItem('selectedCategory', categoryId);
    setSearchTerm('');
    setIsMobileMenuOpen(false);
    setIsSettingsOpen(false);
  };

  const handleToggleAchievement = (achievementId: string) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(cat => ({
        ...cat,
        achievements: cat.achievements.map(ach =>
          ach.id === achievementId ? { ...ach, completed: !ach.completed } : ach
        )
      }))
    }));
  };

  const handleToggleAll = (categoryId: string, completed: boolean) => {
    setState(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === categoryId
          ? {
            ...cat,
            achievements: cat.achievements.map(ach => ({ ...ach, completed }))
          }
          : cat
      )
    }));
  };

  useEffect(() => {
    if (hasSharedProgress()) {
      const completedIds = getSharedProgress();
      if (completedIds) {
        setState(prev => ({
          ...prev,
          categories: prev.categories.map(category => ({
            ...category,
            achievements: category.achievements.map(achievement => ({
              ...achievement,
              completed: completedIds.includes(achievement.id),
            })),
          })),
        }));
      }
    }
  }, []);

  const handleShare = () => {
    const url = generateShareableUrl(state.categories);
    try { navigator.clipboard.writeText(url) } catch { copyTextToClipboard(url) }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportConfirm = () => {
    const completedAchievements = state.categories.reduce((acc, category) => {
      const completedIds = category.achievements
        .filter(ach => ach.completed)
        .map(ach => ach.id);
      if (completedIds.length > 0) {
        acc[category.id] = completedIds;
      }
      return acc;
    }, {} as Record<string, string[]>);
    isSharedView = false
    window.history.replaceState({}, '', window.location.pathname);
    localStorage.setItem('completedAchievements', JSON.stringify(completedAchievements))
  };

  const handleCreateOwn = () => {
    window.history.replaceState({}, '', window.location.pathname);
    window.location.reload();
  };

  function copyTextToClipboard(text: string): void {
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = text;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  const handleExport = () => {
    const completedAchievements = state.categories.reduce((acc, category) => {
      const completedIds = category.achievements
        .filter(ach => ach.completed)
        .map(ach => ach.id);
      if (completedIds.length > 0) {
        acc[category.id] = completedIds;
      }
      return acc;
    }, {} as Record<string, string[]>);

    const dataStr = JSON.stringify(completedAchievements);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = 'completed_achievements.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedIds = JSON.parse(e.target?.result as string);

        setState(prev => ({
          ...prev,
          categories: prev.categories.map(category => ({
            ...category,
            achievements: category.achievements.map(achievement => ({
              ...achievement,
              completed: importedIds[category.id]?.includes(achievement.id) || false,
            })),
          })),
        }));
      } catch (error) {
        console.error('Error importing file:', error);
      }
    };
    reader.readAsText(file);
  };

  const selectedCategory = state.categories.find(cat => cat.id === state.selectedCategory);
  const isAllCompleted = selectedCategory?.achievements.every(ach => ach.completed) ?? false;

  const filteredAchievements = selectedCategory?.achievements.filter(achievement =>
    (
      achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (!hideCompleted || !achievement.completed) &&
    (!selectedHero || achievement.hero === selectedHero) &&
    (!selectedPartner || achievement.partner === selectedPartner) &&
    (!selectedTarget || achievement.target === selectedTarget)
  ) || [];

  const totalAchievements = state.categories.reduce((sum, category) => sum + category.achievements.length, 0);
  const completedAchievementsNo = state.categories.reduce((sum, category) => sum + category.achievements.filter(ach => ach.completed).length, 0);
  const progressPercentage = totalAchievements > 0 ? (completedAchievementsNo / totalAchievements) * 100 : 0;


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {isSharedView && (
        <div className="bg-purple-900/50 backdrop-blur-sm border-b border-purple-800">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <p className="text-sm md:text-base text-purple-200">
              <span className="md:inline">You're viewing someone's shared progress. </span>
              Want to track your own achievements?
            </p>
            <button
              onClick={handleCreateOwn}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your Own</span>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2 md:gap-4 mb-4 md:mb-8 md:flex-row md:justify-between md:items-start">
          <div className="flex flex-col md:flex-row md:items-start gap-2 flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img src={Icon} alt="MR Icon" className="w-10 h-10" />
              <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                MR Achievements Tracker
              </h1>
            </div>

            <div className="flex items-center flex-1 md:pt-3.5">
              <div className="relative flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-purple-400 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-300 ml-2">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
          <PopConfirm
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleImportConfirm}
            title="Import Progress"
            description="This will override your current progress with the imported data. Are you sure you want to continue?"
          />
          {isSharedView && (
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Import</span>
            </button>
          )}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        {!isSettingsOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden fixed bottom-4 right-4 z-50 p-4 bg-purple-600 rounded-full shadow-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}

        {/* Settings Menu */}
        <div
          ref={settingsRef}
          className={`
            fixed inset-y-0 right-0 z-40 w-80 bg-gray-900/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out
            ${isSettingsOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Filters */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Filters</h3>
                <div className="space-y-2">
                  {/* Hero Filter */}
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Hero</label>
                    <div className="relative">
                      <select
                        value={selectedHero}
                        onChange={(e) => setSelectedHero(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-purple-500 appearance-none pr-8"
                      >
                        <option value="">All Heroes</option>
                        {heroes.map(hero => (
                          <option key={hero} value={hero}>{hero}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      {selectedHero && (
                        <button
                          onClick={() => setSelectedHero('')}
                          className="absolute inset-y-0 right-8 flex items-center px-2 text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Partner Filter */}
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Partner</label>
                    <div className="relative">
                      <select
                        value={selectedPartner}
                        onChange={(e) => setSelectedPartner(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-purple-500 appearance-none pr-8"
                      >
                        <option value="">All Partners</option>
                        {partners.map(partner => (
                          <option key={partner} value={partner}>{partner}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      {selectedPartner && (
                        <button
                          onClick={() => setSelectedPartner('')}
                          className="absolute inset-y-0 right-8 flex items-center px-2 text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Target Filter */}
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Target</label>
                    <div className="relative">
                      <select
                        value={selectedTarget}
                        onChange={(e) => setSelectedTarget(e.target.value)}
                        className="w-full p-2 bg-gray-800 rounded-lg border border-gray-700 text-sm focus:outline-none focus:border-purple-500 appearance-none pr-8"
                      >
                        <option value="">All Targets</option>
                        {targets.map(target => (
                          <option key={target} value={target}>{target}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      {selectedTarget && (
                        <button
                          onClick={() => setSelectedTarget('')}
                          className="absolute inset-y-0 right-8 flex items-center px-2 text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Visibility</h3>
                <button
                  onClick={() => setHideCompleted(!hideCompleted)}
                  className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <span>{hideCompleted ? "Show Completed" : "Hide Completed"}</span>
                  {hideCompleted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Sorting */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-300">Sorting</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortCompleted(!sortCompleted)}
                    className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
                  >
                    <span>Move Completed to Bottom</span>
                    <MoveDown className={`w-4 h-4 ${sortCompleted ? 'text-purple-400' : ''}`} />
                  </button>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Sort by</label>
                    {['type', 'name'].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          if (sortOption === option) {
                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortOption(option as SortOption);
                            setSortDirection('asc');
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 ${sortOption === option ? 'text-purple-400' : ''
                          }`}
                      >
                        <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                        {sortOption === option && (
                          <ChevronDown className={`w-4 h-4 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Import/Export */}
              {!isSharedView && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Data Management</h3>
                  <div className="space-y-2">

                    {/* URL GEN */}
                    <div className="space-y-2">
                      <><label className="text-sm text-gray-400">Shareable link</label><button
                        onClick={copied ? undefined : handleShare}
                        disabled={copied}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${copied
                          ? "bg-green-600/20 border border-green-500/30 cursor-not-allowed"
                          : "bg-purple-600/20 border border-purple-500/30 hover:bg-purple-600/30 cursor-pointer"} rounded-lg transition-colors`}
                      >
                        {copied
                          ? <Check className="w-4 h-4" />
                          : <Share2 className="w-4 h-4" />}
                        <span>{copied ? "Link Copied!" : "Share Progress"}</span>
                      </button></>
                    </div>

                      {/* JSON GEN */}
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Export and Import json file</label>
                    </div>
                    <button
                      onClick={handleExport}
                      className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
                    >
                      <span>Export Progress</span>
                      <Upload className="w-4 h-4" />
                    </button>
                    <label className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
                      <span>Import Progress</span>
                      <Download className="w-4 h-4" />
                      <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Mobile Category Sidebar */}
          <div className={`
            fixed inset-0 z-30 bg-gray-900/95 backdrop-blur-sm md:relative md:bg-transparent md:block md:backdrop-blur-none
            transition-transform duration-300 ease-in-out w-full md:w-80 flex justify-center
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="h-full md:h-auto w-full overflow-y-auto p-4 md:p-0 md:max-h-[calc(100vh-200px)]">
              <CategoryList
                categories={state.categories}
                selectedCategory={state.selectedCategory}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </div>

          {/* Achievement Content */}
          <div className="flex-1 mt-1 md:mt-0">
            {selectedCategory && (
              <div className="space-y-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search achievements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <button
                    onClick={() => handleToggleAll(selectedCategory.id, !isAllCompleted)}
                    disabled={isSharedView}
                    className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg whitespace-nowrap transition-colors ${isSharedView
                      ? 'bg-gray-800/50 border-gray-700/50 cursor-not-allowed opacity-50'
                      : 'bg-purple-600/20 border-purple-500/30 hover:bg-purple-600/30'
                      }`}
                  >
                    {isAllCompleted ? <Square className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
                    <span>{isAllCompleted ? "Deselect All" : "Select All"}</span>
                  </button>
                </div>
                <AchievementList
                  achievements={filteredAchievements}
                  onToggleAchievement={handleToggleAchievement}
                  sortCompleted={sortCompleted}
                  sortOption={sortOption}
                  sortDirection={sortDirection}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 p-4 text-center text-gray-400">
        <div className="flex items-center justify-center gap-4">
          <span>Made with ❤️ by MaJoR</span>
          <a href="https://github.com/MaJoRX0/MRAchievements" className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.61-3.37-1.34-3.37-1.34-.45-1.14-1.11-1.45-1.11-1.45-.91-.63.07-.62.07-.62 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.64.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 2.5-.34c.85 0 1.71.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.74 0 .27.18.59.69.49A10.002 10.002 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;