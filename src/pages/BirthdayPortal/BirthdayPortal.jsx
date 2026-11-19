
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  LockKeyhole,
  Unlock,
  ArrowRight,
  Star,
  Flower2,
} from "lucide-react";

import "./BirthdayPortal.css";

const CORRECT_PATTERN = [2, 5, 4, 7, 8];

const DOTS = [
  { id: 1, x: 50, y: 50 },
  { id: 2, x: 150, y: 50 },
  { id: 3, x: 250, y: 50 },
  { id: 4, x: 50, y: 150 },
  { id: 5, x: 150, y: 150 },
  { id: 6, x: 250, y: 150 },
  { id: 7, x: 50, y: 250 },
  { id: 8, x: 150, y: 250 },
  { id: 9, x: 250, y: 250 },
];

function PortalParticles() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 31.7) % 100}%`,
    top: `${(i * 47.3) % 100}%`,
    delay: `${(i % 7) * 0.6}s`,
    duration: `${5 + (i % 6)}s`,
    size: `${2 + (i % 3)}px`,
  }));

  return (
    <div className="portal-particles">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="portal-particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
}

function PortalDecorations() {
  return (
    <div className="portal-decorations">
      {["✦", "♡", "✧", "✿", "✦", "♡", "✧", "✿"].map(
        (item, index) => (
          <span
            key={index}
            className={`portal-decoration decoration-${index + 1}`}
          >
            {item}
          </span>
        )
      )}
    </div>
  );
}

function BirthdayPortal({ onUnlock, onBack }) {
  const [pattern, setPattern] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [opening, setOpening] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const patternRef = useRef([]);
  const drawingRef = useRef(false);
  const unlockedRef = useRef(false);
  const timerRef = useRef(null);
  const errorTimerRef = useRef(null);
  const clearTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(errorTimerRef.current);
      clearTimeout(clearTimerRef.current);
    };
  }, []);

  // Find the nearest dot to the pointer
  const findNearestDot = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 300;
    const y = ((event.clientY - rect.top) / rect.height) * 300;

    let nearest = null;
    let minDistance = 32;

    DOTS.forEach((dot) => {
      const distance = Math.sqrt(
        (dot.x - x) ** 2 + (dot.y - y) ** 2
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = dot.id;
      }
    });

    return nearest;
  };

  // Add selected dot
  const addDot = (dotId) => {
    if (!dotId || unlockedRef.current) return;

    if (patternRef.current.includes(dotId)) return;

    const updated = [...patternRef.current, dotId];

    patternRef.current = updated;
    setPattern(updated);
    setError("");
  };

  // Start drawing
  const handlePointerDown = (event) => {
    if (unlockedRef.current) return;

    clearTimeout(clearTimerRef.current);
    clearTimeout(errorTimerRef.current);

    const dot = findNearestDot(event);

    if (!dot) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    patternRef.current = [];
    setPattern([]);

    setError("");
    setShake(false);
    setSuccess(false);

    drawingRef.current = true;
    setDrawing(true);

    addDot(dot);
  };

  // Move across dots
  const handlePointerMove = (event) => {
    if (!drawingRef.current || unlockedRef.current) return;

    const dot = findNearestDot(event);

    if (dot) {
      addDot(dot);
    }
  };

  // Check pattern
  const handlePointerUp = () => {
    if (!drawingRef.current) return;

    drawingRef.current = false;
    setDrawing(false);

    const enteredPattern = [...patternRef.current];

    if (enteredPattern.length === 0) return;

    const correct =
      enteredPattern.length === CORRECT_PATTERN.length &&
      enteredPattern.every(
        (value, index) => value === CORRECT_PATTERN[index]
      );

    if (correct) {
      handleCorrectPattern();
    } else {
      handleWrongPattern();
    }
  };

  // Wrong pattern
  const handleWrongPattern = () => {
    setError("Oops! Wrong pattern. Try again ♡");
    setShake(true);

    errorTimerRef.current = setTimeout(() => {
      setShake(false);
      setError("");
      patternRef.current = [];
      setPattern([]);
    }, 1100);
  };

  // Correct pattern
  const handleCorrectPattern = () => {
    unlockedRef.current = true;

    setError("");
    setSuccess(true);
    setUnlocked(true);

    timerRef.current = setTimeout(() => {
      setOpening(true);

      timerRef.current = setTimeout(() => {
        if (typeof onUnlock === "function") {
          onUnlock();
        } else {
          console.error(
            "onUnlock callback missing. Check App.jsx."
          );
        }
      }, 2800);
    }, 1500);
  };

  return (
    <main
      className={`birthday-portal ${
        opening ? "portal-opening" : ""
      }`}
    >
      <div className="portal-background" />
      <div className="portal-background-glow" />

      <PortalParticles />
      <PortalDecorations />

      <div className="portal-corner portal-corner-tl">✧</div>
      <div className="portal-corner portal-corner-tr">✧</div>
      <div className="portal-corner portal-corner-bl">♡</div>
      <div className="portal-corner portal-corner-br">♡</div>

      <motion.div
        className="portal-main"
        initial={{ opacity: 0, y: 35 }}
        animate={{
          opacity: opening ? 0 : 1,
          y: 0,
          scale: opening ? 1.15 : 1,
        }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="portal-top-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Sparkles size={14} />
          <span>A LITTLE MAGIC AWAITS YOU</span>
          <Sparkles size={14} />
        </motion.div>

        {/* PORTAL VISUAL */}

        <div
          className={`portal-visual ${
            unlocked ? "portal-unlocked" : ""
          }`}
        >
          <div className="portal-outer-glow" />

          <div className="portal-orbit orbit-one" />
          <div className="portal-orbit orbit-two" />
          <div className="portal-orbit orbit-three" />

          <div className="portal-orbit-star star-one">✦</div>
          <div className="portal-orbit-star star-two">✧</div>
          <div className="portal-orbit-star star-three">♡</div>
          <div className="portal-orbit-star star-four">✦</div>

          <motion.div
            className="portal-ring"
            animate={
              unlocked
                ? { scale: [1, 1.06, 1.12] }
                : { scale: [1, 1.025, 1] }
            }
            transition={
              unlocked
                ? { duration: 1.8, ease: "easeInOut" }
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <div className="portal-ring-inner">
              <div className="portal-center">
                <motion.div
                  className="portal-heart"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Heart size={38} fill="currentColor" />
                </motion.div>

                <span className="portal-center-text">HER</span>
                <span className="portal-center-title">
                  Birthday
                </span>
                <span className="portal-center-subtitle">
                  UNIVERSE
                </span>
              </div>
            </div>
          </motion.div>

          <div className="portal-ground-glow" />
        </div>

        {/* LOCK CONTENT */}

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="locked"
              className="portal-content"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
            >
              <p className="portal-eyebrow">
                YOUR MAGIC MOMENT STARTS HERE
              </p>

              <h1 className="portal-heading">
                A Birthday
                <span> Portal </span>
              </h1>

              <p className="portal-description">
                Every beautiful story has a special beginning.
                Draw the secret pattern to unlock a little
                universe created just for you.
              </p>

              <div
                className={`birthday-form ${
                  shake ? "form-shake" : ""
                } ${success ? "pattern-success" : ""}`}
              >
                <label className="birthday-label">
                  DRAW YOUR SECRET PATTERN
                </label>

                <p className="pattern-instruction">
                  Connect the glowing dots in the correct order
                </p>

                {/* PATTERN LOCK */}

                <div
                  className={`pattern-lock ${
                    drawing ? "is-drawing" : ""
                  }`}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <svg
                    className="pattern-lines"
                    viewBox="0 0 300 300"
                  >
                    {pattern.length > 1 && (
                      <polyline
                        points={pattern
                          .map((id) => {
                            const dot = DOTS.find(
                              (item) => item.id === id
                            );
                            return `${dot.x},${dot.y}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>

                  {DOTS.map((dot) => (
                    <div
                      key={dot.id}
                      className={`pattern-dot ${
                        pattern.includes(dot.id)
                          ? "dot-selected"
                          : ""
                      }`}
                      style={{
                        left: `${(dot.x / 300) * 100}%`,
                        top: `${(dot.y / 300) * 100}%`,
                      }}
                    >
                      <span className="dot-core" />
                      {pattern.includes(dot.id) && (
                        <span className="dot-pulse" />
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {error ? (
                    <motion.p
                      key="error"
                      className="portal-error"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {error}
                    </motion.p>
                  ) : success ? (
                    <motion.p
                      key="success"
                      className="portal-success-message"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Perfect! Your universe is unlocking ♡
                    </motion.p>
                  ) : (
                    <motion.p
                      key="hint"
                      className="pattern-hint"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <LockKeyhole size={13} />
                      Your secret is waiting...
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="portal-bottom-note">
                  <Star size={12} />
                  <span>A LITTLE SECRET MADE WITH LOVE</span>
                  <Star size={12} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              className="portal-success"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <Unlock
                size={30}
                className="success-unlock-icon"
              />

              <h2>
                The Universe
                <span> Is Yours!</span>
              </h2>

              <p>
                A beautiful journey is waiting for you.
              </p>

              <div className="success-hearts">
                <Heart fill="currentColor" />
                <Sparkles />
                <Heart fill="currentColor" />
              </div>

              <span className="success-opening-text">
                OPENING YOUR MAGICAL WORLD...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* OPENING FLASH */}

      <AnimatePresence>
        {opening && (
          <motion.div
            className="portal-opening-flash"
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.1, 3, 8],
            }}
            transition={{ duration: 2.5 }}
          />
        )}
      </AnimatePresence>

      {/* BACK BUTTON */}

      {onBack && !unlocked && (
        <button
          className="portal-back-button"
          onClick={onBack}
          type="button"
        >
          <ArrowRight size={14} />
          BACK
        </button>
      )}

      <div className="portal-footer">
        <Flower2 size={13} />
        <span>HER UNIVERSE · MADE WITH LOVE</span>
        <Flower2 size={13} />
      </div>
    </main>
  );
}

export default BirthdayPortal;
