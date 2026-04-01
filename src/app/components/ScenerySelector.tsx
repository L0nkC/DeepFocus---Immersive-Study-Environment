'use client';

import { SCENERIES } from '@/types';
import { Mountain, Waves, CloudRain, Sun, Moon, Tent, Leaf, Trees } from 'lucide-react';

const sceneryIcons: Record<string, React.ReactNode> = {
  forest: <Trees className="w-6 h-6" />,
  mountain: <Mountain className="w-6 h-6" />,
  ocean: <Waves className="w-6 h-6" />,
  rain: <CloudRain className="w-6 h-6" />,
  sunrise: <Sun className="w-6 h-6" />,
  night: <Moon className="w-6 h-6" />,
  cabin: <Tent className="w-6 h-6" />,
  garden: <Leaf className="w-6 h-6" />,
};

interface ScenerySelectorProps {
  selected: string;
  onSelect: (scenery: string) => void;
}

export function ScenerySelector({ selected, onSelect }: ScenerySelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {SCENERIES.map((scenery) => (
        <button
          key={scenery.id}
          onClick={() => onSelect(scenery.id)}
          className={`
            relative p-4 rounded-xl transition-all duration-300
            flex flex-col items-center gap-2
            ${
              selected === scenery.id
                ? 'bg-white/20 ring-2 ring-white/50 scale-105'
                : 'bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center
            bg-gradient-to-br ${scenery.gradient}
            shadow-lg
          `}>
            {sceneryIcons[scenery.id]}
          </div>
          <span className="text-xs font-medium text-white/90">
            {scenery.name}
          </span>
          
          {selected === scenery.id && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
