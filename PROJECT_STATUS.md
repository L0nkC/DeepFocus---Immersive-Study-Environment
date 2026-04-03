# DeepFocus Project Status

## Project Overview

**DeepFocus** is an immersive study environment web application that helps users focus by:
- Tracking focus sessions with a timer
- Providing nature-themed ambient backgrounds
- Playing scenario-appropriate ambient sounds
- Detecting interruptions (tab switching, idle time)
- Tracking analytics and session history

## Architecture

The project has **two versions**:

### 1. Main App (Next.js/React) - `/src/`
- **Framework**: Next.js 14 with TypeScript
- **Location**: `src/app/page.tsx` and components in `src/app/components/`
- **State Management**: Zustand store (`src/lib/store.ts`)
- **Build Output**: Static files in `dist/`
- **Status**: Has video support infrastructure (Background.tsx, VideoToggle.tsx) but video URLs not fully configured

### 2. Standalone HTML Version - `index.html`
- **Type**: Single-file vanilla JavaScript app
- **Purpose**: Quick demo/testing version
- **Status**: **Currently the working version** with functional audio
- **Features**:
  - 8 nature sceneries with images from Unsplash
  - Ambient audio from Ambient-mixer.com
  - Session timer (25/50/90 minutes)
  - Mute/unmute button
  - Pause/resume functionality

## Current State (as of 2026-04-03)

### ✅ Working Features

1. **Ambient Audio** - FIXED
   - Source: Ambient-mixer.com (copyright-free)
   - 8 different sounds matching each scenery:
     - Forest Stream: Wind in leaves
     - Mountain Lake: Lake waves
     - Ocean Waves: Shore waves
     - Rainy Window: Light rain
     - Sunrise Meadow: Wind in trees
     - Night Campfire: Crickets ambience
     - Mountain Cabin: Medium wind
     - Tropical Garden: Leaves rustling
   - Audio loops automatically (`audioPlayer.loop = true`)
   - Mute/unmute toggle button

2. **Session Timer**
   - 25/50/90 minute presets
   - Pause/resume functionality
   - Progress tracking
   - Integrity score calculation

3. **Visual Design**
   - Glass-morphism UI elements
   - Dark theme optimized for focus
   - 8 scenery cards with Unsplash images
   - Responsive layout

4. **Analytics**
   - Session history
   - Current/best streak tracking
   - Focus integrity scoring
   - Today's goal progress

### ⚠️ Partially Working / Limitations

1. **Video Backgrounds** - NOT IMPLEMENTED
   - Next.js version has infrastructure (Background.tsx, VideoToggle.tsx)
   - Video URLs from Pexels were tested but caused issues
   - Currently reverted to static image backgrounds only
   - Video toggle button exists in code but disabled

2. **Audio Duration**
   - Audio clips are 10-60 seconds each
   - They loop automatically to cover 90-minute sessions
   - Seamless looping works via `audioPlayer.loop = true`

### ❌ Known Issues

1. **Browser Autoplay Policy**
   - Audio requires user interaction to start
   - Users must click "START SESSION" or the mute button to hear audio
   - This is a browser security limitation (cannot be bypassed)

2. **Video Integration** (Attempted but reverted)
   - Tried adding Pexels video backgrounds
   - URLs tested: 3571264, 855029, 1536322, 854282, etc.
   - Issues encountered:
     - Some URLs returned 403 Forbidden
     - Smooth loop transitions caused UI breakage
     - Scenery cards disappeared in one implementation
   - **Status**: Rolled back to working image-only version

## What Was Fixed

### Audio Fix (2026-04-03)
**Problem**: Audio wasn't playing at all

**Root Cause**: 
- Original Pixabay CDN URLs were expired (returning 403 Forbidden)
- URLs like `https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3` no longer worked

**Solution**:
- Replaced all audio URLs with working ones from Ambient-mixer.com
- All 8 sceneries now have appropriate ambient sounds
- Audio loops automatically for long sessions

**Commit**: `c43791b fix: update audio URLs to working ambient-mixer sources`

### Previous Fixes (in git history)
- `701a08c`: Initial audio implementation (Pixabay - later broken)
- `2c91ebb`: Settings page with daily goal
- `5c54145`: Integrity score calculation fix
- `e6de9ec`: Stats button empty state fix
- `5020102`: Session analysis values fix

## File Structure

```
/Users/kalihome/DeepFocus/
├── index.html              # Working standalone HTML app
├── src/                    # Next.js source (has video infrastructure)
│   ├── app/
│   │   ├── page.tsx        # Main Next.js app
│   │   ├── components/
│   │   │   ├── Background.tsx      # Video background component
│   │   │   ├── VideoToggle.tsx     # Toggle button component
│   │   │   └── ...other components
│   ├── lib/
│   │   ├── store.ts        # Zustand state management
│   │   └── useFocusDetector.ts
│   └── types/
│       └── index.ts        # TypeScript types + SCENERIES data
├── dist/                   # Built static files
└── public/
```

## How to Use

1. Open `index.html` in a browser
2. Select a scenery (Forest, Ocean, etc.)
3. Choose duration (25/50/90 min)
4. Click "START SESSION"
5. **Important**: Click the 🔊 volume icon if audio doesn't start automatically
6. Focus! The timer tracks your session integrity

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Audio autoplay requires user interaction due to browser policies.

## Future Improvements (Not Implemented)

1. **Video Backgrounds**
   - Add copyright-free videos from Pexels/Pixabay
   - Implement smooth loop transitions
   - Video/gradient toggle button

2. **Longer Audio**
   - Source 90-minute ambient audio tracks
   - Or implement crossfade between tracks

3. **PWA Features**
   - Offline capability
   - Push notifications
   - Install as app

4. **Enhanced Audio**
   - Volume slider
   - Audio fade on pause
   - Multiple layered sounds

## Credits

- **Images**: Unsplash
- **Audio**: Ambient-mixer.com (copyright-free)
- **Icons**: Material Symbols (Google Fonts)
- **Fonts**: Inter, Manrope (Google Fonts)
- **Styling**: Tailwind CSS

---

*Last updated: 2026-04-03*
*Current working version: Standalone HTML (`index.html`)*
