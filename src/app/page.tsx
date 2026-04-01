'use client';

import { useFocusStore } from '@/lib/store';
import { useFocusDetector } from '@/lib/useFocusDetector';
import { ScenerySelector } from './components/ScenerySelector';
import { DurationSelector } from './components/DurationSelector';
import { Timer } from './components/Timer';
import { FocusOverlay } from './components/FocusOverlay';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SessionHistory } from './components/SessionHistory';
import { SCENERIES } from '@/types';
import { Play, BarChart3, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { 
    currentSession, 
    selectedScenery, 
    plannedDuration,
    startSession,
    sessions,
  } = useFocusStore();

  const { focusState } = useFocusDetector();
  const [activeTab, setActiveTab] = useState<'setup' | 'history' | 'analytics'>('setup');

  const activeScenery = SCENERIES.find(s => s.id === selectedScenery) || SCENERIES[0];

  // Show active session view
  if (currentSession) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-br ${activeScenery.gradient}
            transition-all duration-1000
          `}
        />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 40%)`,
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            }
          }}
        >
          {/* Header */}
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              bg-gradient-to-br ${activeScenery.gradient}
            `}>
              <span className="text-lg">{activeScenery.emoji}</span>
            </div>
            <div>
              <p className="text-white/90 font-medium">{activeScenery.name}</p>
              <p className="text-white/50 text-sm">DeepFocus Session</p>
            </div>
          </div>

          {/* Timer */}
          <Timer />

          {/* Instructions */}
          <p className="absolute bottom-8 text-white/40 text-sm text-center max-w-md">
            {focusState === 'focused' 
              ? 'Stay on this tab to keep the timer running. Switching tabs will pause the session.'
              : 'Timer paused. Return to this tab to resume.'}
          </p>
        </div>

        {/* Focus Overlay */}
        <FocusOverlay />
      </div>
    );
  }

  // Show setup view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            🌲 DeepFocus
          </h1>
          <p className="text-lg text-white/60">
            Study in nature. Focus without distraction.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all ${
              activeTab === 'setup'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Play className="w-4 h-4" />
            New Session
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all ${
              activeTab === 'history'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <Clock className="w-4 h-4" />
            History
            {sessions.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                {sessions.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all ${
              activeTab === 'analytics'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          {activeTab === 'setup' && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Setup Panel */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Choose Your Environment
                  </h2>
                  <ScenerySelector 
                    selected={selectedScenery} 
                    onSelect={(id) => useFocusStore.getState().setScenery(id as typeof selectedScenery)} 
                  />
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <DurationSelector
                    selected={plannedDuration}
                    onSelect={(d) => useFocusStore.getState().setPlannedDuration(d)}
                  />
                </div>

                <button
                  onClick={() => startSession(selectedScenery, plannedDuration || undefined)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500
                             hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg
                             flex items-center justify-center gap-3 transition-all duration-200
                             hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20"
                >
                  <Play className="w-6 h-6" />
                  Begin Focus Session
                </button>
              </div>

              {/* Quick Preview */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col">
                <h2 className="text-lg font-semibold text-white mb-4">Your Focus Summary</h2>
                
                {sessions.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <BarChart3 className="w-10 h-10 text-white/30" />
                    </div>
                    <p className="text-white/50 mb-2">No sessions yet</p>
                    <p className="text-white/30 text-sm">Start your first focus session to see your analytics!</p>
                  </div>
                ) : (
                  <AnalyticsDashboard compact />
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto">
              <SessionHistory />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-5xl mx-auto">
              <AnalyticsDashboard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
