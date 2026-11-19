
import React, { useEffect, useRef, useState } from "react";
import "./LittleThings.css";

const MUSIC_PATH = `${import.meta.env.BASE_URL}music/background-music10.mp3`;

const memories = [
  "Your Cute Anger",
  "The Way You Care",
  'Your Calling Me "OY"',
  "Your Beautiful Smile",
  "Your Supportiveness",
  "Your Silly Talks",
  "Your Little Expressions",
];

// 100 butterflies with random flight paths
const butterflies = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  startX: `${18 + Math.random() * 24}%`,
  startY: `${35 + Math.random() * 30}%`,
  midX: `${(Math.random() - 0.5) * 35}vw`,
  midY: `${(Math.random() - 0.5) * 45}vh`,
  flyX: `${(Math.random() - 0.35) * 95}vw`,
  flyY: `${(Math.random() - 0.5) * 115}vh`,
  rotate: `${Math.random() * 900 - 450}deg`,
  duration: `${5.2 + Math.random() * 1.1}s`,
  delay: `${Math.random() * 0.3}s`,
  size: `${13 + Math.random() * 17}px`,
}));

function LittleThings({ onNext }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [jarBroken, setJarBroken] = useState(false);
  const [butterfliesFlying, setButterfliesFlying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const promptTimerRef = useRef(null);
  const breakTimerRef = useRef(null);
  const navigationRef = useRef(null);
  const startedRef = useRef(false);

  // BACKGROUND MUSIC
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    audio.play().catch((error) => {
      console.log("Music autoplay blocked by browser:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Reveal seven memories one by one
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisibleCount((previous) => {
        if (previous >= memories.length) {
          clearInterval(timerRef.current);
          return memories.length;
        }

        return previous + 1;
      });
    }, 1600);

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(promptTimerRef.current);
      clearTimeout(breakTimerRef.current);
      clearTimeout(navigationRef.current);
    };
  }, []);

  // Show jar prompt after all memories appear
  useEffect(() => {
    if (visibleCount === memories.length) {
      promptTimerRef.current = setTimeout(() => {
        setShowPrompt(true);
      }, 1000);
    }
  }, [visibleCount]);

  // GLASS JAR BLAST
  const handleJarClick = () => {
    if (
      visibleCount !== memories.length ||
      jarBroken ||
      startedRef.current
    ) {
      return;
    }

    startedRef.current = true;
    setShowPrompt(false);
    setJarBroken(true);

    // Butterflies release shortly after jar blast
    breakTimerRef.current = setTimeout(() => {
      setButterfliesFlying(true);
    }, 350);

    // Continue after the magical reveal
    navigationRef.current = setTimeout(() => {
      if (typeof onNext === "function") {
        onNext();
      }
    }, 7000);
  };

  return (
    <section
      className={`little-things-page ${
        jarBroken ? "magic-mode" : ""
      }`}
    >
      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src={MUSIC_PATH}
        loop
        preload="auto"
      />

      {/* BACKGROUND */}
      <div className="little-things-stars" />
      <div className="little-things-glow glow-one" />
      <div className="little-things-glow glow-two" />

      {/* HEADING */}
      <header className="little-things-heading">
        <span className="little-eyebrow">
          A COLLECTION OF LITTLE MEMORIES
        </span>

        <h1>The Little Things</h1>

        <p>
          Every little thing about you makes you special to me...
        </p>
      </header>

      <main className="little-things-content">

        {/* LEFT SIDE - GLASS JAR */}
        <div className="jar-side">
          <div className="jar-aura" />

          <button
            type="button"
            className={`memory-jar ${
              visibleCount === memories.length ? "jar-complete" : ""
            } ${jarBroken ? "jar-shattered" : ""}`}
            onClick={handleJarClick}
            disabled={visibleCount !== memories.length || jarBroken}
            aria-label="Click the glass jar to see the magic"
          >
            <div className="jar-lid" />
            <div className="jar-neck" />

            <div className="jar-body">
              <div className="jar-glass-shine" />
              <div className="jar-glass-reflection" />

              <div className="jar-lights">
                {memories.map((memory, index) => (
                  <span
                    key={index}
                    className={`jar-light ${
                      index < visibleCount ? "light-on" : ""
                    }`}
                    style={{ "--light-index": index }}
                  />
                ))}
              </div>

              <div className="jar-bottom-shine" />
            </div>

            <div className="jar-base-shadow" />

            {jarBroken && (
              <div className="jar-glass-shards">
                {Array.from({ length: 14 }, (_, index) => (
                  <span
                    key={index}
                    className={`glass-shard shard-${index + 1}`}
                  />
                ))}
              </div>
            )}
          </button>

          <div className="jar-caption">
            <span className="jar-caption-line" />
            <span>A JAR FULL OF YOU</span>
            <span className="jar-caption-line" />
          </div>

          {showPrompt && !jarBroken && (
            <div className="jar-click-prompt">
              <span className="prompt-sparkle">✧</span>
              Click the glass jar to see the magic
              <span className="prompt-sparkle">✧</span>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - SEVEN MEMORIES */}
        <div className="memories-side">
          <div className="memories-intro">
            <span className="memories-small-title">
              THINGS I ADORE
            </span>

            <h2>It's the little things...</h2>

            <p>
              The tiny moments, the little habits, and all the things
              that make you, YOU.
            </p>
          </div>

          <div className="memory-list">
            {memories.map((memory, index) => (
              <div
                key={index}
                className={`memory-item ${
                  index < visibleCount ? "memory-visible" : ""
                }`}
              >
                <span className="memory-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="memory-text">{memory}</span>

                <span className="memory-heart">♡</span>
              </div>
            ))}
          </div>

          <div className="memory-progress">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(visibleCount / memories.length) * 100}%`,
                }}
              />
            </div>

            <span>
              {String(visibleCount).padStart(2, "0")} /{" "}
              {String(memories.length).padStart(2, "0")} little things
            </span>
          </div>
        </div>
      </main>

      {/* BUTTERFLY RELEASE */}
      {butterfliesFlying && (
        <div className="butterfly-explosion">
          {butterflies.map((butterfly) => (
            <span
              key={butterfly.id}
              className="flying-butterfly"
              style={{
                "--start-x": butterfly.startX,
                "--start-y": butterfly.startY,
                "--mid-x": butterfly.midX,
                "--mid-y": butterfly.midY,
                "--fly-x": butterfly.flyX,
                "--fly-y": butterfly.flyY,
                "--fly-rotate": butterfly.rotate,
                "--fly-duration": butterfly.duration,
                "--fly-delay": butterfly.delay,
                "--butterfly-size": butterfly.size,
              }}
            >
              🦋
            </span>
          ))}
        </div>
      )}

      {/* FINAL MAGIC MESSAGE */}
      {jarBroken && (
        <div className="magic-message">
          <span className="magic-message-heart">♡</span>

          <h1>All my little things about you...</h1>

          <span className="magic-message-subtitle">
            Every little detail makes you unforgettable
          </span>

          <span className="magic-message-bottom-heart">✧</span>
        </div>
      )}
    </section>
  );
}

export default LittleThings;
