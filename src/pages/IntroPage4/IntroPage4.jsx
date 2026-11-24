
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import "./IntroPage4.css";

function IntroPage4({ onNext }) {
  const [gateOpen, setGateOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const enterGarden = () => {
    if (gateOpen || leaving) return;

    setGateOpen(true);

    setTimeout(() => {
      setLeaving(true);
    }, 1200);

    setTimeout(() => {
      onNext?.();
    }, 2500);
  };

  return (
    <section className={`intro4 ${leaving ? "intro4-leaving" : ""}`}>

      {/* Garden background */}
      <div className="intro4-garden">

        <div className="garden-moon" />
        <div className="garden-horizon" />
        <div className="garden-path" />

        {/* Garden entrance */}
        <div className={`garden-entrance ${gateOpen ? "gate-opening" : ""}`}>
          <div className="garden-arch" />
          <div className="garden-gate gate-left" />
          <div className="garden-gate gate-right" />
          <div className="garden-gate-light" />
        </div>

        {/* Fireflies */}
        <div className="garden-fireflies">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        {/* Garden plants */}
        <div className="garden-plants garden-plants-left">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="garden-plants garden-plants-right">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Main text */}
      <AnimatePresence>
        {!leaving && (
          <motion.div
            className="intro4-content"
            initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            transition={{ duration: 1.1 }}
          >
            <div className="intro4-eyebrow">
              <Sparkles size={13} />
              <span>A PLACE MADE WITH LOVE</span>
              <Sparkles size={13} />
            </div>

            <h1 className="intro4-title">
              A Little Garden
              <span>Just For You</span>
            </h1>

            <div className="intro4-divider">
              <span />
            </div>

            <div className="intro4-message">
              <p>I wanted to create a little place just for you...</p>
              <p>
                A place where every flower holds a beautiful thought,
                where every colour reminds me of your smile,
                and every little detail carries a piece of my heart.
              </p>
              <p>So, I made this little garden...</p>
              <p className="intro4-highlight">
                A little garden, made with you in my heart.
              </p>
            </div>

            <div className="intro4-signature">
              With love, just for you.
            </div>

            <button
              className="intro4-button"
              onClick={enterGarden}
              disabled={gateOpen}
            >
              <span>WALK INTO YOUR GARDEN</span>
              <ArrowRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening transition */}
      {leaving && <div className="intro4-transition" />}

    </section>
  );
}

export default IntroPage4;
