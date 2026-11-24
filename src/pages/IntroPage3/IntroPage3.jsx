
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import "./IntroPage3.css";

function IntroPage3({ onNext }) {
  const [leaving, setLeaving] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(true), 700);
    return () => clearTimeout(timer);
  }, []);

  const continueStory = () => {
    if (leaving) return;

    setLeaving(true);

    setTimeout(() => {
      onNext?.();
    }, 1400);
  };

  return (
    <section className={`intro3 ${leaving ? "intro3-leaving" : ""}`}>

      {/* Background stars */}
      <div className="intro3-particles">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* Galaxy glow */}
      <div className="intro3-nebula" />
      <div className="intro3-cosmos" />

      {/* Heart constellation */}
      <motion.div
        className="intro3-heart"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <svg viewBox="0 0 300 270" className="intro3-heart-svg">
          <defs>
            <linearGradient id="heartGradient3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f2d7ff" />
              <stop offset="50%" stopColor="#bd8bff" />
              <stop offset="100%" stopColor="#7864db" />
            </linearGradient>
            <filter id="heartGlow3">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M150 238 C125 215 24 148 24 78 C24 27 88 8 150 76 C212 8 276 27 276 78 C276 148 175 215 150 238Z"
            fill="none"
            stroke="url(#heartGradient3)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            filter="url(#heartGlow3)"
          />

          {[
            [150, 76], [95, 36], [52, 65], [35, 105],
            [72, 154], [110, 187], [150, 222], [190, 187],
            [228, 154], [265, 105], [248, 65], [205, 36],
            [150, 145], [120, 110], [180, 110]
          ].map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={index % 3 === 0 ? 3 : 1.8}
              fill="#f1dcff"
              className="intro3-heart-star"
            />
          ))}
        </svg>
      </motion.div>

      {/* Main content */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="intro3-content"
            initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -25, filter: "blur(8px)" }}
            transition={{ duration: 1.2 }}
          >
            <div className="intro3-eyebrow">
              <Sparkles size={13} />
              <span>A LITTLE THOUGHT FROM MY HEART</span>
              <Sparkles size={13} />
            </div>

            <h1 className="intro3-title">
              You Are My
              <span>Universe</span>
            </h1>

            <div className="intro3-divider" />

            <div className="intro3-message">
              <p>In this endless universe,</p>
              <p>there are billions of stars...</p>
              <p>but somehow, my eyes always find you.</p>
              <p className="intro3-highlight">
                You are not just a part of my universe.
              </p>
              <p>You are the reason it feels beautiful.</p>
            </div>

            <div className="intro3-signature">
              You are my favourite universe.
            </div>

            <div className="intro3-name">
              Venkata Naga Durga
            </div>

            <button
              className="intro3-button"
              onClick={continueStory}
              disabled={leaving}
            >
              <span>ENTER MY UNIVERSE</span>
              <ArrowRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition */}
      {leaving && <div className="intro3-transition" />}

    </section>
  );
}

export default IntroPage3;
