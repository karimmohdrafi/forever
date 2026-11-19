
import { useEffect, useRef, useState } from "react";
import "./BirthdayCountdown.css";

// =====================================
// MUSIC FILES
// =====================================

const COUNTDOWN_MUSIC = `${import.meta.env.BASE_URL}music/background-music3.mp3`;
const CELEBRATION_MUSIC = `${import.meta.env.BASE_URL}music/background-music4.mp3`;

// =====================================
// BACKGROUND ANIMATIONS
// =====================================

const fireworks = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  side: i % 2 === 0 ? "left" : "right",
  delay: `${(i % 5) * 0.45}s`,
  x: `${15 + ((i * 17) % 70)}%`,
}));

const stars = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  left: `${(i * 47) % 100}%`,
  top: `${(i * 31) % 100}%`,
  delay: `${(i % 7) * 0.4}s`,
}));

const petals = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  delay: `${(i % 10) * 0.7}s`,
  duration: `${6 + (i % 5)}s`,
}));

// =====================================
// MAIN COMPONENT
// =====================================

function BirthdayCountdown({ onContinue }) {
  const countdownAudioRef = useRef(null);
  const celebrationAudioRef = useRef(null);

  const [count, setCount] = useState(10);
  const [celebrationStarted, setCelebrationStarted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  // =====================================
  // MUSIC CONTROL
  // Countdown song -> Celebration song
  // =====================================

  useEffect(() => {
    const countdownAudio = countdownAudioRef.current;
    const celebrationAudio = celebrationAudioRef.current;

    const playAudio = async (audio, label) => {
      if (!audio) return;

      try {
        await audio.play();
        console.log(`${label} music started`);
      } catch (error) {
        console.warn(`${label} music autoplay blocked:`, error);
      }
    };

    if (!celebrationStarted) {
      if (celebrationAudio) {
        celebrationAudio.pause();
        celebrationAudio.currentTime = 0;
      }

      if (countdownAudio) {
        countdownAudio.loop = true;
        countdownAudio.volume = 0.4;
        playAudio(countdownAudio, "Countdown");
      }
    } else {
      if (countdownAudio) {
        countdownAudio.pause();
        countdownAudio.currentTime = 0;
      }

      if (celebrationAudio) {
        celebrationAudio.loop = true;
        celebrationAudio.volume = 0.45;
        playAudio(celebrationAudio, "Celebration");
      }
    }

    return () => {
      if (countdownAudio) {
        countdownAudio.pause();
      }

      if (celebrationAudio) {
        celebrationAudio.pause();
      }
    };
  }, [celebrationStarted]);

  // =====================================
  // TEN SECOND COUNTDOWN
  // =====================================

  useEffect(() => {
    if (celebrationStarted) return;

    if (count === 0) {
      const timer = setTimeout(() => {
        setCelebrationStarted(true);
      }, 700);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCount((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, celebrationStarted]);

  // =====================================
  // BIRTHDAY REVEAL SEQUENCE
  // =====================================

  useEffect(() => {
    if (!celebrationStarted) return;

    // Birthday message appears after 1 second
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    // Continue button appears after 7 seconds
    const continueTimer = setTimeout(() => {
      setShowContinue(true);
    }, 7000);

    // Candles go out after 7.5 seconds
    const candleTimer = setTimeout(() => {
      setCandlesBlown(true);
    }, 7500);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(continueTimer);
      clearTimeout(candleTimer);
    };
  }, [celebrationStarted]);

  // =====================================
  // CONTINUE BUTTON
  // =====================================

  const handleContinue = () => {
    // Stop both songs before leaving this page
    [countdownAudioRef, celebrationAudioRef].forEach((audioRef) => {
      const audio = audioRef.current;

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (typeof onContinue === "function") {
      onContinue();
    }
  };

  return (
    <main
      className={`birthday-countdown ${
        celebrationStarted ? "celebration-mode" : "countdown-mode"
      }`}
    >
      {/* TWO SEPARATE MUSIC TRACKS */}

      <audio
        ref={countdownAudioRef}
        src={COUNTDOWN_MUSIC}
        preload="auto"
        loop
      />

      <audio
        ref={celebrationAudioRef}
        src={CELEBRATION_MUSIC}
        preload="auto"
        loop
      />

      {/* BACKGROUND */}

      <div className="birthday-nebula" />

      <div className="birthday-glow birthday-glow-one" />
      <div className="birthday-glow birthday-glow-two" />

      {/* STARS */}

      <div className="birthday-stars">
        {stars.map((star) => (
          <span
            key={star.id}
            className="birthday-star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* COUNTDOWN */}

      {!celebrationStarted && (
        <section className="ten-countdown">
          <div className="countdown-eyebrow">
            ✦ A BEAUTIFUL MOMENT IS WAITING ✦
          </div>

          <h1>Get Ready For The Magic</h1>

          <div className="countdown-orbit">
            <div className="countdown-ring countdown-ring-one" />
            <div className="countdown-ring countdown-ring-two" />

            <div className="ten-count-number" key={count}>
              {count}
            </div>
          </div>

          <p className="countdown-subtitle">
            Every second brings a beautiful surprise closer...
          </p>

          <div className="countdown-heart">♡</div>
        </section>
      )}

      {/* CELEBRATION */}

      {celebrationStarted && (
        <>
          {/* FIREWORKS */}

          <div className="fireworks-container">
            {fireworks.map((firework) => (
              <div
                key={firework.id}
                className={`firework-launch ${firework.side}`}
                style={{
                  "--firework-delay": firework.delay,
                  "--firework-x": firework.x,
                }}
              >
                <div className="firework-trail" />

                <div className="firework-burst">
                  {Array.from({ length: 24 }, (_, i) => (
                    <span
                      key={i}
                      style={{
                        "--angle": `${i * 15}deg`,
                        "--distance": `${45 + (i % 4) * 13}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* SPARKLES */}

          <div className="celebration-sparkles">
            {Array.from({ length: 55 }, (_, i) => (
              <span
                key={i}
                className="celebration-sparkle"
                style={{
                  left: `${(i * 29) % 100}%`,
                  top: `${(i * 41) % 100}%`,
                  animationDelay: `${(i % 8) * 0.35}s`,
                }}
              >
                ✦
              </span>
            ))}
          </div>

          {/* ROSE PETALS */}

          <div className="birthday-petals">
            {petals.map((petal) => (
              <span
                key={petal.id}
                className="birthday-petal"
                style={{
                  left: petal.left,
                  animationDelay: petal.delay,
                  animationDuration: petal.duration,
                }}
              >
                🌸
              </span>
            ))}
          </div>

          {/* MAIN BIRTHDAY CONTENT */}

          <section className="birthday-reveal">
            {/* BIRTHDAY TITLE */}

            <div
              className={`birthday-heading ${
                showMessage ? "show-heading" : ""
              }`}
            >
              <div className="heading-decoration">✦ ✧ ✦</div>

              <h1>Happy Birthday</h1>
              <h2>Durga</h2>

              <p>Today, the universe celebrates you ♡</p>
            </div>

            {/* PREMIUM CAKE SCENE */}

            <div className="birthday-cake-scene cake3d-scene">
              {/* LEFT FLOWER BOUQUET */}

              <div className="cake-bouquet cake-bouquet-left">
                <span className="cake-bouquet-flower">🌹</span>
                <span className="cake-bouquet-flower">🌸</span>
                <span className="cake-bouquet-flower">🌹</span>
                <span className="cake-bouquet-leaf">🌿</span>
                <span className="cake-bouquet-wrap">✧</span>
              </div>

              {/* CENTER CAKE */}

              <div className="cake3d-stage">
                <div className="cake3d-aura" />

                <span className="cake3d-floating-star cake-star-one">✦</span>
                <span className="cake3d-floating-star cake-star-two">✧</span>
                <span className="cake3d-floating-star cake-star-three">✦</span>
                <span className="cake3d-floating-star cake-star-four">♡</span>

                <div className="cake3d">
                  {/* CANDLES */}

                  <div className="cake3d-candles">
                    {[1, 2, 3, 4, 5].map((candle) => (
                      <div className="cake3d-candle" key={candle}>
                        <span
                          className={`cake3d-flame ${
                            candlesBlown ? "cake3d-flame-out" : ""
                          }`}
                        />
                        <span className="cake3d-wick" />
                        <span className="cake3d-candle-stick" />
                      </div>
                    ))}
                  </div>

                  {/* TOP DECORATION */}

                  <div className="cake3d-top">
                    <div className="cake3d-top-icing" />
                    <span className="cake3d-top-heart">♡</span>
                    <span className="cake3d-top-pearl pearl-one">•</span>
                    <span className="cake3d-top-pearl pearl-two">•</span>
                    <span className="cake3d-top-pearl pearl-three">•</span>
                    <span className="cake3d-top-pearl pearl-four">•</span>
                  </div>

                  {/* TOP LAYER */}

                  <div className="cake3d-layer cake3d-layer-top">
                    <div className="cake3d-drips">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="cake3d-layer-decoration">✧ ♡ ✧</div>
                  </div>

                  {/* MIDDLE ICING BAND */}

                  <div className="cake3d-icing-band">
                    <span>✦</span>
                    <span>♡</span>
                    <span>✦</span>
                    <span>♡</span>
                    <span>✦</span>
                  </div>

                  {/* BOTTOM LAYER */}

                  <div className="cake3d-layer cake3d-layer-bottom">
                    <div className="cake3d-bottom-decoration">
                      <span>♡</span>
                      <strong>For You</strong>
                      <span>♡</span>
                    </div>
                  </div>

                  {/* CAKE BASE */}

                  <div className="cake3d-base" />
                  <div className="cake3d-plate" />
                </div>
              </div>

              {/* RIGHT FLOWER BOUQUET */}

              <div className="cake-bouquet cake-bouquet-right">
                <span className="cake-bouquet-flower">🌸</span>
                <span className="cake-bouquet-flower">🌹</span>
                <span className="cake-bouquet-flower">🌸</span>
                <span className="cake-bouquet-leaf">🌿</span>
                <span className="cake-bouquet-wrap">✧</span>
              </div>
            </div>

            {/* CANDLE MESSAGE */}

            <div className="candle-message">
              {candlesBlown ? (
                <p className="candles-out-message">
                  Make a wish, my beautiful Durga ✨
                </p>
              ) : (
                <p>Close your eyes and make a wish ♡</p>
              )}
            </div>

            {/* CONTINUE BUTTON - AFTER 7 SECONDS */}

            {showContinue && (
              <button
                type="button"
                className="birthday-continue"
                onClick={handleContinue}
              >
                <span>Continue the magic</span>
                <span className="continue-arrow">→</span>
              </button>
            )}
          </section>
        </>
      )}

      {/* FOOTER */}

      <div className="birthday-footer">
        MADE WITH STARDUST & LOVE <span>✦</span>
      </div>
    </main>
  );
}

export default BirthdayCountdown;
