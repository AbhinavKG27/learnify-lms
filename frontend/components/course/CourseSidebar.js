import { useState } from 'react';

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

function VideoItem({ video, isActive, onSelect, videoIndex }) {
  const isCompleted = video.progress?.completed;
  const isLocked = !video.unlocked;
  const isInProgress = !isCompleted && !isLocked && video.progress?.last_watched_seconds > 0;

  return (
    <button
      onClick={() => !isLocked && onSelect(video.id)}
      disabled={isLocked}
      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group
        ${isActive ? 'bg-brand-600/20 border border-brand-500/40' : 'hover:bg-white/5 border border-transparent'}
        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Status icon */}
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs mt-0.5
        ${isCompleted ? 'bg-emerald-500 text-white' : ''}
        ${isActive && !isCompleted ? 'bg-brand-500 text-white' : ''}
        ${isInProgress && !isActive ? 'bg-brand-900 border-2 border-brand-500 text-brand-400' : ''}
        ${isLocked ? 'bg-slate-800 text-slate-600 border border-slate-700' : ''}
        ${!isCompleted && !isActive && !isInProgress && !isLocked ? 'bg-slate-800 border border-slate-700 text-slate-400' : ''}
      `}>
        {isCompleted ? <CheckIcon /> : isLocked ? <LockIcon /> : isActive ? <PlayIcon /> : <span>{videoIndex}</span>}
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-medium leading-snug truncate
          ${isActive ? 'text-brand-300' : isCompleted ? 'text-slate-400' : isLocked ? 'text-slate-600' : 'text-slate-300'}
        `}>
          {video.title}
        </p>
        {video.duration_seconds > 0 && (
          <span className="text-[10px] text-slate-600 mt-0.5 block">
            {Math.floor(video.duration_seconds / 60)}:{String(video.duration_seconds % 60).padStart(2, '0')}
          </span>
        )}
        {/* Mini progress bar */}
        {isInProgress && video.duration_seconds > 0 && (
          <div className="mt-1.5 h-0.5 bg-slate-800 rounded-full overflow-hidden w-full">
            <div
              className="h-full bg-brand-500 rounded-full"
              style={{ width: `${Math.min((video.progress.last_watched_seconds / video.duration_seconds) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>
    </button>
  );
}

function SectionAccordion({ section, sectionIndex, activeVideoId, onVideoSelect, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);

  const completedInSection = section.videos?.filter(v => v.progress?.completed).length || 0;
  const totalInSection = section.videos?.length || 0;

  return (
    <div className="border border-slate-800/60 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3.5 hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-surface-800 flex items-center justify-center text-xs font-mono font-bold text-slate-400 flex-shrink-0">
            {sectionIndex}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-200 leading-tight truncate">{section.title}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {completedInSection}/{totalInSection} completed
            </p>
          </div>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="px-2 pb-2 space-y-0.5 border-t border-slate-800/60">
          {section.videos?.map((video, vIdx) => (
            <VideoItem
              key={video.id}
              video={video}
              isActive={video.id === activeVideoId}
              onSelect={onVideoSelect}
              videoIndex={vIdx + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CourseSidebar({ subject, sections, activeVideoId, onVideoSelect, progressPercent }) {
  const activeSectionIndex = sections?.findIndex(sec =>
    sec.videos?.some(v => v.id === activeVideoId)
  );

  return (
    <aside className="w-full h-full flex flex-col">
      {/* Course header */}
      <div className="p-4 border-b border-slate-800/60">
        <h2 className="font-display font-bold text-sm text-white leading-snug mb-3 line-clamp-2">
          {subject?.name}
        </h2>
        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
          <span>Course Progress</span>
          <span className="font-semibold text-brand-400">{progressPercent || 0}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent || 0}%` }} />
        </div>
      </div>

      {/* Sections list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {sections?.map((section, sIdx) => (
          <SectionAccordion
            key={section.id}
            section={section}
            sectionIndex={sIdx + 1}
            activeVideoId={activeVideoId}
            onVideoSelect={onVideoSelect}
            defaultOpen={sIdx === activeSectionIndex || sIdx === 0}
          />
        ))}
      </div>
    </aside>
  );
}
