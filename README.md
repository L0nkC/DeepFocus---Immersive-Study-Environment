# DeepFocus - Immersive Study Environment

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://L0nkC.github.io/DeepFocus---Immersive-Study-Environment/)

A Progressive Web App (PWA) that tracks true focus by detecting tab switching, window focus loss, and idle time. Transform your study sessions into immersive experiences with nature scenery and ambient sounds.

## Features

### Core Functionality
- **Always-Visible Timer** - Fullscreen focus mode with large, elegant timer display
- **8 Nature Sceneries** - Forest Stream, Mountain Lake, Ocean Waves, Rainy Window, Sunrise Meadow, Night Campfire, Mountain Cabin, Tropical Garden
- **Focus Integrity Score** - Tracks your focus quality by detecting interruptions
- **Smart Analytics** - Real session data with streaks, focus time, and weekly charts
- **Session History** - Grouped by date with detailed interruption tracking

### Focus Detection
- **Tab Switching Detection** - Automatically detects when you leave the app
- **Window Focus Tracking** - Monitors when you switch to other applications
- **Idle Detection** - Pauses after 2 minutes of inactivity
- **Pause/Resume** - Intuitive controls for breaks

### Analytics Dashboard
- **Total Focus Time** - Cumulative time spent in focus
- **Current Streak** - Consecutive days with focus sessions
- **Best Streak** - Personal best streak record
- **Focus Integrity** - Percentage of time actually focused vs session time
- **Weekly Chart** - Visual bar chart of last 7 days
- **Favorite Environment** - Most used scenery
- **Session Insights** - Average duration, interruptions per session

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management with persistence
- **Lucide Icons** - Modern icon library

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
```

### Deploy

The `dist` folder contains static files ready for deployment to GitHub Pages, Netlify, or Vercel.

## Session Flow

1. **Setup** - Choose scenery, set duration (or free session)
2. **Focus Mode** - Fullscreen timer with nature gradient background
3. **Detection** - Any tab switch pauses timer
4. **Resume** - Return to tab to continue
5. **Analytics** - View detailed stats after session

## How Focus Detection Works

The app uses multiple detection methods:

```javascript
// Tab visibility API
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseTimer();
});

// Window focus/blur
window.addEventListener('blur', () => pauseTimer());

// Idle detection (2 min no input)
setInterval(() => {
  if (Date.now() - lastActivity > 120000) pauseTimer();
}, 5000);
```

## Design System

### Colors
- **Background**: Slate 900/800 gradient
- **Primary**: Emerald 500
- **Accents**: Vary by scenery (green, blue, purple, amber)

### Typography
- **Headlines**: Geist Sans
- **Timer**: Geist Mono

## File Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AnalyticsDashboard.tsx  # Stats display
│   │   ├── DurationSelector.tsx    # Timer duration picker
│   │   ├── FocusOverlay.tsx        # Pause/resume modal
│   │   ├── ScenerySelector.tsx     # Environment picker
│   │   ├── SessionHistory.tsx      # Past sessions list
│   │   └── Timer.tsx               # Active timer display
│   ├── page.tsx                    # Main app
│   └── layout.tsx                  # Root layout
├── lib/
│   ├── analytics.ts                # Analytics calculations
│   ├── store.ts                    # Zustand state
│   └── useFocusDetector.ts         # Focus detection hook
└── types/
    └── index.ts                    # TypeScript types
```

## License

MIT License

---

Made with focus 🌿
