
import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Heart, Star } from "lucide-react";
import "./LittleThings.css";

const MUSIC = `${import.meta.env.BASE_URL}music/background-music10.mp3`;

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

const butterflies = Array.from({ length: 85 }, (_, index) => ({
  id: index,
  left: `${random(8, 92)}%`,
  top: `${random(35, 85)}%`,
  x1: `${random(-35, 35)}vw`,
  y1: `${random(-35, -8)}vh`,
  x2: `${random(-60, 60)}vw`,
  y2: `${random(-75, -25)}vh`,
  x3: `${random(-85, 85)}vw`,
  y3: `${random(-100, -45)}vh`,
  x4: `${random(-100, 100)}vw`,
  y4: `${random(-110, -55)}vh`,
  duration: `${random(5, 9)}s`,
  delay: `${Math.random() * 1.4}s`,
  size: `${random(15, 29)}px`,
  rotation: `${random(-70, 70)}deg`,
  scale: (Math.random() * 0.65 + 0.65).toFixed(2),
}));

function LittleThings({ onNext, onContinue }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [jarBroken, setJarBroken] = useState(false);
  const [butterfliesFlying, setButterfliesFlying] = useState(false);

  const audioRef = useRef(null);
  const revealTimerRef = useRef(null);
  const nextTimerRef = useRef(null);
  const butterflyTimerRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(MUSIC);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    audio.play().catch(() => {
      // Browser autoplay may require user interaction.
    });

    let count = 0;

    revealTimerRef.current = setInterval(() => {
      count += 1;
      setVisibleCount(count);

      if (count >= qualities.length) {
        clearInterval(revealTimerRef.current);
      }
    }, 1700);

    return () => {
      clearInterval(revealTimerRef.current);
      clearTimeout(nextTimerRef.current);
      clearTimeout(butterflyTimerRef.current);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleJarClick = () => {
    if (visibleCount !== qualities.length || jarBroken) return;

    setJarBroken(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.18;
    }

    butterflyTimerRef.current = setTimeout(() => {
      setButterfliesFlying(true);
    }, 450);

    nextTimerRef.current = setTimeout(() => {
      (onNext || onContinue)?.();
    }, 8500);
  };

  return (
    <main className="little-things-page">
      <div className="lt-background-glow lt-glow-one" />
      <div className="lt-background-glow lt-glow-two" />

      <div className="lt-stars">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              animationDelay: `${(i % 7) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <header className="lt-heading">
        <span className="lt-eyebrow">
          <Sparkles size={14} />
          A FEW THINGS I ADORE
          <Sparkles size={14} />
        </span>

        <h1>
          The Little <span>Things</span>
        </h1>

        <p>It's the little things about you that mean the most to me.</p>
      </header>

      <section className="lt-main-content">
        <div className="lt-qualities-panel">
          <div className="lt-panel-heading">
            <Heart size={17} />
            <span>Seven little reasons</span>
          </div>

          <div className="lt-quality-list">
            {qualities.map((quality, index) => (
              <div
                className={`lt-quality ${
                  index < visibleCount ? "lt-quality-visible" : ""
                }`}
                key={quality}
              >
                <span className="lt-quality-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="lt-quality-name">{quality}</span>

                <span className="lt-quality-heart">
                  <Heart size={15} fill="currentColor" />
                </span>
              </div>
            ))}
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
        </div>

        <div className="lt-jar-area">
          <div className="lt-jar-caption">
            <Star size={14} />
            <span>A LITTLE JAR FULL OF MAGIC</span>
            <Star size={14} />
          </div>

          <div className={`lt-jar-scene ${jarBroken ? "lt-jar-shattered" : ""}`}>
            <div className="lt-jar-sparkles">
              {Array.from({ length: 12 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    "--spark-x": `${random(-115, 115)}px`,
                    "--spark-y": `${random(-130, 80)}px`,
                    animationDelay: `${i * 0.13}s`,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              className="lt-jar-button"
              onClick={handleJarClick}
              disabled={visibleCount !== qualities.length || jarBroken}
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
                  {qualities.map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < visibleCount ? "lt-light-active" : ""
                      }
                      style={{
                        "--light-delay": `${index * 0.12}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="lt-jar-heart">
                  <Heart size={34} fill="currentColor" />
                </div>

                <div className="lt-jar-dust">
                  {Array.from({ length: 18 }, (_, i) => (
                    <i
                      key={i}
                      style={{
                        left: `${(i * 29 + 8) % 90}%`,
                        top: `${(i * 41 + 12) % 85}%`,
                        animationDelay: `${(i % 6) * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="lt-jar-base" />
            </button>

            {jarBroken && (
              <div className="lt-glass-pieces">
                {Array.from({ length: 13 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      "--piece-x": `${random(-180, 180)}px`,
                      "--piece-y": `${random(-160, 180)}px`,
                      "--piece-rotate": `${random(-260, 260)}deg`,
                      animationDelay: `${Math.random() * 0.25}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="lt-jar-instruction">
            {visibleCount === qualities.length && !jarBroken ? (
              <button
                className="lt-break-prompt"
                onClick={handleJarClick}
                type="button"
              >
                <Sparkles size={15} />
                BREAK THE GLASS JAR, CUTIE
                <Sparkles size={15} />
              </button>
            ) : jarBroken ? (
              <p className="lt-butterfly-message">
                A little magic, just for you...
              </p>
            ) : (
              <p className="lt-wait-message">
                Let the little things unfold...
              </p>
            )}
          </div>
        </div>
      </section>

      {butterfliesFlying && (
        <div className="lt-butterfly-layer">
          {butterflies.map((butterfly) => (
            <span
              className="lt-flying-butterfly"
              key={butterfly.id}
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
                "--fly-duration": butterfly.duration,
                "--fly-delay": butterfly.delay,
                "--fly-size": butterfly.size,
                "--fly-rotation": butterfly.rotation,
                "--fly-scale": butterfly.scale,
              }}
            >
              🦋
            </span>
          ))}
        </div>
      )}

      <footer className="lt-footer">
        <span>MADE WITH</span>
        <Heart size={12} fill="currentColor" />
        <span>JUST FOR YOU</span>
      </footer>
    </main>
  );
}

export default LittleThings;
