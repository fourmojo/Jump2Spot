'use client';

import { Navigation, Layers } from 'lucide-react';
import { Story, getStoriesByDistance } from '../data/stories';
import { CategoryBadge } from './CategoryBadge';

interface ExploreViewProps {
  stories: Story[];
  onStorySelect: (story: Story) => void;
}

export function ExploreView({ stories, onStorySelect }: ExploreViewProps) {
  const nearby = getStoriesByDistance(stories);
  const featured = nearby[0];
  const rest = nearby.slice(1);

  return (
    <div className="flex gap-6 h-full">

      {/* Left column — map */}
      <div className="hidden lg:flex flex-col gap-4 w-[420px] shrink-0">
        <div className="bg-stone-100 border border-stone-200 rounded-2xl overflow-hidden flex-1 min-h-[500px] relative">
          {/* Map grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 420 600" preserveAspectRatio="none">
            {[100,200,300,400,500].map(y => (
              <line key={y} x1="0" y1={y} x2="420" y2={y} stroke="#78716c" strokeWidth="0.5"/>
            ))}
            {[105,210,315].map(x => (
              <line key={x} x1={x} y1="0" x2={x} y2="600" stroke="#78716c" strokeWidth="0.5"/>
            ))}
            <text x="12" y="590" fill="#78716c" fontSize="9">Water St</text>
            <text x="115" y="590" fill="#78716c" fontSize="9">Carrall St</text>
            <text x="220" y="590" fill="#78716c" fontSize="9">Cambie St</text>
            <text x="325" y="590" fill="#78716c" fontSize="9">Abbott St</text>
          </svg>

          {/* Story pins */}
          {nearby.map((story, i) => {
            const positions = [
              { left: '24%', top: '38%' },
              { left: '18%', top: '55%' },
              { left: '52%', top: '44%' },
              { left: '68%', top: '30%' },
              { left: '40%', top: '65%' },
              { left: '75%', top: '52%' },
              { left: '30%', top: '72%' },
              { left: '60%', top: '20%' },
            ];
            const pos = positions[i] || { left: '50%', top: '50%' };
            const isFirst = i === 0;
            return (
              <button
                key={story.id}
                onClick={() => onStorySelect(story)}
                className="absolute group"
                style={{ left: pos.left, top: pos.top }}
              >
                <div className={`rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125 ${
                  isFirst ? 'w-4 h-4 bg-emerald-500' : 'w-3 h-3 bg-stone-500'
                }`} />
                {isFirst && (
                  <div className="absolute left-5 top-0 bg-white border border-stone-200 text-[10px] text-stone-700 px-2 py-0.5 rounded-lg shadow-sm whitespace-nowrap font-medium">
                    {story.neighbourhood}
                  </div>
                )}
              </button>
            );
          })}

          <div className="absolute bottom-3 right-3 text-[10px] text-stone-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-stone-200">
            Gastown · Vancouver
          </div>
        </div>

        {/* Location stat */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">You're near</p>
          <p className="text-lg font-semibold text-stone-900 tracking-tight">Gastown, Vancouver</p>
          <p className="text-sm text-stone-500 mt-0.5 mb-3">Water St & Abbott St</p>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
            <Layers size={11} />
            {stories.length} stories in this neighbourhood
          </span>
        </div>
      </div>

      {/* Right column — story list */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Mobile location context */}
        <div className="lg:hidden bg-stone-50 border border-stone-200 rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1">You're near</p>
          <p className="text-lg font-semibold text-stone-900">Gastown, Vancouver</p>
          <p className="text-sm text-stone-500 mt-0.5">{stories.length} stories nearby</p>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
          {nearby.length} stories near you
        </p>

        {/* Featured story — large card with image */}
        {featured && (
          <button
            onClick={() => onStorySelect(featured)}
            className="w-full text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all group"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={featured.imageUrl}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <CategoryBadge category={featured.category} size="xs" />
                <p className="text-white font-semibold text-base leading-snug mt-1.5">{featured.title}</p>
              </div>
              <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                Nearest
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-stone-500 leading-relaxed mb-2">{featured.excerpt}</p>
              <div className="flex items-center gap-1.5">
                <Navigation size={11} className="text-emerald-500" />
                <span className="text-xs text-emerald-600">{featured.distanceM}m away · {featured.address}</span>
              </div>
            </div>
          </button>
        )}

        {/* Rest of stories */}
        <div className="flex flex-col gap-2.5">
          {rest.map(story => (
            <button
              key={story.id}
              onClick={() => onStorySelect(story)}
              className="w-full text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 hover:shadow-sm transition-all flex group"
            >
              <div className="w-24 h-24 shrink-0 overflow-hidden">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-3 min-w-0">
                <CategoryBadge category={story.category} size="xs" />
                <p className="text-sm font-medium text-stone-900 leading-snug mt-1 mb-1 line-clamp-2">{story.title}</p>
                <div className="flex items-center gap-1">
                  <Navigation size={10} className="text-emerald-500 shrink-0" />
                  <span className="text-xs text-emerald-600">
                    {story.distanceM! < 1000 ? `${story.distanceM}m` : `${(story.distanceM! / 1000).toFixed(1)}km`} · {story.address}
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
