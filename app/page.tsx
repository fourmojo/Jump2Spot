'use client';

import { useState } from 'react';
import { Map, LayoutList, Search } from 'lucide-react';
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
    setPreviousMode(mode);
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
      <div className="max-w-lg mx-auto px-4 pb-28">

        {/* Header */}
        <header className="sticky top-0 z-10 bg-stone-50/90 backdrop-blur-sm pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <span className="text-base font-semibold tracking-tight text-stone-900">
                Jump<span className="text-emerald-500">2</span>Spot
              </span>
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-400">
              <Search size={14} />
              <span>Search any address or place…</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pt-2">
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
      </div>

      {/* Bottom nav */}
      {mode !== 'story' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-stone-200 z-20">
          <div className="max-w-lg mx-auto px-4 py-3 flex justify-around">
            <button
              onClick={() => handleNavChange('explore')}
              className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-xl transition-all ${
                mode === 'explore' ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Map size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wide">Explore</span>
            </button>
            <button
              onClick={() => handleNavChange('browse')}
              className={`flex flex-col items-center gap-1 px-6 py-1.5 rounded-xl transition-all ${
                mode === 'browse' ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'
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
