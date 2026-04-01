'use client';

import { useFocusStore } from '@/lib/store';
import { calculateAnalytics, formatDuration, formatDurationLong, getFavoriteScenery } from '@/lib/analytics';
import { SCENERIES } from '@/types';
import { Clock, Flame, Target, Calendar, TreePine, TrendingUp, Award } from 'lucide-react';

interface AnalyticsDashboardProps {
  compact?: boolean;
}

export function AnalyticsDashboard({ compact = false }: AnalyticsDashboardProps) {
  const { sessions } = useFocusStore();
  const analytics = calculateAnalytics(sessions);
  const favoriteScenery = getFavoriteScenery(analytics.sessionsByScenery);
  
  const favoriteSceneryData = favoriteScenery 
    ? SCENERIES.find(s => s.id === favoriteScenery.id)
    : null;

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCardCompact
            icon={<Clock className="w-5 h-5" />}
            label="Hours Focused"
            value={formatDuration(analytics.totalFocusTime)}
          />
          <StatCardCompact
            icon={<Flame className="w-5 h-5" />}
            label="Day Streak"
            value={analytics.currentStreak.toString()}
            highlight={analytics.currentStreak > 0}
          />
          
          <StatCardCompact
            icon={<Target className="w-5 h-5" />}
            label="Sessions"
            value={analytics.totalSessions.toString()}
          />
          <StatCardCompact
            icon={<Award className="w-5 h-5" />}
            label="Best Streak"
            value={analytics.bestStreak.toString()}
          />
        </div>

        {favoriteSceneryData && (
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <TreePine className="w-4 h-4" />
              <span>Favorite environment: {favoriteSceneryData.name}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label="Total Focus Time"
          value={formatDurationLong(analytics.totalFocusTime)}
          subtext={`${analytics.totalSessions} sessions`}
          color="emerald"
        />
        
        <StatCard
          icon={<Flame className="w-6 h-6" />}
          label="Current Streak"
          value={`${analytics.currentStreak} days`}
          subtext={analytics.currentStreak > 0 ? 'Keep it up!' : 'Start today!'}
          color="orange"
          highlight={analytics.currentStreak > 0}
        />
        
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Best Streak"
          value={`${analytics.bestStreak} days`}
          subtext="Personal best"
          color="purple"
        />
        
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Avg. Integrity"
          value={`${Math.round(analytics.averageIntegrity)}%`}
          subtext={analytics.averageIntegrity >= 80 ? 'Excellent!' : 'Room to improve'}
          color={analytics.averageIntegrity >= 80 ? 'emerald' : analytics.averageIntegrity >= 50 ? 'amber' : 'red'}
        />
      </div>

      {/* Weekly Chart */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Last 7 Days
        </h3>
        
        <div className="h-40 flex items-end gap-2">
          {analytics.weeklyStats.map((day, i) => {
            const maxTime = Math.max(...analytics.weeklyStats.map(d => d.focusTime), 1);
            const height = day.focusTime > 0 ? (day.focusTime / maxTime) * 100 : 4;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center">
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                      day.focusTime > 0
                        ? 'bg-emerald-500/60 hover:bg-emerald-500/80'
                        : 'bg-white/5'
                    }`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                  
                  {day.focusTime > 0 && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/70 whitespace-nowrap">
                      {formatDuration(day.focusTime)}
                    </div>
                  )}
                </div>
                <span className="text-xs text-white/50">{day.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Favorite Scenery */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            Favorite Environment
          </h3>
          
          {favoriteSceneryData ? (
            <div className="flex items-center gap-4">
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center
                bg-gradient-to-br ${favoriteSceneryData.gradient}
              `}>
                <span className="text-3xl">{favoriteSceneryData.emoji}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">{favoriteSceneryData.name}</p>
                <p className="text-white/50">
                  {favoriteScenery?.count} sessions · {' '}
                  {Math.round(((analytics.sessionsByScenery[favoriteScenery!.id] || 0) / analytics.totalSessions) * 100)}%
                  of total
                </p>
              </div>
            </div>
          ) : (
            <p className="text-white/50">No data yet</p>
          )}
        </div>

        {/* Session Insights */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Session Insights
          </h3>
          
          <div className="space-y-3">
            <InsightRow
              label="Average Session"
              value={formatDurationLong(analytics.averageSessionTime)}
            />
            <InsightRow
              label="Total Interruptions"
              value={analytics.totalInterruptions.toString()}
            />
            <InsightRow
              label="Interruptions / Session"
              value={(analytics.totalInterruptions / analytics.totalSessions).toFixed(1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components

function StatCard({ 
  icon, 
  label, 
  value, 
  subtext, 
  color = 'emerald',
  highlight = false 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color?: 'emerald' | 'orange' | 'purple' | 'amber' | 'red';
  highlight?: boolean;
}) {
  const colorClasses = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className={`
      p-5 rounded-2xl border backdrop-blur-sm
      ${highlight ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'}
    `}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      
      <p className="text-white/50 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      
      <p className="text-white/40 text-xs">{subtext}</p>
    </div>
  );
}

function StatCardCompact({ 
  icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={`
      p-4 rounded-xl border backdrop-blur-sm text-center
      ${highlight ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/10'}
    `}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${
        highlight ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/60'
      }`}>
        {icon}
      </div>
      
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-white/50 text-xs">{label}</p>
    </div>
  );
}

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-white/60">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
