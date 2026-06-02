# Audio Assets Directory

This directory contains MP3 files for local ASMR sample listening.

## File Structure

```
audio/
├── 刷麦·刮擦.mp3                  # Brush & Scratching ASMR
├── 敲击·Tapping.mp3              # Tapping ASMR
├── 耳部清洁·按摩.mp3            # Ear Cleaning & Massage
├── 个人护理·角色扮演.mp3        # Personal Care Roleplay
├── 梳头·头皮按摩.mp3            # Hair Brushing & Scalp Massage
├── 吃播·咀嚼音.mp3              # Eating Sounds
├── 烹饪·厨房声音.mp3            # Cooking Sounds
├── 键盘·办公声音.mp3            # Keyboard & Office Sounds
├── 手帐·胶带·文具.mp3          # Journaling & Stationery Sounds
└── 史莱姆·肥皂切割.mp3          # Slime & Soap Cutting
```

## Usage

These MP3 files are served as static assets. Users can preview these samples before accessing full YouTube videos with premium quality and extended duration.

**Sample Duration**: ~2 minutes per file
**Total Size**: ~28MB

## Deployment

Ensure these files are included in your public folder when deploying:

```bash
pnpm build
```

The `dist` output will include all audio files for production deployment.
