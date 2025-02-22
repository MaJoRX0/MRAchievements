import React, { useState, useEffect } from 'react';
import { CategoryList } from './components/CategoryList';
import { AchievementList } from './components/AchievementList';
import { AppState, SortOption } from './types';
import { initialCategories } from './data';
import { Download, Upload, CheckSquare, Square, Menu, X, Eye, EyeOff, MoveDown, ChevronDown } from 'lucide-react';

function App() {
  const saved = localStorage.getItem('completedAchievements');
  const completedIds: Record<string, string[]> = saved ? JSON.parse(saved) : {};

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
  const [hideCompleted, setHideCompleted] = useState(initialHideCompleted);
  const [sortCompleted, setSortCompleted] = useState(initialSortCompleted);
  const [sortOption, setSortOption] = useState<SortOption>(savedSortOption as SortOption || 'type');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(savedSortDirection as 'asc' | 'desc' || 'asc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

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

    localStorage.setItem('completedAchievements', JSON.stringify(completedAchievements));
  }, [state.categories]);

  const totalAchievements = state.categories.reduce((sum, category) => sum + category.achievements.length, 0);
  const completedAchievements = state.categories.reduce((sum, category) => sum + category.achievements.filter(ach => ach.completed).length, 0);
  const progressPercentage = totalAchievements > 0 ? (completedAchievements / totalAchievements) * 100 : 0;

  const handleSelectCategory = (categoryId: string) => {
    setState(prev => ({ ...prev, selectedCategory: categoryId }));
    localStorage.setItem('selectedCategory', categoryId);
    setSearchTerm('');
    setIsMobileMenuOpen(false);
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
    (!hideCompleted || !achievement.completed)
  ) || [];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col gap-2 md:gap-4 mb-4 md:mb-8 md:flex-row md:justify-between md:items-start">
          <div className="flex flex-col md:flex-row md:items-start gap-2 flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              MR Achievements Tracker
            </h1>


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

          <div className="flex gap-2 md:gap-4">
            <button
              onClick={handleExport}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors text-sm md:text-base"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </button>
            <label className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors cursor-pointer text-sm md:text-base">
              <Upload className="w-4 h-4" />
              <span className="hidden md:inline">Import</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden fixed bottom-4 right-4 z-50 p-4 bg-purple-600 rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Mobile Category Sidebar */}
          <div className={`
            fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm md:relative md:bg-transparent md:block md:backdrop-blur-none
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
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-2 md:gap-4 md:flex-row w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search achievements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 rounded-md bg-gray-700 text-white w-full md:w-72"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setHideCompleted(!hideCompleted)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
                      >
                        {hideCompleted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span>{hideCompleted ? "Show Completed" : "Hide Completed"}</span>
                      </button>
                      <button
                        onClick={() => setSortCompleted(!sortCompleted)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
                        title={sortCompleted ? "Disable move completed to bottom" : "Enable move completed to bottom"}
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                      <div className="relative flex-1 md:flex-none">
                        <button
                          onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
                        >
                          Sort by
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        {isSortMenuOpen && (
                          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                            <div className="py-1">
                              {['type', 'name', 'points'].map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    if (sortOption === option) {
                                      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                    } else {
                                      setSortOption(option as SortOption);
                                      setSortDirection('asc');
                                    }
                                    setIsSortMenuOpen(false);
                                  }}
                                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${sortOption === option ? 'text-purple-400' : 'text-gray-300'
                                    }`}
                                >
                                  {option.charAt(0).toUpperCase() + option.slice(1)}
                                  {sortOption === option && ` (${sortDirection === 'asc' ? '↑' : '↓'})`}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleAll(selectedCategory.id, !isAllCompleted)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors w-full md:w-auto"
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