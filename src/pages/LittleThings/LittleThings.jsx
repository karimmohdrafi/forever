
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Sparkles, Star } from "lucide-react";
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

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const createButterflies = () =>
  Array.from({ length: 85 }, (_, index) => ({
    id: index,
    left: `${random(42, 58)}vw`,
    top: `${random(42, 58)}vh`,
    x1: `${random(-30, 30)}vw`,
    y1: `${random(-35, 35)}vh`,
    x2: `${random(-65, 65)}vw`,
    y2: `${random(-65, 65)}vh`,
    x3: `${random(-90, 90)}vw`,
    y3: `${random(-90, 90)}vh`,
    x4: `${random(-115, 115)}vw`,
    y4: `${random(-105, 105)}vh`,
    x5: `${random(-135, 135)}vw`,
    y5: `${random(-120, 120)}vh`,
    x6: `${random(-150, 150)}vw`,
    y6: `${random(-135, 135)}vh`,
    duration: `${random(8500, 15000)}ms`,
    delay: `${random(0, 2500)}ms`,
    size: `${random(17, 34)}px`,
    rotation: `${random(-45, 45)}deg`,
  }));

function LittleThings({ onNext, onContinue }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [jarBroken, setJarBroken] = useState(false);
  const [butterfliesFlying, setButterfliesFlying] = useState(false);

  const butterflies = useMemo(() => createButterflies(), []);

  const audioRef = useRef(null);
  const revealTimerRef = useRef(null);
  const butterflyTimerRef = useRef(null);
  const nextTimerRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const nextCallback = onNext || onContinue;

  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        left: `${random(0, 100)}%`,
        top: `${random(0, 100)}%`,
        delay: `${Math.random() * 4}s`,
      })),
    []
  );

  const dustParticles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${random(10, 90)}%`,
        top: `${random(10, 90)}%`,
        delay: `${Math.random() * 3}s`,
      })),
    []
  );

  // Background music and one-by-one quality reveal
  useEffect(() => {
    const audio = new Audio(MUSIC_PATH);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    audio.play().catch(() => {});

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
      clearInterval(fadeTimerRef.current);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  // Break the jar and release butterflies
  const handleJarClick = () => {
    if (visibleCount < qualities.length || jarBroken) return;

    setJarBroken(true);

    // Fade music smoothly
    if (audioRef.current) {
      const audio = audioRef.current;
      const startingVolume = audio.volume;
      const steps = 24;
      let currentStep = 0;

      fadeTimerRef.current = window.setInterval(() => {
        currentStep += 1;
        audio.volume = Math.max(
          0,
          startingVolume * (1 - currentStep / steps)
        );

        if (currentStep >= steps) {
          clearInterval(fadeTimerRef.current);
          audio.pause();
        }
      }, 45);
    }

    // Butterflies appear on the black screen
    butterflyTimerRef.current = window.setTimeout(() => {
      setButterfliesFlying(true);
    }, 500);

    // Move to the next page
    nextTimerRef.current = window.setTimeout(() => {
      nextCallback?.();
    }, 11000);
  };

  // Once the jar breaks, show ONLY the black butterfly screen
  if (jarBroken) {
    return (
      <section className="little-things-page lt-black-screen">
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
                  "--fly-rotation": butterfly.rotation,
                }}
              >
                🦋
              </span>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="little-things-page">
      {/* Background */}
      <div className="lt-background-glow lt-glow-one" />
      <div className="lt-background-glow lt-glow-two" />

      <div className="lt-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Header */}
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

      {/* Two-column content — also side by side on mobile */}
      <main className="lt-main-content">

        {/* LEFT: Seven qualities */}
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
                >
                  <span className="lt-quality-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="lt-quality-name">
                    {quality}
                  </span>

                  <span className="lt-quality-heart">
                    <Heart size={15} fill="currentColor" />
                  </span>
                </div>
              );
            })}
          </div>

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

          {visibleCount === qualities.length && (
            <div className="lt-final-message">
              <div className="lt-final-heart">
                <Heart size={17} fill="currentColor" />
              </div>

              {/* <p>
                These are just seven little things I adore about you.
                There are so many more reasons why you are special
                to me. Never stop being the beautiful person you are.
              </p> */}

              <h3>You are my favourite kind of magic.</h3>
            </div>
          )}
        </section>

        {/* RIGHT: Glass jar */}
        <section className="lt-jar-area">

          {visibleCount === qualities.length && (
            <button
              type="button"
              className="lt-break-prompt"
              onClick={handleJarClick}
            >
              <Sparkles size={14} />
              BREAK THE GLASS JAR, CUTIE
              <Sparkles size={14} />
            </button>
          )}

          <div className="lt-jar-caption">
            <Star size={13} />
            <span>A LITTLE JAR FULL OF MAGIC</span>
            <Star size={13} />
          </div>

          <div className="lt-jar-scene">
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

                <div className="lt-jar-lights">
                  {Array.from({ length: 7 }, (_, i) => (
                    <span
                      key={i}
                      className={i < visibleCount ? "lt-light-active" : ""}
                      style={{
                        "--light-delay": `${i * 0.25}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="lt-jar-heart">
                  <Heart size={35} fill="currentColor" />
                </div>

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
          </div>

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
        </section>
      </main>

      <footer className="lt-footer">
        <Sparkles size={12} />
        <span>MADE WITH LOVE</span>
        <Heart size={12} fill="currentColor" />
      </footer>
    </section>
  );
}

export default LittleThings;
