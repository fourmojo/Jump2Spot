'use client';

import { useState } from 'react';
import { Navigation, TrendingUp, MapPin } from 'lucide-react';
import { Story, Category, CATEGORY_LABELS, getStoriesByScore, getStoriesByCategory } from '../data/stories';
import { CategoryBadge } from './CategoryBadge';

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
  const secondary = ranked.slice(1, 3);
  const grid = ranked.slice(3, 7);
  const trending = getStoriesByScore(stories).slice(0, 4);

  return (
    <div className="flex flex-col gap-6">

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

      {/* Hero + secondary — desktop side by side */}
      {hero && (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Hero — takes 2/3 width on desktop */}
          <button
            onClick={() => onStorySelect(hero)}
            className="lg:col-span-2 text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={hero.imageUrl}
                alt={hero.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryBadge category={hero.category} size="xs" />
                  <span className="text-[9px] uppercase tracking-widest text-white/60 font-medium">Editor's pick</span>
                </div>
                <p className="text-xl font-semibold text-white leading-snug mb-1">{hero.title}</p>
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-white/50" />
                  <span className="text-xs text-white/60">{hero.neighbourhood} · {hero.distanceM}m away</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-stone-500 leading-relaxed mb-2">{hero.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Navigation size={11} className="text-emerald-500" />
                  <span className="text-xs text-emerald-600">{hero.distanceM}m from you</span>
                </div>
                <span className="text-xs text-stone-400">3 min read</span>
              </div>
            </div>
          </button>

          {/* Secondary stack — 1/3 width on desktop */}
          <div className="flex lg:flex-col gap-4">
            {secondary.map(story => (
              <button
                key={story.id}
                onClick={() => onStorySelect(story)}
                className="flex-1 text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all group flex lg:flex-col"
              >
                <div className="relative w-28 lg:w-full h-full lg:h-36 overflow-hidden shrink-0">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-3">
                  <CategoryBadge category={story.category} size="xs" />
                  <p className="text-sm font-medium text-stone-900 leading-snug mt-1.5 mb-1 line-clamp-2">{story.title}</p>
                  <p className="text-xs text-stone-400">{story.neighbourhood} · {story.distanceM! < 1000 ? `${story.distanceM}m` : `${(story.distanceM! / 1000).toFixed(1)}km`}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid of 4 */}
      {grid.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {grid.map(story => (
            <button
              key={story.id}
              onClick={() => onStorySelect(story)}
              className="text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all group"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <CategoryBadge category={story.category} size="xs" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-stone-900 leading-snug line-clamp-2">{story.title}</p>
                <p className="text-[11px] text-stone-400 mt-1">{story.neighbourhood}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Trending */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-stone-100" />
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-stone-400 font-medium">
            <TrendingUp size={11} />
            Trending in Vancouver
          </div>
          <div className="h-px flex-1 bg-stone-100" />
        </div>

        <div className="grid lg:grid-cols-2 gap-2">
          {trending.map((story, i) => (
            <button
              key={story.id}
              onClick={() => onStorySelect(story)}
              className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-2xl hover:border-stone-300 hover:shadow-sm transition-all text-left group"
            >
              <span className="text-sm text-stone-300 font-medium w-5 shrink-0">{i + 1}</span>
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <CategoryBadge category={story.category} size="xs" />
                <p className="text-sm font-medium text-stone-900 leading-snug mt-1 line-clamp-1">{story.title}</p>
                <p className="text-xs text-stone-400 mt-0.5">{story.neighbourhood}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
