'use client';

import { useState } from 'react';
import { Map, LayoutList, Search, Compass } from 'lucide-react';
import { stories, Story } from './data/stories';
import { ExploreView } from './components/ExploreView';
import { BrowseView } from './components/BrowseView';
import { StoryView } from './components/StoryView';

type Mode = 'explore' | 'browse' | 'story';

export default function Home() {
  const [mode, setMode] = useState<Mode>('explore');
  const [previousMode, setPreviousMode] = useState<Mode>('explore');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  function handleStorySelect(story: Story) {
    setPreviousMode(mode === 'story' ? previousMode : mode);
    setSelectedStory(story);
    setMode('story');
  }

  function handleBack() {
    setMode(previousMode);
    setSelectedStory(null);
  }

  function handleNavChange(newMode: 'explore' | 'browse') {
    setMode(newMode);
    setSelectedStory(null);
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Top header */}
      <header className="sticky top-0 z-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6">

          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <Compass size={18} className="text-emerald-500" />
            <span className="text-base font-semibold tracking-tight text-stone-900">
              Jump<span className="text-emerald-500">2</span>Spot
            </span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-400 hover:border-stone-300 transition-colors cursor-text">
              <Search size={14} />
              <span>Search any address or place…</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavChange('explore')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === 'explore' || (mode === 'story' && previousMode === 'explore')
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              <Map size={15} />
              Explore
            </button>
            <button
              onClick={() => handleNavChange('browse')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === 'browse' || (mode === 'story' && previousMode === 'browse')
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              <LayoutList size={15} />
              Browse
            </button>
          </nav>

          {/* Location pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 text-xs text-stone-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Gastown, Vancouver
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-28 lg:pb-8">
        {mode === 'explore' && (
          <ExploreView stories={stories} onStorySelect={handleStorySelect} />
        )}
        {mode === 'browse' && (
          <BrowseView stories={stories} onStorySelect={handleStorySelect} />
        )}
        {mode === 'story' && selectedStory && (
          <StoryView
            story={selectedStory}
            allStories={stories}
            onBack={handleBack}
            onStorySelect={handleStorySelect}
          />
        )}
      </main>

      {/* Mobile bottom nav */}
      {mode !== 'story' && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-stone-200 z-20">
          <div className="max-w-lg mx-auto px-4 py-3 flex justify-around">
            <button
              onClick={() => handleNavChange('explore')}
              className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-xl transition-all ${
                mode === 'explore' ? 'text-emerald-600' : 'text-stone-400'
              }`}
            >
              <Map size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wide">Explore</span>
            </button>
            <button
              onClick={() => handleNavChange('browse')}
              className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-xl transition-all ${
                mode === 'browse' ? 'text-emerald-600' : 'text-stone-400'
              }`}
            >
              <LayoutList size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wide">Browse</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
