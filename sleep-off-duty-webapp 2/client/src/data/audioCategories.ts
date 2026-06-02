/**
 * Audio Categories Data
 * Maps MP3 files to their respective categories for local listening
 * YouTube URLs available as fallback for extended content
 */

export interface AudioItem {
  id: string;
  title: string;
  type: 'mp3' | 'youtube';
  source: string; // URL or YouTube ID
  duration?: number; // in seconds
}

export interface AudioCategory {
  id: string;
  emoji: string;
  name: string;
  description: string;
  image: string;
  samples: AudioItem[]; // Local MP3 samples
  videos: AudioItem[]; // YouTube videos for extended listening
}

// MP3 file paths (relative to public folder)
const MP3_BASE = '/audio/';

export const AUDIO_CATEGORIES: AudioCategory[] = [
  {
    id: 'brush',
    emoji: '🪮',
    name: '刷麦 · 刮擦',
    description: '软刷轻扫麦克风，细腻刮擦声，最经典的ASMR触发',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-brush-card-2L76jg8zJZ6gXoQzQGZvaA.webp',
    samples: [
      {
        id: 'brush-sample-1',
        title: '刷麦·刮擦',
        type: 'mp3',
        source: `${MP3_BASE}刷麦·刮擦.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'GkULbdgBDOA', title: 'ASMR Brushing Microphone Sounds', type: 'youtube', source: 'GkULbdgBDOA' },
      { id: '2Oo_4CXBkfE', title: 'ASMR Soft Brush Sounds for Sleep', type: 'youtube', source: '2Oo_4CXBkfE' },
      { id: 'Wf_aSqWpkXw', title: 'ASMR Scratching & Brushing Sounds', type: 'youtube', source: 'Wf_aSqWpkXw' },
      { id: '4Bs_GnSbGFk', title: 'ASMR Gentle Brush Triggers No Talking', type: 'youtube', source: '4Bs_GnSbGFk' },
      { id: 'SzMcKJFJoGE', title: 'ASMR Brushing Sounds Close Up', type: 'youtube', source: 'SzMcKJFJoGE' },
    ],
  },
  {
    id: 'tapping',
    emoji: '🫰',
    name: '敲击 · Tapping',
    description: '指尖轻敲各种材质表面，节奏感十足的放松声音',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    samples: [
      {
        id: 'tapping-sample-1',
        title: '敲击·Tapping',
        type: 'mp3',
        source: `${MP3_BASE}敲击·Tapping.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'FNBnBrBVJGc', title: 'ASMR Tapping & Scratching Sounds', type: 'youtube', source: 'FNBnBrBVJGc' },
      { id: 'Z0P-hCNpC_I', title: 'ASMR Fast Tapping No Talking', type: 'youtube', source: 'Z0P-hCNpC_I' },
      { id: '7sSAN0cJm6s', title: 'ASMR Tapping on Various Surfaces', type: 'youtube', source: '7sSAN0cJm6s' },
      { id: '3XBGF7xJDEA', title: 'ASMR Slow Tapping for Deep Sleep', type: 'youtube', source: '3XBGF7xJDEA' },
      { id: 'eLMJ4sCIVCo', title: 'ASMR Finger Tapping Compilation', type: 'youtube', source: 'eLMJ4sCIVCo' },
    ],
  },
  {
    id: 'ear',
    emoji: '👂',
    name: '耳部清洁 · 按摩',
    description: '耳朵清洁与按摩声音，深度放松的双耳体验',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    samples: [
      {
        id: 'ear-sample-1',
        title: '耳部清洁·按摩',
        type: 'mp3',
        source: `${MP3_BASE}耳部清洁·按摩.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'NqFKMTFNbKM', title: 'ASMR Ear Cleaning & Massage', type: 'youtube', source: 'NqFKMTFNbKM' },
      { id: 'UHBsKg_FXHM', title: 'ASMR Ear Attention No Talking', type: 'youtube', source: 'UHBsKg_FXHM' },
      { id: '7JqHNNMXlJE', title: 'ASMR Ear Cleaning Sounds for Sleep', type: 'youtube', source: '7JqHNNMXlJE' },
      { id: 'ZfVHJUMPVaI', title: 'ASMR Binaural Ear Massage', type: 'youtube', source: 'ZfVHJUMPVaI' },
      { id: 'dZzCkBbhGqc', title: 'ASMR Ear Cleaning Compilation', type: 'youtube', source: 'dZzCkBbhGqc' },
    ],
  },
  {
    id: 'personal-care',
    emoji: '🌿',
    name: '个人护理 · 角色扮演',
    description: '被照顾的温柔体验，护肤与个人护理的安心声音',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    samples: [
      {
        id: 'personal-care-sample-1',
        title: '个人护理·角色扮演',
        type: 'mp3',
        source: `${MP3_BASE}个人护理·角色扮演.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: '1oTvFfHqxCQ', title: 'ASMR Personal Attention Roleplay', type: 'youtube', source: '1oTvFfHqxCQ' },
      { id: 'xMFKNPFgPOY', title: 'ASMR Skincare Routine No Talking', type: 'youtube', source: 'xMFKNPFgPOY' },
      { id: 'W1GVxnHjpgA', title: 'ASMR Spa Treatment Sounds', type: 'youtube', source: 'W1GVxnHjpgA' },
      { id: 'fDRmGYhzSaI', title: 'ASMR Face Care & Massage', type: 'youtube', source: 'fDRmGYhzSaI' },
      { id: '0jHDnKnJFfE', title: 'ASMR Personal Care Attention', type: 'youtube', source: '0jHDnKnJFfE' },
    ],
  },
  {
    id: 'hairbrush',
    emoji: '✨',
    name: '梳头 · 头皮按摩',
    description: '梳发与头皮按摩声，最能触发酥麻感的经典体验',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    samples: [
      {
        id: 'hairbrush-sample-1',
        title: '梳头·头皮按摩',
        type: 'mp3',
        source: `${MP3_BASE}梳头·头皮按摩.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'vBVkgBnFqaI', title: 'ASMR Hair Brushing & Scalp Massage', type: 'youtube', source: 'vBVkgBnFqaI' },
      { id: 'JnAkVMYNfYk', title: 'ASMR Brushing Your Hair No Talking', type: 'youtube', source: 'JnAkVMYNfYk' },
      { id: 'vNPnBkJFMjU', title: 'ASMR Scalp Massage & Hair Play', type: 'youtube', source: 'vNPnBkJFMjU' },
      { id: 'xNTM7Q9YCAA', title: 'ASMR Hair Brushing Sounds for Sleep', type: 'youtube', source: 'xNTM7Q9YCAA' },
      { id: 'yvqe5_4MXGE', title: 'ASMR Gentle Hair Brushing', type: 'youtube', source: 'yvqe5_4MXGE' },
    ],
  },
  {
    id: 'eating',
    emoji: '🍗',
    name: '吃播 · 咀嚼音',
    description: '酥脆咀嚼声与食物声音，满足感十足的解压体验',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    samples: [
      {
        id: 'eating-sample-1',
        title: '吃播·咀嚼音',
        type: 'mp3',
        source: `${MP3_BASE}吃播·咀嚼音.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: '3khhdBbR5m8', title: 'GIANT FRIED CHICKEN (ASMR CRUNCHY EATING SOUNDS)', type: 'youtube', source: '3khhdBbR5m8' },
      { id: '71BsRp4Ehjw', title: 'ASMR BEST CRUNCHY EATING SOUNDS (Tobiko Eggs)', type: 'youtube', source: '71BsRp4Ehjw' },
      { id: 'sq64stra218', title: 'ASMR CRUNCHY CHICKEN WINGS & SPICY NOODLES', type: 'youtube', source: 'sq64stra218' },
      { id: 'jhD5iIrJG80', title: 'ASMR CRUNCHY VEGGIE PLATTER (EATING SOUNDS)', type: 'youtube', source: 'jhD5iIrJG80' },
      { id: '4a_NGIdhqKw', title: 'ASMR MUKBANG BLACK BEAN FIRE NOODLES', type: 'youtube', source: '4a_NGIdhqKw' },
    ],
  },
  {
    id: 'cooking',
    emoji: '🍳',
    name: '烹饪 · 厨房声音',
    description: '切菜、煎炒、水声，温暖厨房里的自然白噪音',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-cooking-card-ET4L36Xdq5Dh9NXdVbKn2R.webp',
    samples: [
      {
        id: 'cooking-sample-1',
        title: '烹饪·厨房声音',
        type: 'mp3',
        source: `${MP3_BASE}烹饪·厨房声音.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'FnhQ2QvLIXc', title: 'ASMR COOKING NO TALKING ASMR SOUNDS', type: 'youtube', source: 'FnhQ2QvLIXc' },
      { id: 'S4bgm3a8sQI', title: 'ASMR Making breakfast ~ cooking eggs!', type: 'youtube', source: 'S4bgm3a8sQI' },
      { id: 'DoRSCsrKbq8', title: 'ASMR Cooking No talking 5 hours deep relaxation', type: 'youtube', source: 'DoRSCsrKbq8' },
      { id: 'hBhLvA3RvVY', title: 'ASMR Cooking spaghetti & meatballs!', type: 'youtube', source: 'hBhLvA3RvVY' },
      { id: 'kazwMSkeoSQ', title: '2 Hours ASMR Cooking with Recipes No Talking', type: 'youtube', source: 'kazwMSkeoSQ' },
    ],
  },
  {
    id: 'keyboard',
    emoji: '⌨️',
    name: '键盘 · 办公声音',
    description: '机械键盘敲击与翻纸声，专注工作的白噪音伴侣',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-keyboard-card-Zb62i5GWvyjwtXS4F3KyG4.webp',
    samples: [
      {
        id: 'keyboard-sample-1',
        title: '键盘·办公声音',
        type: 'mp3',
        source: `${MP3_BASE}键盘·办公声音.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'vxo2o92Zc3o', title: 'ASMR Extremely Relaxing Keyboard Typing 3Hr', type: 'youtube', source: 'vxo2o92Zc3o' },
      { id: 'fe1tdko12pU', title: 'Mechanical keyboard typing (no talking ASMR)', type: 'youtube', source: 'fe1tdko12pU' },
      { id: 'VABl4mFT7uk', title: 'ASMR Keyboard Typing (NO TALKING) Mechanical', type: 'youtube', source: 'VABl4mFT7uk' },
      { id: 'U0U7KwoSAqk', title: 'ASMR Admin Work, Typing, Paperwork', type: 'youtube', source: 'U0U7KwoSAqk' },
      { id: 'HE13qoYreRU', title: 'ASMR Paper & Typing Sounds • Home Office Ambiance', type: 'youtube', source: 'HE13qoYreRU' },
    ],
  },
  {
    id: 'journal',
    emoji: '📖',
    name: '手帐 · 胶带 · 文具',
    description: '和纸胶带撕拉、贴纸揭取与纸张摩擦，最细腻的文具声音',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663444210384/cfcH8oskPAbcGXumczKPsU/asmr-paper-card-Fvw6CFjRMeTnntUEQsYkWB.webp',
    samples: [
      {
        id: 'journal-sample-1',
        title: '手帐·胶带·文具',
        type: 'mp3',
        source: `${MP3_BASE}手帐·胶带·文具.mp3`,
        duration: 150,
      },
    ],
    videos: [
      { id: '_HVLDUn8AKI', title: 'Journaling Ambience | ASMR Journal with Me | 90 Minutes', type: 'youtube', source: '_HVLDUn8AKI' },
      { id: 'q_Quy66n_tU', title: 'Relaxing Diary Ambience | ASMR Journal with Me | 100 Minutes', type: 'youtube', source: 'q_Quy66n_tU' },
      { id: 'HAEINtwAf_4', title: 'ASMR Aesthetic Journaling | The Washi Tape Shop', type: 'youtube', source: 'HAEINtwAf_4' },
      { id: 'Kf_cbtP4zXE', title: 'ASMR Journal with Me ft. stickers', type: 'youtube', source: 'Kf_cbtP4zXE' },
      { id: 'jA7p1d9Ec0U', title: 'ASMR Junk Journal: Paper Crinkles & Washi Tape Peeling', type: 'youtube', source: 'jA7p1d9Ec0U' },
    ],
  },
  {
    id: 'slime',
    emoji: '🫧',
    name: '史莱姆 · 肥皂切割',
    description: '史莱姆拉伸与肥皂切割，视觉与听觉双重满足感',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    samples: [
      {
        id: 'slime-sample-1',
        title: '史莱姆·肥皂切割',
        type: 'mp3',
        source: `${MP3_BASE}史莱姆·肥皂切割.mp3`,
        duration: 120,
      },
    ],
    videos: [
      { id: 'MfRzXEPcP9A', title: 'Satisfying Slime ASMR | Relaxing Best Slimes No Talking', type: 'youtube', source: 'MfRzXEPcP9A' },
      { id: 'LhMwd0JzTXA', title: 'Satisfying Slime ASMR | Compilation No Talking', type: 'youtube', source: 'LhMwd0JzTXA' },
      { id: 'zEGF-dKSLGg', title: 'Most Relaxing ASMR Slime Compilation No Talking', type: 'youtube', source: 'zEGF-dKSLGg' },
      { id: 'nGZ2Zi0tiXA', title: 'ASMR 100 Slime Triggers For Sleep And Tingles', type: 'youtube', source: 'nGZ2Zi0tiXA' },
      { id: 'G4PiJc3MlK8', title: 'ASMR First Cut 200 Cutting soap Cubes Oddly Satisfying', type: 'youtube', source: 'G4PiJc3MlK8' },
    ],
  },
];
