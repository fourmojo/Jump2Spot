'use client';

import { MapPin, Navigation, Share2, Bookmark, ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { Story, CATEGORY_LABELS, getStoriesByScore } from '../data/stories';
import { CategoryBadge } from './CategoryBadge';
import { CategoryIcon } from './CategoryIcon';

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

  return (
    <div className="flex flex-col gap-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors w-fit"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      {/* Main story card */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        {/* Visual header */}
        <div className={`h-56 bg-gradient-to-br ${story.imageColor} relative flex items-end`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-white/70 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="relative p-5 w-full">
            <div className="mb-2">
              <span className="text-[9px] uppercase tracking-widest text-white/60 font-medium">
                Story {currentIndex + 1} of {ranked.length}
              </span>
            </div>
            <p className="text-xl font-semibold text-white leading-snug mb-2">{story.title}</p>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-white/60" />
              <span className="text-xs text-white/60">{story.address}, {story.neighbourhood}</span>
            </div>
          </div>
        </div>

        {/* Story body */}
        <div className="p-5">
          <CategoryBadge category={story.category} />

          <p className="text-[15px] text-stone-600 leading-relaxed mt-4 mb-5">{story.body}</p>

          {/* Context strip */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[
              { icon: Navigation, label: 'Distance', value: story.distanceM! < 1000 ? `${story.distanceM}m` : `${(story.distanceM! / 1000).toFixed(1)}km` },
              { icon: Clock, label: 'Walk time', value: walkMinutes < 1 ? '<1 min' : `${walkMinutes} min` },
              { icon: Calendar, label: 'Year', value: story.year.toString() },
              { icon: MapPin, label: 'Area', value: story.neighbourhood },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-stone-50 rounded-xl p-2.5 text-center border border-stone-100">
                <Icon size={14} className="text-stone-400 mx-auto mb-1" />
                <p className="text-[9px] text-stone-400 uppercase tracking-wide mb-0.5">{label}</p>
                <p className="text-xs font-medium text-stone-800 leading-tight">{value}</p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-stone-900 text-white rounded-xl py-3 text-sm font-medium hover:bg-stone-700 transition-colors">
              <Navigation size={14} />
              Take me there
            </button>
            <button className="flex items-center justify-center gap-2 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
              <Share2 size={14} />
            </button>
            <button className="flex items-center justify-center gap-2 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
              <Bookmark size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress pips */}
      <div className="flex justify-center gap-1.5">
        {ranked.map((s, i) => (
          <button
            key={s.id}
            onClick={() => onStorySelect(s)}
            className={`rounded-full transition-all ${
              i === currentIndex
                ? 'w-5 h-1.5 bg-stone-800'
                : 'w-1.5 h-1.5 bg-stone-300 hover:bg-stone-400'
            }`}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <div className="grid grid-cols-2 gap-2.5">
        {prevStory ? (
          <button
            onClick={() => onStorySelect(prevStory)}
            className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-2xl p-3.5 hover:border-stone-300 hover:shadow-sm transition-all text-left"
          >
            <ChevronLeft size={14} className="text-stone-400 shrink-0" />
            <CategoryIcon category={prevStory.category} size={14} />
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-wide text-stone-400 mb-0.5">Previous</p>
              <p className="text-xs font-medium text-stone-800 leading-snug line-clamp-2">{prevStory.title}</p>
            </div>
          </button>
        ) : <div />}

        {nextStory ? (
          <button
            onClick={() => onStorySelect(nextStory)}
            className="flex items-center gap-2.5 bg-white border border-stone-200 rounded-2xl p-3.5 hover:border-stone-300 hover:shadow-sm transition-all text-left"
          >
            <div className="flex-1 min-w-0">
              <p className="text-[9px] uppercase tracking-wide text-stone-400 mb-0.5 text-right">Next</p>
              <p className="text-xs font-medium text-stone-800 leading-snug line-clamp-2 text-right">{nextStory.title}</p>
            </div>
            <CategoryIcon category={nextStory.category} size={14} />
            <ChevronRight size={14} className="text-stone-400 shrink-0" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
