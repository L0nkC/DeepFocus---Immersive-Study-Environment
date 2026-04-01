'use client';

import { Session } from '@/types';

export interface AnalyticsData {
  totalFocusTime: number; // in milliseconds
  totalSessions: number;
  currentStreak: number;
  bestStreak: number;
  averageSessionTime: number;
  averageIntegrity: number;
  totalInterruptions: number;
  sessionsByScenery: Record<string, number>;
  focusTimeByDay: Record<string, number>;
  weeklyStats: {
    date: string;
    focusTime: number;
    sessions: number;
  }[];
}

export function calculateAnalytics(sessions: Session[]): AnalyticsData {
  if (sessions.length === 0) {
    return {
      totalFocusTime: 0,
      totalSessions: 0,
      currentStreak: 0,
      bestStreak: 0,
      averageSessionTime: 0,
      averageIntegrity: 0,
      totalInterruptions: 0,
      sessionsByScenery: {},
      focusTimeByDay: {},
      weeklyStats: [],
    };
  }

  // Total focus time
  const totalFocusTime = sessions.reduce((sum, s) => sum + s.totalFocusTime, 0);
  
  // Average session time
  const averageSessionTime = totalFocusTime / sessions.length;
  
  // Average integrity
  const averageIntegrity = sessions.reduce((sum, s) => sum + s.integrity, 0) / sessions.length;
  
  // Total interruptions
  const totalInterruptions = sessions.reduce((sum, s) => sum + s.interruptions.length, 0);
  
  // Sessions by scenery
  const sessionsByScenery: Record<string, number> = {};
  sessions.forEach(s => {
    sessionsByScenery[s.scenery] = (sessionsByScenery[s.scenery] || 0) + 1;
  });
  
  // Focus time by day (for streak calculation)
  const focusTimeByDay: Record<string, number> = {};
  sessions.forEach(s => {
    const date = new Date(s.startTime).toISOString().split('T')[0];
    focusTimeByDay[date] = (focusTimeByDay[date] || 0) + s.totalFocusTime;
  });
  
  // Calculate streaks
  const { currentStreak, bestStreak } = calculateStreaks(focusTimeByDay);
  
  // Weekly stats (last 7 days)
  const weeklyStats = getWeeklyStats(sessions);
  
  return {
    totalFocusTime,
    totalSessions: sessions.length,
    currentStreak,
    bestStreak,
    averageSessionTime,
    averageIntegrity,
    totalInterruptions,
    sessionsByScenery,
    focusTimeByDay,
    weeklyStats,
  };
}

function calculateStreaks(focusTimeByDay: Record<string, number>): { currentStreak: number; bestStreak: number } {
  const dates = Object.keys(focusTimeByDay).sort();
  
  if (dates.length === 0) {
    return { currentStreak: 0, bestStreak: 0 };
  }
  
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // Check if today or yesterday has activity for current streak
  const hasRecentActivity = dates.includes(today) || dates.includes(yesterday);
  
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    const nextDate = i < dates.length - 1 ? new Date(dates[i + 1]) : null;
    
    tempStreak++;
    
    if (nextDate) {
      const diffDays = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays > 1) {
        // Streak broken
        bestStreak = Math.max(bestStreak, tempStreak);
        
        // Check if this is the current streak
        const lastDateInStreak = dates[i];
        if (lastDateInStreak === today || lastDateInStreak === yesterday) {
          currentStreak = tempStreak;
        }
        
        tempStreak = 0;
      }
    }
  }
  
  // Handle the last streak
  bestStreak = Math.max(bestStreak, tempStreak);
  
  const lastDate = dates[dates.length - 1];
  if (hasRecentActivity && (lastDate === today || lastDate === yesterday)) {
    currentStreak = tempStreak;
  }
  
  return { currentStreak, bestStreak };
}

function getWeeklyStats(sessions: Session[]) {
  const stats = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    const daySessions = sessions.filter(s => {
      const sDate = new Date(s.startTime).toISOString().split('T')[0];
      return sDate === dateStr;
    });
    
    const focusTime = daySessions.reduce((sum, s) => sum + s.totalFocusTime, 0);
    
    stats.push({
      date: dayLabel,
      focusTime,
      sessions: daySessions.length,
    });
  }
  
  return stats;
}

export function formatDuration(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}.${Math.round((minutes / 60) * 10)}h`;
  }
  return `${minutes}m`;
}

export function formatDurationLong(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  }
  return `${minutes}m`;
}

export function getFavoriteScenery(sessionsByScenery: Record<string, number>): { id: string; count: number } | null {
  const entries = Object.entries(sessionsByScenery);
  if (entries.length === 0) return null;
  
  const [id, count] = entries.reduce((max, current) => 
    current[1] > max[1] ? current : max
  );
  
  return { id, count };
}
