import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session, FocusState, SceneryType, FocusSegment, Interruption } from '@/types';

interface FocusStore {
  // Current session
  currentSession: Session | null;
  focusState: FocusState;
  elapsedTime: number;
  
  // Settings
  selectedScenery: SceneryType;
  plannedDuration: number | null; // minutes, null = free session
  
  // History
  sessions: Session[];
  
  // Actions
  startSession: (scenery: SceneryType, duration?: number) => void;
  pauseSession: (reason: Interruption['type']) => void;
  resumeSession: () => void;
  stopSession: () => void;
  
  // Timer
  tick: () => void;
  
  // Settings
  setScenery: (scenery: SceneryType) => void;
  setPlannedDuration: (duration: number | null) => void;
  
  // State management
  setFocusState: (state: FocusState) => void;
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      focusState: 'stopped',
      elapsedTime: 0,
      selectedScenery: 'forest',
      plannedDuration: 45,
      sessions: [],

      startSession: (scenery, duration) => {
        const now = Date.now();
        const newSession: Session = {
          id: `session-${now}`,
          startTime: now,
          plannedDuration: duration,
          scenery,
          segments: [],
          totalFocusTime: 0,
          totalSessionTime: 0,
          integrity: 0,
          interruptions: [],
          isActive: true,
        };

        set({
          currentSession: newSession,
          focusState: 'focused',
          elapsedTime: 0,
          selectedScenery: scenery,
          plannedDuration: duration,
        });
      },

      pauseSession: (reason) => {
        const { currentSession, elapsedTime } = get();
        if (!currentSession) return;

        const now = Date.now();
        const segment: FocusSegment = {
          start: currentSession.startTime + currentSession.totalSessionTime,
          end: now,
          duration: elapsedTime - currentSession.totalFocusTime,
        };

        const interruption: Interruption = {
          timestamp: now,
          type: reason,
          duration: 0,
        };

        set({
          currentSession: {
            ...currentSession,
            segments: [...currentSession.segments, segment],
            interruptions: [...currentSession.interruptions, interruption],
          },
          focusState: reason === 'manual_pause' ? 'paused' : reason === 'tab_switch' ? 'switched' : 'afk',
        });
      },

      resumeSession: () => {
        const { currentSession } = get();
        if (!currentSession) return;

        const now = Date.now();
        const lastInterruption = currentSession.interruptions[currentSession.interruptions.length - 1];
        
        if (lastInterruption) {
          lastInterruption.duration = now - lastInterruption.timestamp;
        }

        set({
          focusState: 'focused',
        });
      },

      stopSession: () => {
        const { currentSession, elapsedTime, sessions } = get();
        if (!currentSession) return;

        const now = Date.now();
        
        // Add final segment if focused
        let finalSegments = currentSession.segments;
        let finalFocusTime = currentSession.totalFocusTime;

        if (get().focusState === 'focused') {
          const segment: FocusSegment = {
            start: currentSession.startTime + currentSession.totalSessionTime,
            end: now,
            duration: elapsedTime - currentSession.totalFocusTime,
          };
          finalSegments = [...finalSegments, segment];
          finalFocusTime += segment.duration;
        }

        const totalSessionTime = now - currentSession.startTime;
        const integrity = totalSessionTime > 0 ? (finalFocusTime / totalSessionTime) * 100 : 0;

        const completedSession: Session = {
          ...currentSession,
          endTime: now,
          segments: finalSegments,
          totalFocusTime: finalFocusTime,
          totalSessionTime,
          integrity: Math.round(integrity * 10) / 10,
          isActive: false,
        };

        set({
          currentSession: null,
          focusState: 'stopped',
          elapsedTime: 0,
          sessions: [completedSession, ...sessions],
        });
      },

      tick: () => {
        const { currentSession, focusState, elapsedTime } = get();
        if (!currentSession || focusState !== 'focused') return;

        set({ elapsedTime: elapsedTime + 1000 });
      },

      setScenery: (scenery) => set({ selectedScenery: scenery }),
      setPlannedDuration: (duration) => set({ plannedDuration: duration }),
      setFocusState: (state) => set({ focusState: state }),
    }),
    {
      name: 'deepfocus-storage',
      partialize: (state) => ({ sessions: state.sessions, selectedScenery: state.selectedScenery }),
    }
  )
);
