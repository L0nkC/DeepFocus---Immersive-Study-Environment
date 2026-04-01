export type FocusState = 
  | 'focused' 
  | 'paused' 
  | 'afk' 
  | 'switched' 
  | 'minimized' 
  | 'idle'
  | 'stopped';

export type SceneryType = 
  | 'forest' 
  | 'mountain' 
  | 'ocean' 
  | 'rain' 
  | 'sunrise' 
  | 'night' 
  | 'cabin' 
  | 'garden';

export interface FocusSegment {
  start: number;
  end: number;
  duration: number;
}

export interface Interruption {
  timestamp: number;
  type: 'tab_switch' | 'idle' | 'minimized' | 'manual_pause';
  duration: number;
}

export interface Session {
  id: string;
  startTime: number;
  endTime?: number;
  plannedDuration?: number;
  scenery: SceneryType;
  segments: FocusSegment[];
  totalFocusTime: number;
  totalSessionTime: number;
  integrity: number;
  interruptions: Interruption[];
  isActive: boolean;
}

export interface Scenery {
  id: SceneryType;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  videoUrl?: string;
  audioUrl?: string;
}

export const SCENERIES: Scenery[] = [
  {
    id: 'forest',
    name: 'Forest Stream',
    emoji: '🌲',
    color: '#2D5016',
    gradient: 'from-green-900 to-emerald-800',
  },
  {
    id: 'mountain',
    name: 'Mountain Lake',
    emoji: '🏔️',
    color: '#4A5568',
    gradient: 'from-slate-800 to-blue-900',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    emoji: '🌊',
    color: '#1A365D',
    gradient: 'from-blue-900 to-cyan-800',
  },
  {
    id: 'rain',
    name: 'Rainy Window',
    emoji: '🌧️',
    color: '#2D3748',
    gradient: 'from-gray-800 to-slate-900',
  },
  {
    id: 'sunrise',
    name: 'Sunrise Meadow',
    emoji: '🌅',
    color: '#744210',
    gradient: 'from-orange-900 to-yellow-800',
  },
  {
    id: 'night',
    name: 'Night Campfire',
    emoji: '🌙',
    color: '#1A202C',
    gradient: 'from-gray-900 to-purple-900',
  },
  {
    id: 'cabin',
    name: 'Mountain Cabin',
    emoji: '🏕️',
    color: '#5D4037',
    gradient: 'from-amber-900 to-orange-950',
  },
  {
    id: 'garden',
    name: 'Tropical Garden',
    emoji: '🌺',
    color: '#14532D',
    gradient: 'from-green-950 to-teal-900',
  },
];
