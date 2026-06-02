'use client';

import { MapPin, Navigation, Layers } from 'lucide-react';
import { Story, getStoriesByDistance, CATEGORY_LABELS } from '../data/stories';
import { CategoryBadge } from './CategoryBadge';
import { CategoryIcon } from './CategoryIcon';

interface ExploreViewProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
}

export function ExploreView({ stories, onStorySelect }: ExploreViewProps) {
  const nearby = getStoriesByDistance(stories).slice(0, 5);
  const featured = nearby[0];

  return (
    <div className="flex flex-col gap-5">
      {/* Location context */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">You're near</p>
        <p className="text-xl font-semibold text-stone-900 tracking-tight">Gastown, Vancouver</p>
        <p className="text-sm text-stone-500 mt-0.5 mb-3">Water St & Abbott St</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
          <Layers size={11} />
          {stories.length} stories in this neighbourhood
        </span>
      </div>

      {/* Map stub */}
      <div className="relative w-full h-44 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 176">
          <line x1="0" y1="58" x2="400" y2="58" stroke="#78716c" strokeWidth="0.5"/>
          <line x1="0" y1="116" x2="400" y2="116" stroke="#78716c" strokeWidth="0.5"/>
          <line x1="100" y1="0" x2="100" y2="176" stroke="#78716c" strokeWidth="0.5"/>
          <line x1="200" y1="0" x2="200" y2="176" stroke="#78716c" strokeWidth="0.5"/>
          <line x1="300" y1="0" x2="300" y2="176" stroke="#78716c" strokeWidth="0.5"/>
          <text x="12" y="170" fill="#78716c" fontSize="8">Water St</text>
          <text x="110" y="170" fill="#78716c" fontSize="8">Carrall St</text>
          <text x="210" y="170" fill="#78716c" fontSize="8">Cambie St</text>
        </svg>

        {/* Story pins */}
        <div className="absolute" style={{ left: '22%', top: '38%' }}>
          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm cursor-pointer" title={featured?.title} />
        </div>
        <div className="absolute bg-white border border-stone-200 text-[9px] text-stone-600 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap" style={{ left: '26%', top: '22%' }}>
          {featured ? CATEGORY_LABELS[featured.category] : ''}
        </div>
        <div className="absolute w-2.5 h-2.5 rounded-full bg-stone-400 border-2 border-white shadow-sm" style={{ left: '52%', top: '54%' }} />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-stone-400 border-2 border-white shadow-sm" style={{ left: '66%', top: '34%' }} />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-stone-400 border-2 border-white shadow-sm" style={{ left: '15%', top: '62%' }} />

        <div className="absolute bottom-3 right-3 text-[10px] text-stone-400 bg-white/80 px-2 py-1 rounded-lg">
          Map · Gastown
        </div>
      </div>

      {/* Nearby stories */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-3">
          {nearby.length} stories near you
        </p>
        <div className="flex flex-col gap-2.5">
          {nearby.map((story, i) => (
            <button
              key={story.id}
              onClick={() => onStorySelect(story)}
              className={`w-full text-left bg-white border rounded-2xl p-4 flex gap-3.5 items-start hover:border-stone-300 hover:shadow-sm transition-all ${
                i === 0 ? 'border-l-[3px] border-l-emerald-400 border-stone-200' : 'border-stone-200'
              }`}
            >
              <CategoryIcon category={story.category} size={18} />
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <CategoryBadge category={story.category} size="xs" />
                </div>
                <p className="text-sm font-medium text-stone-900 leading-snug mb-1 line-clamp-2">
                  {story.title}
                </p>
                <p className="text-xs text-stone-400 mb-2">{story.address}</p>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{story.excerpt}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Navigation size={10} className="text-emerald-500" />
                  <span className="text-xs text-emerald-600">
                    {story.distanceM! < 1000
                      ? `${story.distanceM}m away`
                      : `${(story.distanceM! / 1000).toFixed(1)}km away`}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
