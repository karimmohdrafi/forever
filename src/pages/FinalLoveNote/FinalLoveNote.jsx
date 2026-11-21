import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FinalLoveNote.css";

const MUSIC_PATH = "/music/background-music10.mp3";

function FinalLoveNote() {
  const [showBoard, setShowBoard] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const audioRef = useRef(null);

  // Background Music - Automatic Play + Loop
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    const playMusic = () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Browser may block autoplay until user interaction
        });
      }
    };

    // Try automatic playback
    playMusic();

    // Retry after user interaction if autoplay was blocked
    window.addEventListener("pointerdown", playMusic);
    window.addEventListener("keydown", playMusic);

    return () => {
      window.removeEventListener("pointerdown", playMusic);
      window.removeEventListener("keydown", playMusic);

      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const boardTimer = setTimeout(() => {
      setShowBoard(true);
    }, 700);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 12700);

    const thankYouTimer = setTimeout(() => {
      setShowThankYou(true);
    }, 15000);

    return () => {
      clearTimeout(boardTimer);
      clearTimeout(fadeTimer);
      clearTimeout(thankYouTimer);
    };
  }, []);

  return (
    <main className={`final-love-page ${fadeOut ? "fade-to-black" : ""}`}>

      {/* Background Music */}
      <audio
        ref={audioRef}
        src={MUSIC_PATH}
        loop
        preload="auto"
      />

      <div className="final-love-stars">
        {Array.from({ length: 65 }, (_, i) => (
          <span
            key={i}
            style={{
              "--x": `${(i * 37) % 100}%`,
              "--y": `${(i * 59) % 100}%`,
              "--delay": `${(i % 8) * 0.45}s`,
              "--size": `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {!fadeOut && (
          <motion.div
            className="final-love-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.header
              className="final-love-heading"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3 }}
            >
              <span>A LITTLE MESSAGE FROM THE HEART</span>

              <h1>The Final Love Note</h1>

              <div className="heading-divider">
                <i />
                <span>♡</span>
                <i />
              </div>
            </motion.header>

            <div
              className={`love-board-scene ${
                showBoard ? "board-visible" : ""
              }`}
            >
              {/* Rose bouquet on the left */}
              <div className="rose-jar">
                <div className="bouquet">
                  {Array.from({ length: 13 }, (_, i) => (
                    <span
                      key={i}
                      className={`rose rose-${i + 1}`}
                      style={{
                        "--rose-delay": `${i * 0.08}s`,
                      }}
                    >
                      <i />
                    </span>
                  ))}

                  <div className="rose-leaves">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="jar-neck" />

                <div className="glass-jar">
                  <div className="jar-shine" />
                  <div className="jar-water" />
                </div>

                <span className="jar-caption">
                  A bouquet of love
                </span>
              </div>

              {/* Main illuminated message board */}
              <div className="love-message-board">
                <div className="board-lights">
                  {Array.from({ length: 48 }, (_, i) => (
                    <span
                      key={i}
                      style={{
                        "--light-delay": `${(i % 12) * 0.12}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="board-inner">
                  <div className="board-top-flourish">
                    ✧ &nbsp; ♡ &nbsp; ✧
                  </div>

                  <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      showBoard
                        ? { opacity: 1, y: 0 }
                        : {}
                    }
                    transition={{
                      delay: 0.6,
                      duration: 1.2,
                    }}
                  >
                    Happy birthday Oy
                  </motion.h2>

                  <motion.div
                    className="board-heart-divider"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      showBoard
                        ? { opacity: 1, scale: 1 }
                        : {}
                    }
                    transition={{
                      delay: 1.2,
                      duration: 0.8,
                    }}
                  >
                    <span>♡</span>
                  </motion.div>

                  <motion.p
                    className="board-message"
                    initial={{ opacity: 0, y: 15 }}
                    animate={
                      showBoard
                        ? { opacity: 1, y: 0 }
                        : {}
                    }
                    transition={{
                      delay: 1.6,
                      duration: 1.2,
                    }}
                  >
                    Thank you for being the most important
                    <br />
                    beautiful part of my life .....
                  </motion.p>

                  <motion.div
                    className="board-signoff"
                    initial={{ opacity: 0 }}
                    animate={
                      showBoard
                        ? { opacity: 1 }
                        : {}
                    }
                    transition={{
                      delay: 2.3,
                      duration: 1.2,
                    }}
                  >
                    <span className="cre-line">
                      Cre Oy
                    </span>

                    <span className="always-line">
                      Always Your — Oy
                    </span>
                  </motion.div>

                  <div className="board-bottom-flourish">
                    ♡ &nbsp; WITH LOVE &nbsp; ♡
                  </div>
                </div>
              </div>

              {/* Blinking heart outline on the right */}
              <div className="right-love-heart">
                <svg viewBox="0 0 180 165" aria-hidden="true">
                  <path d="M90 148 C72 130 12 88 12 48 C12 5 67 -4 90 35 C113 -4 168 5 168 48 C168 88 108 130 90 148 Z" />
                </svg>

                <span>♡</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Thank You */}
      {showThankYou && (
        <motion.div
          className="final-thank-you"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        >
          <span className="thank-you-sparkle">✧</span>

          <h1>Thank You</h1>

          <p>For being you ♡</p>

          <span className="thank-you-sparkle">✧</span>
        </motion.div>
      )}
    </main>
  );
}

export default FinalLoveNote;