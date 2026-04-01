'use client';

import { useFocusStore } from '@/lib/store';
import { formatTime } from '@/lib/useFocusDetector';
import { Play, Square, AlertCircle } from 'lucide-react';

export function FocusOverlay() {
  const { 
    focusState, 
    elapsedTime,
    currentSession,
    resumeSession,
    stopSession,
  } = useFocusStore();

  // Only show when focus is broken
  if (focusState === 'focused' || focusState === 'stopped' || !currentSession) {
    return null;
  }

  const stateMessages: Record<string, { title: string; desc: string; icon: React.ReactNode }> = {
    paused: {
      title: 'Session Paused',
      desc: 'You manually paused the session. Ready to continue?',
      icon: <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-amber-400" />
      </div>,
    },
    afk: {
      title: 'Away from Keyboard',
      desc: 'No activity detected for 2+ minutes. Timer paused.',
      icon: <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-orange-400" />
      </div>,
    },
    switched: {
      title: 'Focus Broken',
      desc: 'You switched tabs or windows. Return to continue focusing.',
      icon: <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>,
    },
    minimized: {
      title: 'Window Minimized',
      desc: 'The window was minimized. Timer paused.',
      icon: <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>,
    },
    idle: {
      title: 'System Idle',
      desc: 'Your device went idle. Timer paused.',
      icon: <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-gray-400" />
      </div>,
    },
  };

  const message = stateMessages[focusState] || stateMessages.idle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-white/10 border border-white/20 text-center">
        <div className="flex justify-center mb-6">{message.icon}</div>

        <h2 className="text-2xl font-bold text-white mb-2">{message.title}</h2>
        <p className="text-white/70 mb-6">{message.desc}</p>

        <div className="mb-8">
          <span className="text-4xl font-mono font-bold text-white">
            {formatTime(elapsedTime)}
          </span>
          <p className="text-sm text-white/50 mt-1">Current focus time</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resumeSession}
            className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 
                       text-white font-semibold flex items-center gap-2
                       transition-all duration-200 hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Resume Focus
          </button>

          <button
            onClick={stopSession}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 
                       text-white/80 font-medium flex items-center gap-2
                       transition-all duration-200"
          >
            <Square className="w-4 h-4" fill="currentColor" />
            End Session
          </button>
        </div>
      </div>
    </div>
  );
}
