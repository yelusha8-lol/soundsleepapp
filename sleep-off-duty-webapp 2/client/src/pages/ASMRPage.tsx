/**
 * 助眠声音页面 - ASMRPage
 * 设计哲学：深夜蓝 + 暖月光金，极简低压力，沉浸式声音体验
 * 布局：左侧分类导航（移动端顶部横滑） + 右侧视频列表 + 底部播放控制栏
 * 功能：支持本地MP3样本试听 + YouTube完整版
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  Play,
  Pause,
  X,
  Heart,
  Clock,
  Headphones,
  Download,
} from "lucide-react";
import { AUDIO_CATEGORIES } from "../data/audioCategories";

// ─── 类型 ──────────────────────────────────────────────────────────
interface AudioSource {
  id: string;
  title: string;
  type: 'mp3' | 'youtube';
  source: string;
}

// ─── 主组件 ─────────────────────────────────────────────────────────
export default function ASMRPage() {
  const [, navigate] = useLocation();
  const [activeCategory, setActiveCategory] = useState(AUDIO_CATEGORIES[0]);
  const [playingSource, setPlayingSource] = useState<AudioSource | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [audioMode, setAudioMode] = useState<'sample' | 'full'>('sample'); // 切换本地MP3和YouTube
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 定时器逻辑
  useEffect(() => {
    if (timerMinutes !== null && playingSource) {
      setTimeLeft(timerMinutes * 60);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timerRef.current!);
            setPlayingSource(null);
            setTimerMinutes(null);
            if (audioRef.current) audioRef.current.pause();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerMinutes, playingSource]);

  const toggleFavorite = (sourceId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(sourceId)) next.delete(sourceId);
      else next.add(sourceId);
      return next;
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSetTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setShowTimerPicker(false);
  };

  const handlePlayAudio = (source: AudioSource) => {
    setPlayingSource(source);
    if (source.type === 'mp3' && audioRef.current) {
      audioRef.current.src = source.source;
      audioRef.current.play();
    }
  };

  // 合并样本和视频为统一列表
  const getCombinedAudioList = () => {
    if (audioMode === 'sample') {
      return activeCategory.samples;
    } else {
      return activeCategory.videos;
    }
  };

  const audioList = getCombinedAudioList();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0d1b2a 0%, #112240 60%, #0a1628 100%)",
        color: "#EAE7DF",
        fontFamily: "'Noto Serif SC', serif",
        maxWidth: 430,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* ── 隐藏的音频播放器 ── */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setPlayingSource(null);
          setTimerMinutes(null);
          setTimeLeft(null);
          if (timerRef.current) clearInterval(timerRef.current);
        }}
      />

      {/* ── 顶部导航栏 ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(13,27,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,166,107,0.15)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: 10,
            padding: "8px 10px",
            color: "#C9A66B",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#EAE7DF" }}>
            🎧 助眠声音
          </div>
          <div style={{ fontSize: 11, color: "#AEB7CC", marginTop: 1 }}>
            {audioMode === 'sample' ? '本地试听' : 'YouTube完整版'}
          </div>
        </div>
        <button
          onClick={() => setShowTimerPicker(true)}
          style={{
            background: timeLeft ? "rgba(201,166,107,0.2)" : "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: 10,
            padding: "8px 10px",
            color: timeLeft ? "#C9A66B" : "#AEB7CC",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
          }}
        >
          <Clock size={16} />
          {timeLeft ? formatTime(timeLeft) : "定时"}
        </button>
      </div>

      {/* ── 分类横滑导航 ── */}
      <div
        ref={categoryScrollRef}
        style={{
          display: "flex",
          gap: 10,
          padding: "14px 20px",
          overflowX: "auto",
          scrollbarWidth: "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {AUDIO_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0,
              padding: "8px 14px",
              borderRadius: 20,
              border: activeCategory.id === cat.id
                ? "1px solid #C9A66B"
                : "1px solid rgba(255,255,255,0.1)",
              background: activeCategory.id === cat.id
                ? "rgba(201,166,107,0.15)"
                : "rgba(255,255,255,0.04)",
              color: activeCategory.id === cat.id ? "#C9A66B" : "#AEB7CC",
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {cat.emoji} {cat.name}
          </button>
        ))}
      </div>

      {/* ── 分类介绍卡片 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          style={{ padding: "16px 20px 0" }}
        >
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              position: "relative",
              height: 120,
              marginBottom: 16,
            }}
          >
            <img
              src={activeCategory.image}
              alt={activeCategory.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.5)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "14px 16px",
                background: "linear-gradient(0deg, rgba(13,27,42,0.85) 0%, transparent 100%)",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: "#EAE7DF" }}>
                {activeCategory.emoji} {activeCategory.name}
              </div>
              <div style={{ fontSize: 12, color: "#AEB7CC", marginTop: 3 }}>
                {activeCategory.description}
              </div>
            </div>
          </div>

          {/* ── 模式切换按钮 ── */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button
              onClick={() => setAudioMode('sample')}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: 10,
                border: audioMode === 'sample'
                  ? "1px solid #C9A66B"
                  : "1px solid rgba(255,255,255,0.1)",
                background: audioMode === 'sample'
                  ? "rgba(201,166,107,0.15)"
                  : "rgba(255,255,255,0.04)",
                color: audioMode === 'sample' ? "#C9A66B" : "#AEB7CC",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Download size={14} />
              本地试听
            </button>
            <button
              onClick={() => setAudioMode('full')}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: 10,
                border: audioMode === 'full'
                  ? "1px solid #C9A66B"
                  : "1px solid rgba(255,255,255,0.1)",
                background: audioMode === 'full'
                  ? "rgba(201,166,107,0.15)"
                  : "rgba(255,255,255,0.04)",
                color: audioMode === 'full' ? "#C9A66B" : "#AEB7CC",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              ▶ YouTube 完整版
            </button>
          </div>

          {/* ── 音频列表 ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: playingSource ? 120 : 24 }}>
            {audioList.map((audio, index) => (
              <motion.div
                key={audio.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => handlePlayAudio(audio)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: playingSource?.id === audio.id
                    ? "rgba(201,166,107,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: playingSource?.id === audio.id
                    ? "1px solid rgba(201,166,107,0.4)"
                    : "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {/* 音频类型图标 */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: audio.type === 'mp3'
                      ? "rgba(201,166,107,0.15)"
                      : "rgba(255,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 16,
                  }}
                >
                  {audio.type === 'mp3' ? '📥' : '▶'}
                </div>

                {/* 标题和类型 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      color: playingSource?.id === audio.id ? "#C9A66B" : "#EAE7DF",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {audio.title}
                  </div>
                  <div style={{ fontSize: 11, color: "#AEB7CC", marginTop: 2 }}>
                    {audio.type === 'mp3' ? '本地样本' : 'YouTube 视频'}
                  </div>
                </div>

                {/* 收藏按钮 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(audio.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 6,
                    flexShrink: 0,
                  }}
                >
                  <Heart
                    size={16}
                    color={favorites.has(audio.id) ? "#C9A66B" : "#AEB7CC"}
                    fill={favorites.has(audio.id) ? "#C9A66B" : "none"}
                  />
                </button>

                {/* 播放状态指示 */}
                {playingSource?.id === audio.id ? (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(201,166,107,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Pause size={12} color="#C9A66B" fill="#C9A66B" />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(201,166,107,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Play size={12} color="#C9A66B" fill="#C9A66B" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── 底部播放控制栏 ── */}
      <AnimatePresence>
        {playingSource && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: 430,
              zIndex: 100,
              background: "rgba(13,27,42,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(201,166,107,0.2)",
            }}
          >
            {/* YouTube 播放器（仅在视频模式） */}
            {playingSource.type === 'youtube' && (
              <div style={{ width: "100%", aspectRatio: "16/9" }}>
                <iframe
                  key={playingSource.id}
                  src={`https://www.youtube.com/embed/${playingSource.source}?autoplay=1&rel=0&modestbranding=1`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "0",
                  }}
                />
              </div>
            )}

            {/* MP3 播放器（仅在本地模式） */}
            {playingSource.type === 'mp3' && (
              <div style={{ padding: "16px 20px" }}>
                <audio
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: 40,
                  }}
                >
                  <source src={playingSource.source} type="audio/mpeg" />
                </audio>
              </div>
            )}

            {/* 播放信息栏 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px 20px",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(201,166,107,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Headphones size={16} color="#C9A66B" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: "#EAE7DF",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {playingSource.title}
                </div>
                <div style={{ fontSize: 11, color: "#AEB7CC", marginTop: 2 }}>
                  {activeCategory.emoji} {activeCategory.name}
                  {timeLeft && ` · ${formatTime(timeLeft)} 后停止`}
                </div>
              </div>
              <button
                onClick={() => {
                  setPlayingSource(null);
                  setTimerMinutes(null);
                  setTimeLeft(null);
                  if (timerRef.current) clearInterval(timerRef.current);
                  if (audioRef.current) audioRef.current.pause();
                }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px",
                  color: "#AEB7CC",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 定时器选择弹窗 ── */}
      <AnimatePresence>
        {showTimerPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              zIndex: 200,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            onClick={() => setShowTimerPicker(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 430,
                background: "#112240",
                borderRadius: "20px 20px 0 0",
                padding: "24px 20px 40px",
                border: "1px solid rgba(201,166,107,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#EAE7DF",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                ⏱ 定时关闭
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "不限时", value: null },
                  { label: "15 分钟后停止", value: 15 },
                  { label: "30 分钟后停止", value: 30 },
                  { label: "60 分钟后停止", value: 60 },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => {
                      if (option.value === null) {
                        setTimerMinutes(null);
                        setTimeLeft(null);
                        if (timerRef.current) clearInterval(timerRef.current);
                        setShowTimerPicker(false);
                      } else {
                        handleSetTimer(option.value);
                      }
                    }}
                    style={{
                      padding: "14px 20px",
                      borderRadius: 12,
                      border: timerMinutes === option.value
                        ? "1px solid #C9A66B"
                        : "1px solid rgba(255,255,255,0.1)",
                      background: timerMinutes === option.value
                        ? "rgba(201,166,107,0.15)"
                        : "rgba(255,255,255,0.04)",
                      color: timerMinutes === option.value ? "#C9A66B" : "#EAE7DF",
                      fontSize: 15,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {option.label}
                    {timerMinutes === option.value && (
                      <span style={{ color: "#C9A66B", fontSize: 12 }}>✓ 当前</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
