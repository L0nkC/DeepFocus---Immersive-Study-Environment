'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useFocusStore } from './store';
import { FocusState } from '@/types';

const AFK_THRESHOLD = 2 * 60 * 1000; // 2 minutes

export function useFocusDetector() {
  const { 
    currentSession, 
    focusState, 
    pauseSession, 
    resumeSession,
  } = useFocusStore();
  
  const lastActivityRef = useRef<number>(Date.now());
  const afkCheckRef = useRef<NodeJS.Timeout | null>(null);

  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    if (focusState === 'afk') {
      resumeSession();
    }
  }, [focusState, resumeSession]);

  // Track user activity
  useEffect(() => {
    if (!currentSession) return;

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [currentSession, handleActivity]);

  // AFK detection
  useEffect(() => {
    if (!currentSession || focusState !== 'focused') {
      if (afkCheckRef.current) {
        clearInterval(afkCheckRef.current);
      }
      return;
    }

    afkCheckRef.current = setInterval(() => {
      const idle = Date.now() - lastActivityRef.current;
      
      if (idle > AFK_THRESHOLD) {
        pauseSession('idle');
      }
    }, 5000);

    return () => {
      if (afkCheckRef.current) {
        clearInterval(afkCheckRef.current);
      }
    };
  }, [currentSession, focusState, pauseSession]);

  // Tab visibility detection
  useEffect(() => {
    if (!currentSession) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseSession('tab_switch');
      } else {
        resumeSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentSession, pauseSession, resumeSession]);

  // Window focus/blur detection
  useEffect(() => {
    if (!currentSession) return;

    const handleBlur = () => {
      if (focusState === 'focused') {
        pauseSession('tab_switch');
      }
    };

    const handleFocus = () => {
      lastActivityRef.current = Date.now();
      if (focusState === 'switched') {
        resumeSession();
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [currentSession, focusState, pauseSession, resumeSession]);

  // Before unload warning
  useEffect(() => {
    if (!currentSession) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentSession.totalFocusTime > 60000) { // > 1 min focus time
        e.preventDefault();
        e.returnValue = 'You have an active focus session. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentSession]);

  // Timer tick
  useEffect(() => {
    if (!currentSession || focusState !== 'focused') return;

    const interval = setInterval(() => {
      useFocusStore.getState().tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession, focusState]);

  return {
    isFocused: focusState === 'focused',
    focusState,
    currentSession,
  };
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function getFocusStateLabel(state: FocusState): string {
  const labels: Record<FocusState, string> = {
    focused: 'Focused',
    paused: 'Paused',
    afk: 'Away',
    switched: 'Tab Switched',
    minimized: 'Minimized',
    idle: 'Idle',
    stopped: 'Stopped',
  };
  return labels[state] || state;
}

export function getFocusStateColor(state: FocusState): string {
  const colors: Record<FocusState, string> = {
    focused: 'text-emerald-400',
    paused: 'text-amber-400',
    afk: 'text-orange-400',
    switched: 'text-red-400',
    minimized: 'text-gray-400',
    idle: 'text-gray-400',
    stopped: 'text-gray-400',
  };
  return colors[state] || 'text-gray-400';
}
