
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import "./IntroPage1.css";

const stars = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

function IntroPage1({ onNext }) {
  const [showHint, setShowHint] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 2000);

    const hideHintTimer = setTimeout(() => {
      setShowHint(false);
    }, 4000);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 7000);

    return () => {
      clearTimeout(hintTimer);
      clearTimeout(hideHintTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="intro1-page">
      {/* BACKGROUND */}
      <div className="intro1-background" />

      <div className="intro1-glow intro1-glow-left" />
      <div className="intro1-glow intro1-glow-right" />

      {/* STARS */}
      <div className="intro1-stars">
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
      <div className="intro1-particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        className="intro1-content"
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.div
          className="intro1-top-label"
          initial={{ opacity: 0, letterSpacing: "2px" }}
          animate={{ opacity: 1, letterSpacing: "5px" }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <Sparkles size={14} />
          <span>A LITTLE SURPRISE FOR YOU</span>
          <Sparkles size={14} />
        </motion.div>

        <motion.div
          className="intro1-divider"
          initial={{ width: 0 }}
          animate={{ width: "150px" }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <span />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Enti bey, chustunav?
          <span className="intro1-question-mark"> ✦</span>
        </motion.h1>

        <motion.div
          className="intro1-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
        >
          <p>Ohh… ee roju naa kothi birthday kada!</p>
          <p>Na side nunchi oka surprise…</p>
        </motion.div>

        <motion.div
          className="intro1-emotion"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <span className="intro1-small-line" />
          <p>Ee surprise lo konni emotions petta…</p>
          <p>Anni chudu bey…</p>
          <span className="intro1-small-line" />
        </motion.div>

        <motion.div
          className="intro1-final-text"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4.5, duration: 1.2 }}
        >
          Inka start cheddam haa…
          <span>♡</span>
        </motion.div>

        {/* TEMPORARY HINT */}
        <div className="intro1-hint-container">
          <AnimatePresence>
            {showHint && (
              <motion.p
                className="intro1-hint"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                Agu… kinda oka button vastundi, aa button press cheyi ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* NEXT BUTTON */}
        <div className="intro1-button-container">
          <AnimatePresence>
            {showButton && (
              <motion.button
                className="intro1-next-button"
                initial={{ opacity: 0, y: 25, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onClick={onNext}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Inka em chustav, pada</span>
                <ArrowRight size={17} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* FOOTER */}
      <div className="intro1-footer">
        MADE WITH A LITTLE LOVE <span>♡</span>
      </div>
    </div>
  );
}

export default IntroPage1;
