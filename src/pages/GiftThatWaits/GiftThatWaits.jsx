
import { useEffect, useRef, useState } from "react";
import "./GiftThatWaits.css";

// =====================================
// MUSIC
// =====================================

const GIFT_MUSIC = `${import.meta.env.BASE_URL}music/background-music5.mp3`;

// =====================================
// RANDOM BUTTERFLIES
// =====================================

const butterflies = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${7 + Math.random() * 9}s`,
  size: `${18 + Math.random() * 22}px`,
  driftX: `${-180 + Math.random() * 360}px`,
  driftY: `${-220 + Math.random() * 440}px`,
  rotation: `${Math.random() * 100 - 50}deg`,
}));

// =====================================
// BACKGROUND STARS
// =====================================

const stars = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${2 + Math.random() * 4}s`,
  size: `${2 + Math.random() * 4}px`,
}));

// =====================================
// FLOATING PARTICLES
// =====================================

const particles = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${5 + Math.random() * 8}s`,
}));

// =====================================
// MAIN COMPONENT
// =====================================

function GiftThatWaits({ onContinue }) {
  const audioRef = useRef(null);
  const openTimerRef = useRef(null);

  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showUnwrap, setShowUnwrap] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  // =====================================
  // BACKGROUND MUSIC
  // =====================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    audio.play().catch((error) => {
      console.warn("Gift music autoplay blocked:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // =====================================
  // UNWRAP BUTTON AFTER 5 SECONDS
  // =====================================

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUnwrap(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // =====================================
  // CONTINUE BUTTON AFTER 7 SECONDS
  // =====================================

  useEffect(() => {
    if (!opened) return;

    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [opened]);

  // =====================================
  // OPEN GIFT
  // =====================================

  const handleGiftClick = () => {
    if (opening || opened) return;

    setOpening(true);

    openTimerRef.current = setTimeout(() => {
      setOpened(true);
    }, 2300);
  };

  // =====================================
  // KEYBOARD SUPPORT
  // =====================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleGiftClick();
    }
  };

  // =====================================
  // CONTINUE
  // =====================================

  const handleContinue = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (typeof onContinue === "function") {
      onContinue();
    }
  };

  // =====================================
  // CLEANUP
  // =====================================

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  return (
    <main className={`gift-experience ${
      opening ? "gift-opening" : ""
    } ${opened ? "gift-opened" : ""}`}>

      {/* BACKGROUND MUSIC */}

      <audio
        ref={audioRef}
        src={GIFT_MUSIC}
        preload="auto"
        loop
      />

      {/* BACKGROUND */}

      <div className="gift-background" />

      <div className="gift-aurora gift-aurora-one" />
      <div className="gift-aurora gift-aurora-two" />
      <div className="gift-aurora gift-aurora-three" />

      {/* STARS */}

      <div className="gift-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="gift-star"
            style={{
              left: star.left,
              top: star.top,
              "--delay": star.delay,
              "--duration": star.duration,
              "--size": star.size,
            }}
          />
        ))}
      </div>

      {/* FLOATING PARTICLES */}

      <div className="gift-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="gift-particle"
            style={{
              left: particle.left,
              "--delay": particle.delay,
              "--duration": particle.duration,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* BUTTERFLY WORLD */}

      {opened && (
        <div className="butterfly-world">
          {butterflies.map((butterfly) => (
            <span
              key={butterfly.id}
              className="magic-butterfly"
              style={{
                left: butterfly.left,
                top: butterfly.top,
                "--delay": butterfly.delay,
                "--duration": butterfly.duration,
                "--size": butterfly.size,
                "--drift-x": butterfly.driftX,
                "--drift-y": butterfly.driftY,
                "--rotation": butterfly.rotation,
              }}
            >
              🦋
            </span>
          ))}
        </div>
      )}

      {/* HEADER */}

      <header className="gift-heading">
        <div className="gift-eyebrow">
          <span>✧</span>
          A LITTLE SURPRISE FOR YOU
          <span>✧</span>
        </div>

        <h1>
          The Gift That <span>Waits...</span>
        </h1>

        <p>
          Some beautiful things are waiting to be discovered.
        </p>

        <div className="gift-heading-line">
          <span />
          ♡
          <span />
        </div>
      </header>

      {/* GIFT STAGE */}

      <section className="gift-stage">

        {/* LIGHT RAYS */}

        <div className={`gift-light-rays ${
          opened ? "rays-active" : ""
        }`}>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              style={{ "--ray": `${i * 30}deg` }}
            />
          ))}
        </div>

        {/* MAGICAL GIFT */}

        <div className={`gift-assembly ${
          opening ? "gift-shaking" : ""
        } ${opened ? "gift-fully-opened" : ""}`}>

          <div className="gift-aura" />

          <div className="gift-inner-light" />

          <div className="gift-sparkle-explosion">
            {Array.from({ length: 24 }, (_, i) => (
              <span
                key={i}
                style={{
                  "--sparkle-angle": `${i * 15}deg`,
                  "--sparkle-distance": `${100 + (i % 4) * 35}px`,
                }}
              >
                ✦
              </span>
            ))}
          </div>

          {/* BOX */}

          <div
            className="gift-box"
            role="button"
            tabIndex={0}
            aria-label="Open your magical gift"
            onClick={handleGiftClick}
            onKeyDown={handleKeyDown}
          >

            {/* BOX BACK */}

            <div className="gift-box-back" />

            {/* BOX BODY */}

            <div className="gift-box-body">

              <div className="gift-box-front">

                <div className="gift-ribbon-vertical" />

                <div className="gift-ribbon-horizontal" />

                <div className="gift-box-emblem">
                  <span>♡</span>
                </div>

                <div className="gift-box-front-shine" />

              </div>

              <div className="gift-box-side" />

              <div className="gift-box-bottom" />

            </div>

            {/* BOX LID */}

            <div className="gift-lid">

              <div className="gift-lid-top">
                <div className="gift-lid-ribbon" />
                <span className="gift-lid-gem">✦</span>
              </div>

              <div className="gift-lid-front" />
              <div className="gift-lid-side" />

              {/* BOW */}

              <div className="gift-bow">
                <div className="bow-loop bow-left" />
                <div className="bow-loop bow-right" />
                <div className="bow-center" />
                <div className="bow-tail bow-tail-left" />
                <div className="bow-tail bow-tail-right" />
              </div>

            </div>

          </div>

          {/* SHADOW */}

          <div className="gift-ground-shadow" />

        </div>

        {/* FLOOR GLOW */}

        <div className="gift-floor-glow" />

        {/* CLICK HINT */}

        {!opening && !opened && (
          <div className="gift-click-hint">
            <span>✧</span>
            A little magic is waiting inside
            <span>✧</span>
          </div>
        )}

      </section>

      {/* BOTTOM CONTENT */}

      <section className="gift-bottom-content">

        {!opened ? (
          showUnwrap && (
            <button
              className="unwrap-button"
              onClick={handleGiftClick}
              disabled={opening}
            >
              <span className="unwrap-button-icon">✦</span>

              {opening
                ? "A LITTLE MAGIC IS UNFOLDING..."
                : "UNWRAP YOUR SURPRISE"}

              <span className="unwrap-button-arrow">→</span>
            </button>
          )
        ) : (
          <div className="gift-reveal-message">

            <div className="reveal-decoration">
              ✦ ♡ ✧ ♡ ✦
            </div>

            <h2>A Little Magic, Just For You</h2>

            <p>
              Because someone as special as you deserves
              a little extra magic.
            </p>

            {showContinue && (
              <button
                className="gift-continue"
                onClick={handleContinue}
              >
                <span>Continue the magic</span>
                <span className="continue-arrow">→</span>
              </button>
            )}

          </div>
        )}

      </section>

      {/* FOOTER */}

      <footer className="gift-footer">
        MADE WITH ENDLESS LOVE
        <span>♡</span>
      </footer>

    </main>
  );
}

export default GiftThatWaits;
