
import React, { useEffect, useRef, useState } from "react";
import "./BirthdaySurprise.css";

const MUSIC_PATH = `${import.meta.env.BASE_URL}music/background-music11.mp3`;

function BirthdaySurprise({ onNext }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const scratchStarted = useRef(false);
  const blowTimer = useRef(null);
  const revealTimer = useRef(null);

  const [scene, setScene] = useState("scratch");
  const [candlesPlaced, setCandlesPlaced] = useState(false);
  const [candlesLit, setCandlesLit] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);

  // BACKGROUND MUSIC - AUTO PLAY + LOOP
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    audio.play().catch((error) => {
      console.log("Birthday music autoplay blocked:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // DRAW SCRATCH CARD
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 520, 230);
    gradient.addColorStop(0, "#8f6428");
    gradient.addColorStop(0.25, "#f6d98c");
    gradient.addColorStop(0.5, "#b8873c");
    gradient.addColorStop(0.75, "#f9e5a9");
    gradient.addColorStop(1, "#9b702f");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Golden texture
    for (let i = 0; i < 180; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.16})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2 + 0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Card border
    ctx.strokeStyle = "rgba(255,245,210,0.8)";
    ctx.lineWidth = 3;
    ctx.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);

    // Card text
    ctx.fillStyle = "#fff3d0";
    ctx.textAlign = "center";
    ctx.font = "bold 23px Georgia";
    ctx.fillText("A LITTLE SURPRISE FOR YOU", 260, 100);

    ctx.font = "16px Georgia";
    ctx.fillText("Scratch gently to reveal your message", 260, 135);
  }, []);

  // CHECK SCRATCH PROGRESS
  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || scene !== "scratch") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparentPixels = 0;
    let totalPixels = 0;

    for (let i = 3; i < pixels.length; i += 32) {
      totalPixels++;

      if (pixels[i] < 80) {
        transparentPixels++;
      }
    }

    if (transparentPixels / totalPixels > 0.35) {
      scratchStarted.current = false;
      setScene("revealed");

      revealTimer.current = setTimeout(() => {
        setScene("cake");
      }, 7000);
    }
  };

  // SCRATCH
  const scratch = (event) => {
    if (!scratchStarted.current || scene !== "scratch") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 27, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  };

  const startScratch = (event) => {
    if (scene !== "scratch") return;

    scratchStarted.current = true;

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}

    scratch(event);
  };

  const stopScratch = () => {
    scratchStarted.current = false;
  };

  // LIGHT CANDLES
  const lightCandles = () => {
    clearTimeout(blowTimer.current);
    setCandlesPlaced(true);
    setCandlesLit(true);
  };

  // BLOW CANDLES - FLAMES OFF AFTER 3 SECONDS
  const blowCandles = () => {
    if (!candlesPlaced || !candlesLit) return;

    clearTimeout(blowTimer.current);

    blowTimer.current = setTimeout(() => {
      setCandlesLit(false);
    }, 3000);
  };

  // CUT CAKE
  const cutCake = () => {
    if (!candlesPlaced || cakeCut) return;
    setCakeCut(true);
  };

  // CLEAN UP TIMERS
  useEffect(() => {
    return () => {
      clearTimeout(blowTimer.current);
      clearTimeout(revealTimer.current);
    };
  }, []);

  return (
    <section className="birthday-surprise-page">

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src={MUSIC_PATH}
        loop
        preload="auto"
      />

      {/* SCRATCH CARD SCENE */}
      {scene !== "cake" && (
        <div className="scratch-scene">
          <div className="surprise-heading">
            <span className="surprise-eyebrow">
              A SPECIAL MOMENT FOR YOU
            </span>

            <h1>Scratch Your Surprise</h1>

            <p>Something beautiful is waiting just for you...</p>
          </div>

          <div
            className={`scratch-card ${
              scene === "revealed" ? "card-revealed" : ""
            }`}
          >
            <div className="scratch-hidden-message">
              <span className="message-small">
                A WISH MADE JUST FOR YOU
              </span>

              <h2>Happy Birthday Kothi</h2>

              <span className="message-heart">♡</span>
            </div>

            {scene === "scratch" && (
              <canvas
                ref={canvasRef}
                width={520}
                height={230}
                className="scratch-canvas"
                onPointerDown={startScratch}
                onPointerMove={scratch}
                onPointerUp={stopScratch}
                onPointerCancel={stopScratch}
                onPointerLeave={stopScratch}
              />
            )}
          </div>

          {scene === "scratch" && (
            <p className="scratch-instruction">
              ✧ Scratch the card to reveal a special birthday message ✧
            </p>
          )}

          {scene === "revealed" && (
            <p className="revealed-caption">
              This little wish comes straight from my heart...
            </p>
          )}
        </div>
      )}

      {/* CAKE SCENE */}
      {scene === "cake" && (
        <div className="cake-scene">
          <header className="cake-heading">
            <span className="surprise-eyebrow">
              A SWEET CELEBRATION
            </span>

            <h1>From My Side - Birthday Cake</h1>

            <p>Let's make your birthday a little more magical...</p>
          </header>

          <main className="cake-content">

            {/* LEFT - CAKE */}
            <div className="cake-display">
              <div className="cake-glow" />

              <div className={`pink-cake ${cakeCut ? "cake-is-cut" : ""}`}>

                {/* CANDLES */}
                {candlesPlaced && (
                  <div className="cake-candles">
                    {[0, 1, 2].map((candle) => (
                      <div className="candle" key={candle}>
                        {candlesLit && (
                          <span className="candle-flame" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* CAKE TOP */}
                <div className="cake-top">
                  <span className="cake-decoration">✦</span>
                  <span className="cake-decoration">♡</span>
                  <span className="cake-decoration">✦</span>
                </div>

                {/* CAKE MIDDLE */}
                <div className="cake-middle">
                  <div className="icing-drip" />
                  <span className="cake-pink-dot dot-one" />
                  <span className="cake-pink-dot dot-two" />
                  <span className="cake-pink-dot dot-three" />
                  <span className="cake-pink-dot dot-four" />
                </div>

                {/* CAKE BOTTOM */}
                <div className="cake-bottom">
                  <span>♡</span>
                  <span>♡</span>
                  <span>♡</span>
                </div>

                {cakeCut && <div className="cake-cut-line" />}
              </div>

              {/* CAKE SLICE */}
              {cakeCut && (
                <div className="cake-slice">
                  <div className="slice-icing" />
                  <div className="slice-layer" />
                </div>
              )}

              <div className="cake-plate" />

              <p className="cake-caption">
                Made with love, just for you ♡
              </p>
            </div>

            {/* RIGHT - CONTROLS */}
            <div className="cake-actions">
              <span className="actions-eyebrow">
                YOUR LITTLE CELEBRATION
              </span>

              <h2>Let's celebrate!</h2>

              <p>Choose each moment and enjoy your birthday magic.</p>

              <button
                className={`cake-action-btn ${
                  candlesPlaced ? "action-done" : ""
                }`}
                onClick={lightCandles}
              >
                <span className="action-icon">🕯️</span>

                <span className="action-label">
                  <strong>Light Candles</strong>
                  <small>Make a birthday wish</small>
                </span>

                <span className="action-arrow">♡</span>
              </button>

              <button
                className="cake-action-btn"
                onClick={blowCandles}
                disabled={!candlesPlaced || !candlesLit}
              >
                <span className="action-icon">💨</span>

                <span className="action-label">
                  <strong>Blow Candles</strong>
                  <small>Make your wish come true</small>
                </span>

                <span className="action-arrow">♡</span>
              </button>

              <button
                className={`cake-action-btn ${
                  cakeCut ? "action-done" : ""
                }`}
                onClick={cutCake}
                disabled={!candlesPlaced || cakeCut}
              >
                <span className="action-icon">🍰</span>

                <span className="action-label">
                  <strong>Cut The Cake</strong>
                  <small>Let's share some sweetness</small>
                </span>

                <span className="action-arrow">♡</span>
              </button>

              {cakeCut && (
                <button
                  className="cake-next-btn"
                  onClick={() => {
                    if (typeof onNext === "function") onNext();
                  }}
                >
                  Next <span>➜</span>
                </button>
              )}
            </div>
          </main>
        </div>
      )}
    </section>
  );
}

export default BirthdaySurprise;
