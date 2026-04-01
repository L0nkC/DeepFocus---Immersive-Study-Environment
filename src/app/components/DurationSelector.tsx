'use client';

import { Clock, Infinity } from 'lucide-react';

interface DurationSelectorProps {
  selected: number | null;
  onSelect: (duration: number | null) => void;
}

const DURATIONS = [
  { value: 15, label: '15 min' },
  { value: 25, label: '25 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60 min' },
  { value: 90, label: '90 min' },
  { value: 120, label: '2 hours' },
];

export function DurationSelector({ selected, onSelect }: DurationSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white/70 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Session Duration
      </label>

      <div className="flex flex-wrap gap-2">
        {DURATIONS.map((duration) => (
          <button
            key={duration.value}
            onClick={() => onSelect(duration.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                selected === duration.value
                  ? 'bg-white/20 text-white ring-1 ring-white/40'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {duration.label}
          </button>
        ))}

        <button
          onClick={() => onSelect(null)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            flex items-center gap-2
            ${
              selected === null
                ? 'bg-white/20 text-white ring-1 ring-white/40'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          <Infinity className="w-4 h-4" />
          Free
        </button>
      </div>

      {selected && (
        <p className="text-xs text-white/50">
          Timer will track your session but won&apos;t stop automatically
        </p>
      )}
      
      {selected === null && (
        <p className="text-xs text-white/50">
          Session continues until you manually stop it
        </p>
      )}
    </div>
  );
}
