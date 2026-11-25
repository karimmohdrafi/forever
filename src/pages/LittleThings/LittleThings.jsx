
import React, { useEffect, useRef, useState } from "react";
import { Heart, Sparkles, Star, Gift } from "lucide-react";
import "./LittleThings.css";

const MUSIC_PATH = `${import.meta.env.BASE_URL}music/background-music10.mp3`;

const qualities = [
  "Your Cute Anger",
  "The Way You Care",
  'Your Calling Me "OY"',
  "Your Beautiful Smile",
  "Your Supportiveness",
  "Your Silly Talks",
  "Your Little Expressions",
];

const butterflyColors = [
  "🦋",
  "🦋",
  "🦋",
  "🦋",
  "🦋",
  "🦋",
  "🦋",
];

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createButterflies = () =>
  Array.from({ length: 85 }, (_, index) => {
    const direction = Math.random() > 0.5 ? 1 : -1;

    return {
      id: index,
      emoji: butterflyColors[index % butterflyColors.length],

      // Butterflies begin around the jar area
      left: `${random(55, 72)}vw`,
      top: `${random(43, 65)}vh`,

      // Random curved flight path
      x1: `${random(-35, 35)}vw`,
      y1: `${random(-35, 35)}vh`,

      x2: `${random(-65, 65)}vw`,
      y2: `${random(-60, 60)}vh`,

      x3: `${random(-90, 90)}vw`,
      y3: `${random(-85, 85)}vh`,

      x4: `${random(-110, 110)}vw`,
      y4: `${random(-100, 100)}vh`,

      x5: `${random(-125, 125)}vw`,
      y5: `${random(-110, 110)}vh`,

      x6: `${random(-140, 140)}vw`,
      y6: `${random(-120, 120)}vh`,

      duration: `${random(7500, 12500)}ms`,
      delay: `${random(0, 1800)}ms`,
      size: `${random(17, 34)}px`,
      scale: (Math.random() * 0.7 + 0.7).toFixed(2),
      rotation: `${random(-50, 50) * direction}deg`,
    };
  });

function LittleThings({ onNext, onContinue }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [jarBroken, setJarBroken] = useState(false);
  const [butterfliesFlying, setButterfliesFlying] = useState(false);

  const [butterflies] = useState(createButterflies);

  const audioRef = useRef(null);
  const revealTimerRef = useRef(null);
  const butterflyTimerRef = useRef(null);
  const nextTimerRef = useRef(null);

  const nextCallback = onNext || onContinue;

  // =====================================
  // BACKGROUND MUSIC + QUALITY REVEAL
  // =====================================

  useEffect(() => {
    const audio = new Audio(MUSIC_PATH);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Browser may block autoplay until user interaction.
    });

    let count = 0;

    revealTimerRef.current = window.setInterval(() => {
      count += 1;
      setVisibleCount(count);

      if (count >= qualities.length) {
        clearInterval(revealTimerRef.current);
      }
    }, 1700);

    return () => {
      clearInterval(revealTimerRef.current);
      clearTimeout(butterflyTimerRef.current);
      clearTimeout(nextTimerRef.current);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // =====================================
  // GLASS JAR BREAK
  // =====================================

  const handleJarClick = () => {
    if (visibleCount < qualities.length || jarBroken) return;

    setJarBroken(true);

    // Slowly fade music
    if (audioRef.current) {
      const audio = audioRef.current;

      const fadeDuration = 900;
      const steps = 18;
      const volumeStep = audio.volume / steps;
      let currentStep = 0;

      const fade = window.setInterval(() => {
        currentStep += 1;
        audio.volume = Math.max(
          0,
          0.35 - volumeStep * currentStep
        );

        if (currentStep >= steps) {
          clearInterval(fade);
          audio.pause();
        }
      }, fadeDuration / steps);
    }

    // Release butterflies after glass-breaking effect
    butterflyTimerRef.current = window.setTimeout(() => {
      setButterfliesFlying(true);
    }, 450);

    // Continue to next step
    nextTimerRef.current = window.setTimeout(() => {
      nextCallback?.();
    }, 10500);
  };

  // =====================================
  // RANDOM JAR DUST
  // =====================================

  const dustParticles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${random(10, 90)}%`,
    top: `${random(10, 90)}%`,
    delay: `${Math.random() * 3}s`,
  }));

  const glassPieces = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${random(-180, 180)}px`,
    y: `${random(-180, 180)}px`,
    rotate: `${random(-240, 240)}deg`,
    delay: `${Math.random() * 0.25}s`,
  }));

  // =====================================
  // RENDER
  // =====================================

  return (
    <section
      className={`little-things-page ${
        jarBroken ? "lt-after-break" : ""
      }`}
    >
      {/* Background decorations */}
      {!jarBroken && (
        <>
          <div className="lt-background-glow lt-glow-one" />
          <div className="lt-background-glow lt-glow-two" />

          <div className="lt-stars">
            {Array.from({ length: 45 }, (_, i) => (
              <span
                key={i}
                style={{
                  left: `${random(0, 100)}%`,
                  top: `${random(0, 100)}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* =================================
          HEADER
      ================================= */}

      <header className="lt-heading">
        <div className="lt-eyebrow">
          <Sparkles size={13} />
          <span>A COLLECTION OF LITTLE MAGIC</span>
          <Sparkles size={13} />
        </div>

        <h1>
          The Little <span>Things</span>
        </h1>

        <p>
          Little things about you that mean the world to me...
        </p>
      </header>

      {/* =================================
          MAIN CONTENT
      ================================= */}

      <main className="lt-main-content">

        {/* LEFT — SEVEN QUALITIES */}

        <section className="lt-qualities-panel">
          <div className="lt-panel-heading">
            <Heart size={18} />
            <span>Seven Little Things I Adore</span>
          </div>

          <div className="lt-quality-list">
            {qualities.map((quality, index) => {
              const isVisible = index < visibleCount;

              return (
                <div
                  key={index}
                  className={`lt-quality ${
                    isVisible ? "lt-quality-visible" : ""
                  }`}
                  style={{
                    transitionDelay: isVisible ? "0s" : "0s",
                  }}
                >
                  <span className="lt-quality-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="lt-quality-name">
                    {quality}
                  </span>

                  <span className="lt-quality-heart">
                    <Heart size={16} fill="currentColor" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress */}

          <div className="lt-progress">
            <div className="lt-progress-track">
              <span
                className="lt-progress-fill"
                style={{
                  width: `${(visibleCount / qualities.length) * 100}%`,
                }}
              />
            </div>

            <span className="lt-progress-count">
              {visibleCount} / 7
            </span>
          </div>

          {/* Final message after all qualities */}

          {visibleCount === qualities.length && (
            <div className="lt-final-message">
              <div className="lt-final-heart">
                <Heart size={18} fill="currentColor" />
              </div>

              <p>
                These are just seven little things I adore about you.
                There are so many more reasons why you are special
                to me. Never stop being the beautiful person you are.
              </p>

              <h3>
                You are my favourite kind of magic.
              </h3>
            </div>
          )}
        </section>

        {/* RIGHT — GLASS JAR */}

        <section className="lt-jar-area">

          {/* Break prompt above jar */}

          {visibleCount === qualities.length && !jarBroken && (
            <button
              type="button"
              className="lt-break-prompt"
              onClick={handleJarClick}
            >
              <Sparkles size={15} />
              BREAK THE GLASS JAR, CUTIE
              <Sparkles size={15} />
            </button>
          )}

          <div className="lt-jar-caption">
            <Star size={13} />
            <span>A LITTLE JAR FULL OF MAGIC</span>
            <Star size={13} />
          </div>

          {/* Jar scene */}

          <div
            className={`lt-jar-scene ${
              jarBroken ? "lt-jar-shattered" : ""
            }`}
          >
            {!jarBroken && (
              <button
                type="button"
                className="lt-jar-button"
                onClick={handleJarClick}
                disabled={visibleCount < qualities.length}
                aria-label="Break the glass jar"
              >
                <div className="lt-jar-lid">
                  <span />
                </div>

                <div className="lt-jar-neck" />

                <div className="lt-jar-body">
                  <div className="lt-jar-shine" />
                  <div className="lt-jar-shine-small" />
                  <div className="lt-jar-inner-glow" />

                  {/* Lights */}
                  <div className="lt-jar-lights">
                    {Array.from({ length: 7 }, (_, i) => (
                      <span
                        key={i}
                        className={
                          i < visibleCount ? "lt-light-active" : ""
                        }
                        style={{
                          "--light-delay": `${i * 0.25}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Heart */}
                  <div className="lt-jar-heart">
                    <Heart size={35} fill="currentColor" />
                  </div>

                  {/* Dust */}
                  <div className="lt-jar-dust">
                    {dustParticles.map((particle) => (
                      <i
                        key={particle.id}
                        style={{
                          left: particle.left,
                          top: particle.top,
                          animationDelay: particle.delay,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="lt-jar-base" />

                <div className="lt-jar-sparkles">
                  {Array.from({ length: 9 }, (_, i) => (
                    <i
                      key={i}
                      style={{
                        "--spark-x": `${random(-100, 100)}px`,
                        "--spark-y": `${random(-100, 100)}px`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>
              </button>
            )}

            {/* Glass shards */}

            {jarBroken && (
              <div className="lt-glass-pieces">
                {glassPieces.map((piece) => (
                  <span
                    key={piece.id}
                    style={{
                      "--piece-x": piece.x,
                      "--piece-y": piece.y,
                      "--piece-rotate": piece.rotate,
                      animationDelay: piece.delay,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Jar instruction */}

          {!jarBroken && (
            <div className="lt-jar-instruction">
              {visibleCount < qualities.length ? (
                <p className="lt-wait-message">
                  Let the little things unfold...
                </p>
              ) : (
                <p className="lt-ready-message">
                  Every little light holds a piece of my heart.
                </p>
              )}
            </div>
          )}
        </section>
      </main>

      {/* =================================
          FOOTER
      ================================= */}

      <footer className="lt-footer">
        <Sparkles size={12} />
        <span>MADE WITH LOVE</span>
        <Heart size={12} fill="currentColor" />
      </footer>

      {/* =================================
          BLACK SCREEN BUTTERFLY RELEASE
      ================================= */}

      {butterfliesFlying && (
        <div className="lt-butterfly-layer">
          {butterflies.map((butterfly) => (
            <span
              key={butterfly.id}
              className="lt-flying-butterfly"
              style={{
                left: butterfly.left,
                top: butterfly.top,

                "--fly-x1": butterfly.x1,
                "--fly-y1": butterfly.y1,

                "--fly-x2": butterfly.x2,
                "--fly-y2": butterfly.y2,

                "--fly-x3": butterfly.x3,
                "--fly-y3": butterfly.y3,

                "--fly-x4": butterfly.x4,
                "--fly-y4": butterfly.y4,

                "--fly-x5": butterfly.x5,
                "--fly-y5": butterfly.y5,

                "--fly-x6": butterfly.x6,
                "--fly-y6": butterfly.y6,

                "--fly-duration": butterfly.duration,
                "--fly-delay": butterfly.delay,
                "--fly-size": butterfly.size,
                "--fly-scale": butterfly.scale,
                "--fly-rotation": butterfly.rotation,
              }}
            >
              {butterfly.emoji}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export default LittleThings;
