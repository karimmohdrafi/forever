
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Gift,
  ArrowRight,
} from "lucide-react";

import "./BirthdayWelcome.css";

// =========================================
// BIRTHDAY TEXT
// =========================================

const greetingLines = [
  "Happy Birthday",
  "Venkata",
  "Naga Durga",
];

// =========================================
// BUTTERFLY ANIMATION
// =========================================

function Butterfly({ className, delay = 0 }) {
  return (
    <motion.div
      className={`butterfly ${className}`}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{
        opacity: [0, 1, 0.9, 0],
        scale: [0.3, 1, 1.1, 0.8],
        x: [0, 55, 110, 160],
        y: [0, -65, 25, -85],
        rotate: [0, 15, -15, 10],
      }}
      transition={{
        duration: 9,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      <span className="butterfly-wing wing-left" />
      <span className="butterfly-body" />
      <span className="butterfly-wing wing-right" />
    </motion.div>
  );
}

// =========================================
// FLOATING PARTICLES
// =========================================

function FloatingParticles() {
  return (
    <div className="birthday-particles">
      {Array.from({ length: 45 }, (_, i) => (
        <span
          key={i}
          className="birthday-particle"
          style={{
            left: `${(i * 37.7) % 100}%`,
            top: `${(i * 53.3) % 100}%`,
            animationDelay: `${(i % 9) * 0.5}s`,
            animationDuration: `${5 + (i % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}

// =========================================
// MAIN BIRTHDAY WELCOME
// =========================================

function BirthdayWelcome({ onNext }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [giftMessage, setGiftMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);

  const audioRef = useRef(null);

  // =====================================
  // BACKGROUND MUSIC
  // =====================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log(
          "Browser blocked autoplay. Music needs a user interaction.",
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
  // CINEMATIC TEXT REVEAL
  // =====================================

  useEffect(() => {
    const timers = greetingLines.map((_, index) =>
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, 1000 + index * 1900)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // =====================================
  // SHOW BUTTON AFTER 15 SECONDS
  // =====================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // =====================================
  // NEXT PAGE NAVIGATION
  // =====================================

  const handleNext = () => {
    if (typeof onNext === "function") {
      onNext();
    } else {
      console.error(
        "BirthdayWelcome: onNext callback is missing. Check App.jsx."
      );
    }
  };

  // =====================================
  // UI
  // =====================================

  return (
    <main className="birthday-welcome">

      {/* BACKGROUND MUSIC */}

      <audio
        ref={audioRef}
        src="/music/background-music2.mp3"
        preload="auto"
        loop
      />

      {/* BACKGROUND */}

      <div className="birthday-bg" />
      <div className="birthday-bg-glow" />

      <FloatingParticles />

      {/* BUTTERFLIES */}

      <div className="butterfly-layer">
        <Butterfly className="butterfly-one" delay={0} />
        <Butterfly className="butterfly-two" delay={2.5} />
        <Butterfly className="butterfly-three" delay={4} />
        <Butterfly className="butterfly-four" delay={1.5} />
        <Butterfly className="butterfly-five" delay={5} />
      </div>

      {/* MAIN BIRTHDAY MESSAGE */}

      <section className="birthday-message">

        {/* TOP LABEL */}

        <motion.div
          className="birthday-topline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Sparkles size={15} />

          <span>
            A SPECIAL DAY · A SPECIAL SOUL
          </span>

          <Sparkles size={15} />
        </motion.div>

        {/* CINEMATIC TEXT */}

        <div className="birthday-title-area">
          {greetingLines.map((line, index) => (
            <div
              className="birthday-line-wrapper"
              key={line}
            >
              {visibleLines > index && (
                <motion.h1
                  className={`birthday-line birthday-line-${index + 1}`}
                  initial={{
                    opacity: 0,
                    y: 35,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {Array.from(line).map((letter, letterIndex) => (
                    <motion.span
                      key={`${line}-${letterIndex}`}
                      initial={{
                        opacity: 0,
                        y: 22,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        delay: letterIndex * 0.075,
                        duration: 0.45,
                        ease: "easeOut",
                      }}
                      className={
                        letter === " " ? "letter-space" : ""
                      }
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.h1>
              )}
            </div>
          ))}
        </div>

        {/* PERSONAL MESSAGE */}

        {visibleLines === 3 && (
          <motion.div
            className="birthday-submessage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.2 }}
          >
            <Heart size={15} fill="currentColor" />

            <p>
              You make this universe beautiful.
            </p>

            <Heart size={15} fill="currentColor" />
          </motion.div>
        )}

        {/* BOTTOM CAPTION */}

        <motion.div
          className="birthday-bottom-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
        >
          <span>✦</span>

          <p>
            A LITTLE WORLD CREATED JUST FOR YOU
          </p>

          <span>✦</span>
        </motion.div>

        {/* DISCOVER YOUR STARS BUTTON */}

        {showNextButton && visibleLines === 3 && (
          <motion.button
            type="button"
            className="birthday-next-button"
            onClick={handleNext}
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Your Stars

            <ArrowRight size={16} />
          </motion.button>
        )}

      </section>

      {/* GIFT BOXES REMOVED */}

      {/* GIFT MESSAGE */}

      {giftMessage && (
        <motion.div
          className="gift-message"
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
        >
          <Gift size={17} />

          <span>{giftMessage}</span>

          <button
            type="button"
            onClick={() => setGiftMessage("")}
            aria-label="Close gift message"
          >
            ×
          </button>
        </motion.div>
      )}

      {/* FOOTER */}

      <div className="birthday-footer">
        MADE WITH LOVE

        <Heart size={12} fill="currentColor" />

        JUST FOR YOU
      </div>

    </main>
  );
}

export default BirthdayWelcome;
