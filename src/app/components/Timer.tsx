'use client';

import { useFocusStore } from '@/lib/store';
import { formatTime, getFocusStateLabel, getFocusStateColor } from '@/lib/useFocusDetector';
import { Play, Pause, Square } from 'lucide-react';

interface TimerProps {
  compact?: boolean;
}

export function Timer({ compact = false }: TimerProps) {
  const { 
    elapsedTime, 
    focusState, 
    currentSession,
    pauseSession,
    resumeSession,
    stopSession,
  } = useFocusStore();

  if (compact) {
    return (
      <div className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        bg-black/30 backdrop-blur-md border border-white/10
        ${getFocusStateColor(focusState)}
      `}>
        <span className="text-lg font-mono font-bold">
          {formatTime(elapsedTime)}
        </span>
        <span className="text-xs opacity-70">{getFocusStateLabel(focusState)}</span>
      </div>
    );
  }

  const integrity = currentSession && currentSession.totalSessionTime > 0
    ? Math.round((elapsedTime / (Date.now() - currentSession.startTime)) * 100)
    : 100;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main Timer Display */}
      <div className="relative">
        {/* Progress Ring */}
        <svg className="w-64 h-64 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={focusState === 'focused' ? '#10B981' : '#F59E0B'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(integrity / 100) * 283} 283`}
            className="transition-all duration-500"
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`
            text-5xl font-mono font-bold tracking-tight
            ${getFocusStateColor(focusState)}
          `}>
            {formatTime(elapsedTime)}
          </span>
          
          <span className="text-sm text-white/60 mt-2">
            {getFocusStateLabel(focusState)}
          </span>
          
          {currentSession && (
            <span className="text-xs text-white/40 mt-1">
              {integrity}% focus integrity
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {focusState === 'focused' ? (
          <button
            onClick={() => pauseSession('manual_pause')}
            className="w-16 h-16 rounded-full bg-amber-500/20 hover:bg-amber-500/30 
                       border border-amber-500/50 flex items-center justify-center
                       transition-all duration-200 hover:scale-105"
          >
            <Pause className="w-8 h-8 text-amber-400" />
          </button>
        ) : focusState === 'paused' || focusState === 'afk' || focusState === 'switched' ? (
          <button
            onClick={resumeSession}
            className="w-16 h-16 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 
                       border border-emerald-500/50 flex items-center justify-center
                       transition-all duration-200 hover:scale-105"
          >
            <Play className="w-8 h-8 text-emerald-400 ml-1" />
          </button>
        ) : null}

        <button
          onClick={stopSession}
          className="w-14 h-14 rounded-full bg-red-500/20 hover:bg-red-500/30 
                     border border-red-500/50 flex items-center justify-center
                     transition-all duration-200 hover:scale-105"
        >
          <Square className="w-6 h-6 text-red-400" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
