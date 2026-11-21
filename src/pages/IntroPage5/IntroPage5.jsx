
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Volume2 } from "lucide-react";
import "./IntroPage5.css";

const videos = [
  "/videos/video-2.mp4",
  "/videos/video-6.mp4",
  "/videos/video-5.mp4",
  "/videos/video-4.mp4",
  "/videos/video-3.mp4",
];

function IntroPage5({ onNext }) {
  const [stage, setStage] = useState("intro");
  const [videoIndex, setVideoIndex] = useState(0);
  const [needsTap, setNeedsTap] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef(null);

  // Intro and reaction messages timing
  useEffect(() => {
    let timer;

    if (stage === "intro") {
      timer = setTimeout(() => {
        setVideoIndex(0);
        setStage("video");
      }, 3000);
    }

    if (stage === "reaction") {
      timer = setTimeout(() => {
        setVideoIndex(1);
        setStage("video");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [stage]);

  // Automatically play each video
  useEffect(() => {
    if (stage !== "video") return;

    const video = videoRef.current;
    if (!video) return;

    setNeedsTap(false);
    setVideoError(false);

    video.currentTime = 0;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Video autoplay blocked:", error);
        setNeedsTap(true);
      }
    };

    playVideo();
  }, [stage, videoIndex]);

  // When a video completes
  const handleVideoEnd = () => {
    // First video: show reaction
    if (videoIndex === 0) {
      setStage("reaction");
      return;
    }

    // Play the remaining four videos one after another
    if (videoIndex < videos.length - 1) {
      setVideoIndex((previous) => previous + 1);
      return;
    }

    // Last video completed: go to next page
    onNext?.();
  };

  // Manual play fallback if browser blocks autoplay
  const handlePlayClick = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setNeedsTap(false);
    } catch (error) {
      console.log("Video playback error:", error);
    }
  };

  return (
    <div className="intro5-page">
      <div className="intro5-background-glow" />

      {/* Background stars */}
      <div className="intro5-stars">
        {Array.from({ length: 35 }).map((_, index) => (
          <span
            key={index}
            className="intro5-star"
            style={{
              left: `${(index * 37 + 13) % 100}%`,
              top: `${(index * 61 + 7) % 100}%`,
              animationDelay: `${(index % 8) * 0.45}s`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* INTRO MESSAGE */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            className="intro5-message"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            transition={{ duration: 0.7 }}
          >
            <p>Ippudu nee face lo koncham</p>

            <h1>kopam tepista chudu oy...</h1>

            <p className="intro5-subtitle">
              Ippudu chudu...
            </p>
          </motion.div>
        )}

        {/* LAUGH REACTION */}
        {stage === "reaction" && (
          <motion.div
            key="reaction"
            className="intro5-reaction"
            initial={{ opacity: 0, scale: 0.5, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="intro5-laugh"
              animate={{
                rotate: [-8, 8, -8],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            >
              😂
            </motion.div>

            <h1>Ok ok... cool cool!</h1>

            <p>Ippudu next chudu...</p>
          </motion.div>
        )}

        {/* VIDEO PLAYER */}
        {stage === "video" && (
          <motion.div
            key={`video-${videoIndex}`}
            className="intro5-video-section"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="intro5-video-frame">

              <video
                ref={videoRef}
                src={videos[videoIndex]}
                autoPlay
                playsInline
                preload="auto"
                controls={false}
                onEnded={handleVideoEnd}
                onError={() => setVideoError(true)}
              />

              {/* Play fallback */}
              {needsTap && !videoError && (
                <button
                  className="intro5-play-button"
                  onClick={handlePlayClick}
                >
                  <Play size={25} fill="currentColor" />
                  <span>Play Video</span>
                </button>
              )}

              {/* Video error */}
              {videoError && (
                <div className="intro5-error">
                  <p>Video load avvaledu.</p>
                  <p>File name and path check cheyyi:</p>
                  <strong>{videos[videoIndex]}</strong>
                </div>
              )}

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Bottom label */}
      <div className="intro5-bottom-label">
        <Volume2 size={14} />
        <span>A little surprise for you</span>
      </div>
    </div>
  );
}

export default IntroPage5;
