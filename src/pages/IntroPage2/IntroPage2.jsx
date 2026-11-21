
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import "./IntroPage2.css";

const stars = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

function IntroPage2({ onNext }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro2-page">

      {/* BACKGROUND */}
      <div className="intro2-background" />
      <div className="intro2-glow intro2-glow-one" />
      <div className="intro2-glow intro2-glow-two" />

      {/* STARS */}
      <div className="intro2-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            style={{
              "--x": `${star.x}%`,
              "--y": `${star.y}%`,
              "--size": `${star.size}px`,
              "--delay": `${star.delay}s`,
              "--duration": `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* FLOATING PARTICLES */}
      <div className="intro2-particles">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        className="intro2-content"
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >

        {/* TOP LABEL */}
        <motion.div
          className="intro2-label"
          initial={{ opacity: 0, letterSpacing: "2px" }}
          animate={{ opacity: 1, letterSpacing: "4px" }}
          transition={{ delay: 0.5, duration: 1.4 }}
        >
          <Sparkles size={15} />
          <span>A SMALL REQUEST</span>
          <Sparkles size={15} />
        </motion.div>

        {/* HEART */}
        <motion.div
          className="intro2-heart"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.8,
            duration: 1,
            type: "spring",
            stiffness: 100,
          }}
        >
          <Heart size={23} />
        </motion.div>

        {/* FIRST TEXT */}
        <motion.h1
          className="intro2-main-text"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.2 }}
        >
          Oy… oka sari
          <span className="intro2-highlight"> navvu bey…</span>
        </motion.h1>

        {/* SECOND TEXT */}
        <motion.p
          className="intro2-please"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          Aboo… vaddu ley
        </motion.p>

        {/* THIRD TEXT */}
        <motion.div
          className="intro2-second-smile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1.2 }}
        >
          <span className="intro2-line" />

          <h2>
            Malli inko sari
            <span> navvu bey…</span>
          </h2>

          {/* KEEP SMILING TEXT */}
          <motion.p
            className="intro2-keep-smile"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 1 }}
          >
            Ee smile alagey unchu… ♡
          </motion.p>

          <span className="intro2-line" />
        </motion.div>

        {/* SMILE */}
        <motion.div
          className="intro2-smile"
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 5,
            duration: 1.3,
            type: "spring",
          }}
        >
          <span className="intro2-smile-mouth" />
        </motion.div>

        {/* BUTTON */}
        <div className="intro2-button-space">
          <AnimatePresence>
            {showButton && (
              <motion.button
                className="intro2-button"
                initial={{ opacity: 0, y: 25, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                onClick={onNext}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Oy… Deyyam, pada</span>
                <ArrowRight size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </motion.div>

      {/* FOOTER */}
      <div className="intro2-footer">
        JUST ONE SMILE <span>♡</span>
      </div>

    </div>
  );
}

export default IntroPage2;
