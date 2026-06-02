'use client';

import { useState } from 'react';
import { Navigation, TrendingUp } from 'lucide-react';
import { Story, Category, CATEGORY_LABELS, getStoriesByScore, getStoriesByCategory } from '../data/stories';
import { CategoryBadge } from './CategoryBadge';
import { CategoryIcon } from './CategoryIcon';

interface BrowseViewProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
}

const FILTERS: { label: string; value: 'all' | Category }[] = [
  { label: 'All stories', value: 'all' },
  { label: 'Film scenes', value: 'film' },
  { label: 'Music', value: 'music' },
  { label: 'Iconic photos', value: 'photo' },
  { label: 'Biographies', value: 'biography' },
  { label: 'Art & culture', value: 'art' },
  { label: 'Innovation', value: 'innovation' },
];

export function BrowseView({ stories, onStorySelect }: BrowseViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | Category>('all');

  const filtered = activeFilter === 'all' ? stories : getStoriesByCategory(stories, activeFilter);
  const ranked = getStoriesByScore(filtered);
  const hero = ranked[0];
  const grid = ranked.slice(1, 5);
  const trending = getStoriesByScore(stories).slice(0, 3);

  return (
    <div className="flex flex-col gap-5">
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeFilter === f.value
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Hero card */}
      {hero && (
        <button
          onClick={() => onStorySelect(hero)}
          className="w-full text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className={`h-48 bg-gradient-to-br ${hero.imageColor} relative flex items-end`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative p-4 w-full">
              <span className="text-[9px] uppercase tracking-widest text-white/70 font-medium block mb-1">
                {CATEGORY_LABELS[hero.category]} · Editor's pick
              </span>
              <p className="text-lg font-semibold text-white leading-snug">{hero.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={10} className="text-white/60" />
                <span className="text-xs text-white/60">{hero.neighbourhood} · {hero.distanceM}m away</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-stone-500 leading-relaxed mb-3">{hero.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Navigation size={11} className="text-emerald-500" />
                <span className="text-xs text-emerald-600">
                  {hero.distanceM! < 1000 ? `${hero.distanceM}m` : `${(hero.distanceM! / 1000).toFixed(1)}km`} from you
                </span>
              </div>
              <span className="text-xs text-stone-400">3 min read</span>
            </div>
          </div>
        </button>
      )}

      {/* 2-col grid */}
      {grid.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5">
          {grid.map(story => (
            <button
              key={story.id}
              onClick={() => onStorySelect(story)}
              className="text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-sm transition-all"
            >
              <div className={`h-20 bg-gradient-to-br ${story.imageColor} flex items-center justify-center`}>
                <CategoryIcon category={story.category} size={20} />
              </div>
              <div className="p-3">
                <CategoryBadge category={story.category} size="xs" />
                <p className="text-xs font-medium text-stone-900 leading-snug mt-1.5 mb-1 line-clamp-2">
                  {story.title}
                </p>
                <p className="text-[10px] text-stone-400">{story.neighbourhood} · {story.distanceM}m</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Trending divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-stone-100" />
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-stone-400 font-medium">
          <TrendingUp size={11} />
          Trending in Vancouver
        </div>
        <div className="h-px flex-1 bg-stone-100" />
      </div>

      {/* Trending list */}
      <div className="flex flex-col">
        {trending.map((story, i) => (
          <button
            key={story.id}
            onClick={() => onStorySelect(story)}
            className="flex items-start gap-3 py-3 border-b border-stone-100 last:border-0 hover:bg-stone-50 -mx-1 px-1 rounded-xl transition-colors text-left"
          >
            <span className="text-xs text-stone-300 font-medium w-4 shrink-0 mt-0.5">{i + 1}</span>
            <CategoryIcon category={story.category} size={16} />
            <div className="flex-1">
              <CategoryBadge category={story.category} size="xs" />
              <p className="text-sm font-medium text-stone-900 leading-snug mt-1">{story.title}</p>
              <p className="text-xs text-stone-400 mt-0.5">{story.neighbourhood}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Need MapPin for hero card
import { MapPin } from 'lucide-react';
