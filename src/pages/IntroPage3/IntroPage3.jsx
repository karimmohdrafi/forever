
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2 } from "lucide-react";
import "./IntroPage3.css";

function IntroPage3({ onNext }) {
  const videoRef = useRef(null);

  const [videoBlocked, setVideoBlocked] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const playVideo = async () => {
      try {
        await video.play();
        setVideoBlocked(false);
      } catch (error) {
        console.warn("Video autoplay failed:", error);

        if (error.name === "NotAllowedError") {
          setVideoBlocked(true);
        } else {
          setVideoError(true);
          setErrorMessage(
            "Video couldn't be loaded. Please check the video file and format."
          );
        }
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
      video.pause();
    };
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.muted = false;
      video.volume = 1;

      await video.play();
      setVideoBlocked(false);
    } catch (error) {
      console.error("Video playback failed:", error);
      setVideoBlocked(true);
    }
  };

  const handleVideoEnd = () => {
    onNext?.();
  };

  const handleVideoError = () => {
    setVideoError(true);
    setErrorMessage(
      "Unable to play video. Check the file path and MP4 format."
    );
  };

  return (
    <main className="intro3-page">
      <div className="intro3-background">
        <div className="intro3-glow intro3-glow-one" />
        <div className="intro3-glow intro3-glow-two" />

        <div className="intro3-stars">
          {Array.from({ length: 35 }).map((_, index) => (
            <span
              key={index}
              className="intro3-star"
              style={{
                left: `${(index * 37 + 13) % 100}%`,
                top: `${(index * 53 + 17) % 100}%`,
                animationDelay: `${(index % 6) * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="intro3-content"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="intro3-heading">
          <span className="intro3-small-text">
            A little moment for you
          </span>

          <h1>Just For You</h1>

          <span className="intro3-divider" />
        </div>

        <div className="intro3-video-frame">
          {!videoError ? (
            <video
              ref={videoRef}
              className="intro3-video"
              src="/videos/video-1.mp4"
              autoPlay
              playsInline
              preload="auto"
              controls={false}
              onEnded={handleVideoEnd}
              onError={handleVideoError}
            />
          ) : (
            <div className="intro3-error">
              <p>{errorMessage}</p>
              <button onClick={onNext}>Continue</button>
            </div>
          )}

          <AnimatePresence>
            {videoBlocked && !videoError && (
              <motion.div
                className="intro3-play-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.button
                  className="intro3-play-button"
                  onClick={handlePlay}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Play size={27} fill="currentColor" />
                </motion.button>

                <p>Tap to play with sound</p>

                <span>
                  <Volume2 size={15} />
                  Sound enabled
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          className="intro3-bottom-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          A small surprise, made with love ♡
        </motion.p>
      </motion.div>
    </main>
  );
}

export default IntroPage3;
