# 🌙 ASMR MP3 Audio Integration Guide

## Overview

The app now supports **dual-mode audio playback**:
- 🎧 **Local MP3 Samples** (~2 min): Quick preview, no internet required
- ▶️ **YouTube Full Versions**: Extended content, premium quality

## File Mappings

### MP3 Files → Categories

| Category ID | Chinese Name | English Name | File | Duration |
|---|---|---|---|---|
| `brush` | 🪮 刷麦·刮擦 | Brush & Scratching | `刷麦·刮擦.mp3` | 2 min |
| `tapping` | 🫰 敲击·Tapping | Tapping | `敲击·Tapping.mp3` | 2 min |
| `ear` | 👂 耳部清洁·按摩 | Ear Cleaning | `耳部清洁·按摩.mp3` | 2 min |
| `personal-care` | 🌿 个人护理·角色扮演 | Personal Care | `个人护理·角色扮演.mp3` | 2 min |
| `hairbrush` | ✨ 梳头·头皮按摩 | Hair Brushing | `梳头·头皮按摩.mp3` | 2 min |
| `eating` | 🍗 吃播·咀嚼音 | Eating Sounds | `吃播·咀嚼音.mp3` | 2 min |
| `cooking` | 🍳 烹饪·厨房声音 | Cooking | `烹饪·厨房声音.mp3` | 2 min |
| `keyboard` | ⌨️ 键��·办公声音 | Keyboard | `键盘·办公声音.mp3` | 2 min |
| `journal` | 📖 手帐·胶带·文具 | Journaling | `手帐·胶带·文具.mp3` | 2.5 min |
| `slime` | 🫧 史莱姆·肥皂切割 | Slime | `史莱姆·肥皂切割.mp3` | 2 min |

## Updated Files

### 1. **Data Structure** (`client/src/data/audioCategories.ts`)
```typescript
export interface AudioItem {
  id: string;
  title: string;
  type: 'mp3' | 'youtube';
  source: string;
}

export interface AudioCategory {
  id: string;
  emoji: string;
  name: string;
  samples: AudioItem[]; // Local MP3 files
  videos: AudioItem[];  // YouTube videos
}
```

### 2. **ASMRPage Component** (`client/src/pages/ASMRPage.tsx`)
**New Features:**
- Toggle between "本地试听" (Local Sample) and "YouTube 完整版" (Full Version)
- Native HTML5 audio player for MP3 files
- YouTube iframe for videos
- Unified favorites/timer system
- Dual playback modes with visual indicators

**Key Components:**
- Mode switcher buttons (Local MP3 vs YouTube)
- Audio type indicators (📥 for MP3, ▶ for YouTube)
- Conditional rendering of audio players
- Audio metadata handling for both formats

## Deployment Checklist

### Pre-Deployment

1. **Copy MP3 files to public directory:**
   ```bash
   cp *.mp3 sleep-off-duty-webapp\ 2/client/public/audio/
   ```

2. **Verify build includes audio files:**
   ```bash
   pnpm build
   ls dist/audio/
   ```

3. **Test both playback modes locally:**
   ```bash
   pnpm dev
   # Test: Switch modes, play samples, verify YouTube embeds
   ```

### Build & Deploy

```bash
cd sleep-off-duty-webapp\ 2

# Install dependencies
pnpm install

# Build production bundle
pnpm build

# Start production server (if using Node backend)
pnpm start

# Or deploy to static hosting
# Upload dist/ to your hosting provider
```

### Hosting Considerations

**For Static Hosting (Vercel, Netlify, GitHub Pages):**
- ✅ All MP3 files included in `dist/audio/`
- ✅ No server-side processing required
- ⚠️ Ensure CORS headers allow audio playback
- ⚠️ YouTube embeds work globally

**For Node.js Server:**
- ✅ Express serves static files from `dist/`
- ✅ Audio files accessible at `/audio/*.mp3`
- ⚠️ Use Vite's `publicDir` configuration

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| HTML5 Audio | ✅ | ✅ | ✅ | ✅ |
| YouTube Embed | ✅ | ✅ | ✅ | ✅ |
| CORS Audio | ✅ | ✅ | ✅ | ✅ |
| Autoplay | ⚠️ | ⚠️ | ⚠️ | ⚠️ |

*Note: Autoplay requires user gesture or muted attribute*

## Troubleshooting

### Audio Files Not Loading
```
Problem: "Failed to load audio file"
Solution: 
1. Verify files exist in public/audio/
2. Check file names match exactly (case-sensitive)
3. Ensure MIME type is audio/mpeg
```

### YouTube Embeds Not Working
```
Problem: Blank iframe
Solution:
1. Check YouTube video IDs are valid
2. Verify YouTube videos are not region-restricted
3. Check browser's third-party cookie policy
```

### Slow Page Load
```
Problem: Page takes >3s to load
Solution:
1. MP3 files are ~2.4MB each - consider CDN
2. Lazy-load YouTube embeds until clicked
3. Use audio compression (128kbps bitrate)
```

## Future Enhancements

- [ ] Cloud storage for MP3 files (AWS S3, Cloudflare R2)
- [ ] Audio streaming optimization (HLS/DASH)
- [ ] Offline mode with service workers
- [ ] Custom audio mixing/blending
- [ ] User-uploaded audio support
- [ ] Playlist creation and saving

## Support

For issues or questions:
- Check the [main README](../README.md)
- Review ASMRPage component code comments
- Test in browser DevTools console

---

**Last Updated:** 2026-06-02
**Status:** ✅ Ready for Deployment
