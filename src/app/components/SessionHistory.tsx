'use client';

import { useFocusStore } from '@/lib/store';
import { formatDurationLong, calculateAnalytics } from '@/lib/analytics';
import { SCENERIES } from '@/types';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

export function SessionHistory() {
  const { sessions } = useFocusStore();
  const analytics = calculateAnalytics(sessions);

  if (sessions.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-10 h-10 text-white/20" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">No Sessions Yet</h3>
        
        <p className="text-white/50 max-w-md mx-auto">
          Start your first focus session to see your history here. Every focused minute counts!
        </p>
      </div>
    );
  }

  // Group sessions by date
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = new Date(session.startTime).toISOString().split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {} as Record<string, typeof sessions>);

  const sortedDates = Object.keys(groupedSessions).sort().reverse();

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Session History</h2>
            <p className="text-white/50">{sessions.length} sessions · {formatDurationLong(analytics.totalFocusTime)} total</p>
          </div>
          
          <div className="text-right">
            <p className="text-3xl font-bold text-emerald-400">
              {Math.round(analytics.averageIntegrity)}%
            </p>
            <p className="text-white/50 text-sm">Avg. Integrity</p>
          </div>
        </div>
      </div>

      {/* Session List by Date */}
      <div className="space-y-4">
        {sortedDates.map((date) => {
          const daySessions = groupedSessions[date];
          const dateObj = new Date(date);
          const isToday = date === new Date().toISOString().split('T')[0];
          const isYesterday = date === new Date(Date.now() - 86400000).toISOString().split('T')[0];
          
          const dayLabel = isToday 
            ? 'Today' 
            : isYesterday 
              ? 'Yesterday' 
              : dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
          
          const dayTotalFocus = daySessions.reduce((sum, s) => sum + s.totalFocusTime, 0);
          
          return (
            <div key={date} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {/* Date Header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-white/40" />
                  <span className="font-semibold text-white">{dayLabel}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white/50">{daySessions.length} sessions</span>
                  <span className="text-emerald-400 font-medium">{formatDurationLong(dayTotalFocus)}</span>
                </div>
              </div>

              {/* Sessions */}
              <div className="divide-y divide-white/5">
                {daySessions.map((session) => {
                  const scenery = SCENERIES.find(s => s.id === session.scenery);
                  const startTime = new Date(session.startTime);
                  const endTime = session.endTime ? new Date(session.endTime) : null;
                  
                  return (
                    <div 
                      key={session.id}
                      className="px-6 py-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center
                            bg-gradient-to-br ${scenery?.gradient || 'from-gray-500 to-gray-600'}
                          `}>
                            <span className="text-xl">{scenery?.emoji}</span>
                          </div>
                          
                          <div>
                            <p className="font-medium text-white">{scenery?.name || 'Unknown'}</p>
                            
                            <div className="flex items-center gap-3 text-sm text-white/50">
                              <span>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              
                              {endTime && (
                                <span>→ {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-white">
                            {formatDurationLong(session.totalFocusTime)}
                          </p>
                          
                          <div className="flex items-center justify-end gap-2 mt-1">
                            <IntegrityBadge integrity={session.integrity} />
                            
                            {session.interruptions.length > 0 && (
                              <div className="flex items-center gap-1 text-amber-400 text-xs">
                                <AlertCircle className="w-3 h-3" />
                                {session.interruptions.length}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IntegrityBadge({ integrity }: { integrity: number }) {
  let colorClass = 'bg-red-500/10 text-red-400';
  let label = 'Poor';
  
  if (integrity >= 90) {
    colorClass = 'bg-emerald-500/10 text-emerald-400';
    label = 'Excellent';
  } else if (integrity >= 70) {
    colorClass = 'bg-blue-500/10 text-blue-400';
    label = 'Good';
  } else if (integrity >= 50) {
    colorClass = 'bg-amber-500/10 text-amber-400';
    label = 'Fair';
  }
  
  return (
    <div className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {Math.round(integrity)}% {label}
    </div>
  );
}
