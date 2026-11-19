
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react";

import "./StarUniverse.css";

// =========================================
// BACKGROUND MUSIC
// =========================================

const BACKGROUND_MUSIC = `${import.meta.env.BASE_URL}music/background-music.mp3`;

// =========================================
// BACKGROUND STAR DATA
// =========================================

const stars = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  x: (i * 47.73) % 100,
  y: (i * 31.91) % 100,
  size: i % 9 === 0 ? 3 : i % 4 === 0 ? 2 : 1,
  delay: (i % 15) * 0.3,
  duration: 2 + (i % 5),
}));

// =========================================
// HEART CONSTELLATION POINTS
// =========================================

const heartPoints = [
  [50, 82],
  [43, 75],
  [35, 66],
  [27, 55],
  [23, 43],
  [24, 32],
  [30, 24],
  [38, 23],
  [45, 29],
  [50, 38],
  [55, 29],
  [62, 23],
  [70, 24],
  [76, 32],
  [77, 43],
  [73, 55],
  [65, 66],
  [57, 75],
  [50, 82],
];

const heartPath = heartPoints
  .map(([x, y], index) => {
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  })
  .join(" ");

// =========================================
// BACKGROUND STAR FIELD
// =========================================

function StarField() {
  return (
    <div className="star-field">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="background-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 1, 0.25],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// =========================================
// SHOOTING STAR
// =========================================

function ShootingStar({ delay, top, left }) {
  return (
    <motion.span
      className="shooting-star"
      style={{
        top,
        left,
      }}
      initial={{
        opacity: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, 180],
        y: [0, 100],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 7,
        ease: "easeOut",
      }}
    />
  );
}

// =========================================
// HEART CONSTELLATION
// =========================================

function HeartConstellation({ active }) {
  return (
    <svg
      className="heart-constellation"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="starGlow">
          <feGaussianBlur
            stdDeviation="1.8"
            result="blur"
          />

          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id="heartLine"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#F7D5FF"
          />

          <stop
            offset="50%"
            stopColor="#C49BFF"
          />

          <stop
            offset="100%"
            stopColor="#FFB8E8"
          />
        </linearGradient>
      </defs>

      {/* CONNECTING HEART LINE */}

      <motion.path
        d={heartPath}
        fill="none"
        stroke="url(#heartLine)"
        strokeWidth="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#starGlow)"
        initial={{
          pathLength: 0,
          opacity: 0,
        }}
        animate={
          active
            ? {
                pathLength: 1,
                opacity: 0.95,
              }
            : {
                pathLength: 0,
                opacity: 0,
              }
        }
        transition={{
          pathLength: {
            duration: 8,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.5,
          },
        }}
      />

      {/* CONSTELLATION STARS */}

      {heartPoints.map(([x, y], index) => (
        <motion.g key={index}>
          <motion.circle
            cx={x}
            cy={y}
            r={index % 3 === 0 ? 1.15 : 0.75}
            fill="#FFF4FF"
            filter="url(#starGlow)"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={
              active
                ? {
                    opacity: [0, 1, 0.75, 1],
                    scale: 1,
                  }
                : {
                    opacity: 0,
                    scale: 0,
                  }
            }
            transition={{
              delay: 0.3 + index * 0.38,
              duration: 0.7,
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

// =========================================
// LUXURY CURSIVE NAME CONSTELLATION
// =========================================

function NameConstellation({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="name-constellation"
          initial={{
            opacity: 0,
            scale: 0.4,
            rotateX: 45,
            filter: "blur(15px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 2.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="name-depth name-depth-three">
            Venkat
          </div>

          <div className="name-depth name-depth-two">
            Venkat
          </div>

          <div className="name-depth name-depth-one">
            Venkat
          </div>

          <motion.div
            className="name-sparkle"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// =========================================
// MAIN STAR UNIVERSE
// =========================================

function StarUniverse({ onContinue }) {
  const audioRef = useRef(null);

  const [heartActive, setHeartActive] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);

  // =====================================
  // STAR UNIVERSE MUSIC
  // =====================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.4;
    audio.muted = false;

    const playMusic = async () => {
      try {
        await audio.play();
        console.log("Star Universe music started");
      } catch (error) {
        console.warn(
          "Star Universe autoplay blocked by browser:",
          error
        );
      }
    };

    playMusic();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // =====================================
  // CINEMATIC ANIMATION TIMELINE
  // =====================================

  useEffect(() => {
    const heartTimer = setTimeout(() => {
      setHeartActive(true);
    }, 1500);

    const nameTimer = setTimeout(() => {
      setNameVisible(true);
    }, 10500);

    const titleTimer = setTimeout(() => {
      setTitleVisible(true);
    }, 13000);

    // CONTINUE BUTTON AFTER 10 SECONDS
    const buttonTimer = setTimeout(() => {
      setShowContinueButton(true);
    }, 10000);

    return () => {
      clearTimeout(heartTimer);
      clearTimeout(nameTimer);
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // =====================================
  // UI
  // =====================================

  return (
    <main className="star-universe">

      {/* STAR UNIVERSE BACKGROUND MUSIC */}

      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC}
        autoPlay
        loop
        preload="auto"
        playsInline
        onCanPlay={() => {
          const audio = audioRef.current;

          if (audio && audio.paused) {
            audio.play().catch((error) => {
              console.warn("Music autoplay blocked:", error);
            });
          }
        }}
      />

      {/* BACKGROUND */}

      <div className="universe-nebula" />
      <div className="universe-horizon" />

      {/* BACKGROUND STARS */}

      <StarField />

      {/* SHOOTING STARS */}

      <ShootingStar
        delay={3}
        top="15%"
        left="5%"
      />

      <ShootingStar
        delay={7}
        top="35%"
        left="65%"
      />

      <ShootingStar
        delay={11}
        top="10%"
        left="78%"
      />

      {/* TOP TITLE */}

      <motion.div
        className="universe-top-label"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <Sparkles size={15} />

        <span>
          THE STAR OF MY UNIVERSE
        </span>

        <Sparkles size={15} />
      </motion.div>

      {/* CONSTELLATION STAGE */}

      <div className="constellation-stage">

        <motion.div
          className="constellation-heading"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
            duration: 2,
          }}
        >
          A MILLION STARS, ONE SPECIAL SOUL
        </motion.div>

        <HeartConstellation
          active={heartActive}
        />

        <NameConstellation
          show={nameVisible}
        />

      </div>

      {/* FINAL MESSAGE */}

      <AnimatePresence>
        {titleVisible && (
          <motion.div
            className="universe-final-message"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.5,
            }}
          >
            <Heart
              size={15}
              fill="currentColor"
            />

            <p>
              THE STAR OF MY UNIVERSE
            </p>

            <Heart
              size={15}
              fill="currentColor"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM CAPTION */}

      <motion.p
        className="universe-bottom-note"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2,
        }}
      >
        SOME STARS ARE MEANT TO SHINE A LITTLE BRIGHTER
      </motion.p>

      {/* CONTINUE BUTTON AFTER 10 SECONDS */}

      <AnimatePresence>
        {showContinueButton && (
          <motion.button
            className="universe-continue"
            type="button"
            onClick={onContinue}
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 1,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Continue the journey

            <ArrowRight size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FOOTER */}

      <div className="universe-footer">
        MADE OF STARDUST & LOVE

        <span>✦</span>
      </div>

    </main>
  );
}

export default StarUniverse;
