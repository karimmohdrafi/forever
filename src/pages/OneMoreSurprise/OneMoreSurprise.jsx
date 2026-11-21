
import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ArrowRight,
  Stars,
} from "lucide-react";

import "./OneMoreSurprise.css";

function OneMoreSurprise({ onContinue }) {

  const handleContinue = () => {
    if (typeof onContinue === "function") {
      onContinue();
    } else {
      console.error(
        "OneMoreSurprise: onContinue callback is missing. Check App.jsx."
      );
    }
  };

  return (
    <section className="one-more-page">
      <div className="one-more-stars" />
      <div className="one-more-glow glow-left" />
      <div className="one-more-glow glow-right" />

      {/* FLOATING PARTICLES */}
      <div className="one-more-particles">
        {Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            style={{
              "--left": `${(i * 37) % 100}%`,
              "--delay": `${(i % 8) * 0.7}s`,
              "--duration": `${5 + (i % 5)}s`,
            }}
          >
            {i % 3 === 0 ? "♡" : "✧"}
          </span>
        ))}
      </div>

      <div className="one-more-content">

        {/* TOP ORNAMENT */}
        <motion.div
          className="one-more-ornament"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <span />
          <Stars size={18} />
          <span />
        </motion.div>

        {/* SMALL HEADING */}
        <motion.p
          className="one-more-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          THE MAGIC ISN'T OVER YET
        </motion.p>

        {/* MAIN TITLE */}
        <motion.h1
          className="one-more-title"
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
            delay: 1,
            duration: 1.5,
          }}
        >
          One More
          <span>Surprise...</span>
        </motion.h1>

        {/* DIVIDER */}
        <motion.div
          className="one-more-divider"
          initial={{ width: 0 }}
          animate={{ width: "180px" }}
          transition={{
            delay: 2,
            duration: 1.2,
          }}
        >
          <span />
          <Heart size={15} fill="currentColor" />
          <span />
        </motion.div>

        {/* MESSAGE */}
        <motion.p
          className="one-more-description"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.4,
            duration: 1,
          }}
        >
          Just when you thought the magic was over...
          <br />
          there's still something special waiting for you.
        </motion.p>

        {/* GLOWING HEART */}
        <motion.div
          className="one-more-heart"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: [1, 1.13, 1],
          }}
          transition={{
            opacity: {
              delay: 3,
              duration: 1,
            },
            scale: {
              delay: 3,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <div className="heart-orbit orbit-one" />
          <div className="heart-orbit orbit-two" />

          <Heart size={43} fill="currentColor" />

          <Sparkles
            className="heart-sparkle sparkle-one"
            size={18}
          />

          <Sparkles
            className="heart-sparkle sparkle-two"
            size={15}
          />
        </motion.div>

        {/* CONTINUE BUTTON */}
        <motion.button
          type="button"
          className="one-more-button"
          onClick={handleContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 3.7,
            duration: 1,
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
        >
          <Sparkles size={16} />

          <span>Reveal The Next Surprise</span>

          <ArrowRight size={17} />
        </motion.button>

        {/* FOOTER */}
        <motion.p
          className="one-more-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3 }}
        >
          A LITTLE MORE MAGIC, JUST FOR YOU ♡
        </motion.p>
      </div>

      {/* CORNER DECORATIONS */}
      <div className="one-more-corner corner-top-left">✧</div>
      <div className="one-more-corner corner-top-right">✦</div>
      <div className="one-more-corner corner-bottom-left">✦</div>
      <div className="one-more-corner corner-bottom-right">✧</div>
    </section>
  );
}

export default OneMoreSurprise;
