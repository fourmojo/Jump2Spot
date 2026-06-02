'use client';

import { MapPin, Navigation, Share2, Bookmark, ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { Story, getStoriesByScore } from '../data/stories';
import { CategoryBadge } from './CategoryBadge';

interface StoryViewProps {
  story: Story;
  allStories: Story[];
  onBack: () => void;
  onStorySelect: (story: Story) => void;
}

export function StoryView({ story, allStories, onBack, onStorySelect }: StoryViewProps) {
  const ranked = getStoriesByScore(allStories);
  const currentIndex = ranked.findIndex(s => s.id === story.id);
  const prevStory = currentIndex > 0 ? ranked[currentIndex - 1] : null;
  const nextStory = currentIndex < ranked.length - 1 ? ranked[currentIndex + 1] : null;
  const progress = ((currentIndex + 1) / ranked.length) * 100;
  const walkMinutes = Math.round((story.distanceM ?? 0) / 80);
  const related = ranked.filter(s => s.id !== story.id && s.category === story.category).slice(0, 3);

  return (
    <div className="flex gap-8">

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {/* Hero image — full width, tall */}
        <div className="relative w-full h-80 lg:h-[420px] rounded-2xl overflow-hidden">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-white/60" style={{ width: `${progress}%` }} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge category={story.category} size="xs" />
              <span className="text-[9px] uppercase tracking-widest text-white/50 font-medium">
                Story {currentIndex + 1} of {ranked.length}
              </span>
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-white leading-snug mb-2">{story.title}</p>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-white/50" />
              <span className="text-sm text-white/60">{story.address}, {story.neighbourhood}</span>
            </div>
          </div>
        </div>

        {/* Context strip */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Navigation, label: 'Distance', value: story.distanceM! < 1000 ? `${story.distanceM}m` : `${(story.distanceM! / 1000).toFixed(1)}km` },
            { icon: Clock, label: 'Walk time', value: walkMinutes < 1 ? '<1 min' : `${walkMinutes} min` },
            { icon: Calendar, label: 'Year', value: story.year.toString() },
            { icon: MapPin, label: 'Area', value: story.neighbourhood },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-stone-50 rounded-xl p-3 text-center border border-stone-100">
              <Icon size={14} className="text-stone-400 mx-auto mb-1" />
              <p className="text-[9px] text-stone-400 uppercase tracking-wide mb-0.5">{label}</p>
              <p className="text-xs font-medium text-stone-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Story body */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <p className="text-base text-stone-600 leading-relaxed">{story.body}</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-stone-700 transition-colors">
            <Navigation size={14} />
            Take me there
          </button>
          <button className="flex items-center justify-center gap-2 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
            <Share2 size={14} />
            Share
          </button>
          <button className="flex items-center justify-center gap-2 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
            <Bookmark size={14} />
          </button>
        </div>

        {/* Prev / Next */}
        <div className="grid grid-cols-2 gap-3">
          {prevStory ? (
            <button onClick={() => onStorySelect(prevStory)}
              className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl p-4 hover:border-stone-300 hover:shadow-sm transition-all text-left group">
              <ChevronLeft size={14} className="text-stone-400 shrink-0" />
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img src={prevStory.imageUrl} alt={prevStory.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-wide text-stone-400 mb-0.5">Previous</p>
                <p className="text-xs font-medium text-stone-800 line-clamp-2 leading-snug">{prevStory.title}</p>
              </div>
            </button>
          ) : <div />}

          {nextStory ? (
            <button onClick={() => onStorySelect(nextStory)}
              className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl p-4 hover:border-stone-300 hover:shadow-sm transition-all text-left group">
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-wide text-stone-400 mb-0.5 text-right">Next</p>
                <p className="text-xs font-medium text-stone-800 line-clamp-2 leading-snug text-right">{nextStory.title}</p>
              </div>
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <img src={nextStory.imageUrl} alt={nextStory.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <ChevronRight size={14} className="text-stone-400 shrink-0" />
            </button>
          ) : <div />}
        </div>
      </div>

      {/* Right sidebar — desktop only */}
      {related.length > 0 && (
        <div className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">More {story.category} stories</p>
          {related.map(s => (
            <button
              key={s.id}
              onClick={() => onStorySelect(s)}
              className="text-left bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-stone-300 transition-all group"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <CategoryBadge category={s.category} size="xs" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-stone-900 leading-snug mb-1 line-clamp-2">{s.title}</p>
                <p className="text-xs text-stone-400">{s.neighbourhood} · {s.year}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
