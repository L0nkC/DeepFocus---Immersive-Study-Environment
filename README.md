# DeepFocus - Immersive Study Environment

A Progressive Web App (PWA) that tracks true focus by detecting tab switching, window focus loss, and idle time. Transform your study sessions into immersive experiences with nature scenery and ambient sounds.

![DeepFocus Screenshot](./screenshot.png)

## Features

### Core Functionality
- **Always-Visible Timer** - Fullscreen focus mode with large, elegant timer display
- **8 Nature Sceneries** - Forest Stream, Mountain Lake, Ocean Waves, Rainy Window, Sunrise Meadow, Night Campfire, Mountain Cabin, Tropical Garden
- **Focus Integrity Score** - Tracks your focus quality by detecting interruptions
- **Session Flow** - Setup -> Focus Mode -> Detection/Pause -> Complete/Stats

### Focus Detection
- **Tab Switching Detection** - Automatically detects when you leave the app
- **Window Focus Tracking** - Monitors when you switch to other applications
- **Pause/Resume** - Intuitive controls for breaks
- **Interruption Logging** - Tracks focus integrity score

### Design Philosophy
- **"Digital Sanctuary"** - Atmospheric depth with full-screen natural imagery
- **Glassmorphism UI** - Sophisticated frosted glass effects
- **Earth Tone Palette** - Deep greens and slate tones to reduce eye strain
- **Asymmetrical Layouts** - Editorial-style design for a premium feel
- **No-Line Design** - No 1px borders; tonal transitions for sectioning

## Technical Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling with custom color palette
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **Page Visibility API** - For focus detection
- **Material Symbols** - Google's icon font
- **Google Fonts** - Manrope & Inter typography

## Getting Started

### Local Development
Simply open `index.html` in your browser:

```bash
# Clone the repository
git clone https://github.com/L0nkC/DeepFocus---Immersive-Study-Environment.git

# Navigate to the directory
cd DeepFocus---Immersive-Study-Environment

# Open in browser (macOS)
open index.html

# Or on Linux
xdg-open index.html
```

### Deployment
This is a static site that can be deployed to any web host:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## Session Flow

1. **Setup Screen** - Choose your session duration (25, 50, or 90 minutes) and select a nature scenery
2. **Focus Mode** - Immersive fullscreen timer with your selected background
3. **Detection** - App tracks interruptions like tab switching or window focus loss
4. **Summary** - Post-session analysis with integrity score and statistics

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Pause/Resume timer |
| Escape | End session |

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Design System

### Colors
- **Background**: `#121416` - Deep, soft black
- **Primary**: `#aecebe` - Sage green
- **Secondary**: `#b1cad7` - Soft blue
- **Tertiary**: `#ffb59e` - Warm coral (alerts)
- **Surface Container**: `#1e2022` - Card backgrounds

### Typography
- **Headlines**: Manrope (geometric, high impact)
- **Body**: Inter (legible, clean)

## Future Roadmap

- [ ] Web Audio API integration for ambient nature sounds
- [ ] Binaural beats for enhanced focus
- [ ] PWA offline support
- [ ] Local storage for session history
- [ ] Advanced analytics dashboard
- [ ] Custom scenery uploads
- [ ] Focus streak tracking
- [ ] Social sharing features

## Credits

Designed in [Stitch](https://stitch.withgoogle.com/) by Google - AI-powered design tool for creating beautiful interfaces.

## License

MIT License - feel free to use and modify as needed.

---

Made with focus 🌿
