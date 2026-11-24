
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import "./IntroPage2.css";

function IntroPage2({ onNext }) {
  const [awakened, setAwakened] = useState(false);
  const [showName, setShowName] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!awakened) return;

    const timer = setTimeout(() => {
      setShowName(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, [awakened]);

  const awakenMirror = () => {
    if (awakened) return;
    setAwakened(true);
  };

  const continueStory = () => {
    if (leaving) return;

    setLeaving(true);

    setTimeout(() => {
      if (onNext) onNext();
    }, 1500);
  };

  return (
    <main
      className={`intro2 ${awakened ? "awakened" : ""} ${
        leaving ? "leaving" : ""
      }`}
    >
      {/* BACKGROUND PARTICLES */}
      <div className="intro2-particles">
        {Array.from({ length: 35 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      {/* LEFT SIDE MIRROR */}
      <section className="intro2-left">
        <div className="mirror-scene">

          <div className="mirror-stand" />

          <div className="mirror-frame">

            <div className="mirror-ornament mirror-crown">
              ♛
            </div>

            {/* MIRROR GLASS */}
            <div className="mirror-glass">

              {/* PALACE REFLECTION */}
              <div className="mirror-reflection">

                <div className="reflection-sky" />

                <div className="reflection-palace">
                  <div className="reflection-tower left" />
                  <div className="reflection-tower right" />
                </div>

                <div className="reflection-garden" />

                {/* WATER RIPPLES */}
                <div className="mirror-ripple" />
                <div className="mirror-ripple" />
                <div className="mirror-ripple" />

              </div>

              {/* MIRROR STARS */}
              <div className="mirror-stars">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index}>✦</span>
                ))}
              </div>

              {/* GLASS SHINE */}
              <div className="mirror-shine" />

              {/* MIRROR MESSAGE */}
              <div className="mirror-message">
                <span className="mirror-message-small">
                  A MAGICAL REFLECTION
                </span>
                <span className="mirror-message-icon">✧</span>
                <span className="mirror-message-text">
                  Your story
                  <br />
                  begins here
                </span>
              </div>

            </div>

            <div className="mirror-ornament mirror-bottom-ornament">
              ❧
            </div>

          </div>

          <div className="mirror-base" />

          {/* FLOATING DECORATIONS */}
          <span className="mirror-side-star star-one">✧</span>
          <span className="mirror-side-star star-two">✦</span>
          <span className="mirror-side-star star-three">✧</span>

        </div>
      </section>

      {/* RIGHT SIDE CONTENT */}
      <section className="intro2-right">

        <div className="intro2-eyebrow">
          <Sparkles size={15} />
          <span>THE ROYAL SECRET</span>
          <Sparkles size={15} />
        </div>

        <h1 className="intro2-title">
          The Princess's
          <span>Secret Mirror</span>
        </h1>

        <div className="intro2-divider">
          <span>✦</span>
        </div>

        <AnimatePresence mode="wait">
          {!awakened ? (
            <motion.div
              className="intro2-content"
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7 }}
            >
              <p className="intro2-description">
                Beyond this mirror lies a world filled with
                <strong> magic, beauty and wonder.</strong>
                <br /><br />
                They say every princess has a little magic
                of her own. Perhaps this mirror is waiting
                to reveal yours.
              </p>

              <button
                className="intro2-button"
                onClick={awakenMirror}
              >
                <span>AWAKEN THE MAGIC</span>
                <Sparkles size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="intro2-content"
              key="awakened"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <p className="intro2-description">
                The mirror has awakened...
                <br />
                A beautiful soul is about to be revealed.
              </p>

              {showName && (
                <motion.div
                  className="intro2-name-wrapper"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2 }}
                >
                  <div className="intro2-name">
                    Venkata Naga Durga
                  </div>

                  <div className="intro2-name-caption">
                    OUR BEAUTIFUL PRINCESS
                  </div>

                  <motion.button
                    className="intro2-button"
                    onClick={continueStory}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>REVEAL MY STORY</span>
                    <ArrowRight size={17} />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="intro2-footer">
          A LITTLE MAGIC IS WAITING FOR YOU
        </div>

      </section>

      {/* TRANSITION OVERLAY */}
      <AnimatePresence>
        {leaving && (
          <motion.div
            className="intro2-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
          >
            <motion.div
              className="intro2-transition-star"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 25, rotate: 180 }}
              transition={{ duration: 1.4 }}
            >
              ✦
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default IntroPage2;
