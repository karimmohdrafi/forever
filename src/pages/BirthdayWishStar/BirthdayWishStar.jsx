import React, { useEffect, useRef, useState } from "react";
import "./BirthdayWishStar.css";

const MUSIC_PATH = "/music/background-music10.mp3";

const defaultWish = `Nuvvu eppudu ilane navvuthu undali....
Nee dreams anni nijam avvali....
Nee kallalo unna prati aasa neraverali....
Nee heart lo unna prati korika aa devudu neraverali....
Strong ga undali nuvvu prathi situation lo...`;

const photos = [
  "/images/wish-photo-1.jpeg",
  "/images/wish-photo-2.jpeg",
  "/images/wish-photo-3.jpeg",
  "/images/wish-photo-4.jpeg",
  "/images/wish-photo-5.jpeg",
];

function BirthdayWishStar({ onNext }) {
  const [phase, setPhase] = useState("intro");
  const [wish, setWish] = useState(defaultWish);
  const [photoIndex, setPhotoIndex] = useState(0);

  const timers = useRef([]);
  const audioRef = useRef(null);

  const addTimer = (callback, delay) => {
    const timer = setTimeout(callback, delay);
    timers.current.push(timer);
    return timer;
  };

  // Background music
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    const playMusic = () => {
      if (audio.paused) {
        audio.play().catch(() => {});
      }
    };

    playMusic();

    window.addEventListener("pointerdown", playMusic);
    window.addEventListener("keydown", playMusic);

    return () => {
      window.removeEventListener("pointerdown", playMusic);
      window.removeEventListener("keydown", playMusic);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Intro to writing
  useEffect(() => {
    const timer = setTimeout(() => setPhase("writing"), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Clear all manually created timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  // Photo slideshow
  useEffect(() => {
    if (phase !== "photos") return;

    const timer = setTimeout(() => {
      if (photoIndex < photos.length - 1) {
        setPhotoIndex((current) => current + 1);
      } else {
        setPhase("finished");

        addTimer(() => {
          if (typeof onNext === "function") {
            onNext();
          }
        }, 2200);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [phase, photoIndex, onNext]);

  const closeCard = () => {
    if (phase !== "writing") return;

    setPhase("folding");
    addTimer(() => setPhase("ready"), 1300);
  };

  const launchLantern = () => {
    if (phase !== "ready") return;

    setPhase("launching");
    addTimer(() => setPhase("star"), 7500);
  };

  const openMemories = () => {
    if (phase !== "star") return;

    setPhotoIndex(0);
    setPhase("photos");
  };

  return (
    <section className={`wish-star-page phase-${phase}`}>
      <audio
        ref={audioRef}
        src={MUSIC_PATH}
        loop
        preload="auto"
      />

      {/* Background */}
      <div className="wish-background" />
      <div className="wish-glow glow-left" />
      <div className="wish-glow glow-right" />

      <div className="wish-stars">
        {Array.from({ length: 90 }, (_, i) => (
          <span
            key={i}
            style={{
              "--x": `${(i * 37) % 100}%`,
              "--y": `${(i * 61) % 100}%`,
              "--delay": `${(i % 9) * 0.4}s`,
              "--size": `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      {phase !== "photos" &&
        phase !== "finished" &&
        phase !== "star" && (
          <header className="wish-heading">
            <span className="wish-eyebrow">
              ✧ &nbsp; A WISH WRITTEN IN THE STARS &nbsp; ✧
            </span>

            <h1>Make a Birthday Wish</h1>

            <p>
              Type your wish and watch it turn into a glowing star in the sky...
            </p>

            <div className="wish-heading-line">
              <span />
              <b>♡</b>
              <span />
            </div>
          </header>
        )}

      {/* Lantern is removed completely once the star appears */}
      {["intro", "writing", "folding", "ready", "launching"].includes(
        phase
      ) && (
        <div className="lantern-stage">
          <div className="lantern-halo" />
          <div className="lantern-ring" />

          <div className="wish-lantern">
            <div className="lantern-top" />
            <div className="lantern-cap" />

            <div className="lantern-body">
              <div className="lantern-shine" />
              <div className="lantern-frame frame-left" />
              <div className="lantern-frame frame-right" />

              <div className="lantern-flame">
                <span />
              </div>
            </div>

            <div className="lantern-bottom" />
            <div className="lantern-handle" />
          </div>

          {phase === "ready" && (
            <button
              className="lantern-fire-button"
              onClick={launchLantern}
            >
              <span>🔥</span>
              Fire
              <span className="fire-arrow">↗</span>
            </button>
          )}
        </div>
      )}

      {/* Intro hint */}
      {phase === "intro" && (
        <div className="wish-intro-hint">
          ✧ &nbsp; A little wish is waiting to take flight &nbsp; ✧
        </div>
      )}

      {/* Wish Card */}
      {(phase === "writing" || phase === "folding") && (
        <div
          className={`wish-card ${
            phase === "folding" ? "card-folding" : ""
          }`}
        >
          <div className="wish-card-inner">
            <div className="card-top-decoration">
              ✧ &nbsp; A LITTLE WISH FOR YOU &nbsp; ✧
            </div>

            <div className="card-heart">♡</div>

            <h2>For Your Beautiful Journey</h2>

            <p className="card-subtitle">
              A few words from my heart to yours
            </p>

            <div className="card-divider">
              <span />
              ✧
              <span />
            </div>

            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              disabled={phase === "folding"}
              aria-label="Your birthday wish"
              spellCheck="false"
            />

            <div className="card-bottom">
              <span>With lots of love ♡</span>

              <button
                onClick={closeCard}
                disabled={phase === "folding"}
              >
                Close It <span>✧</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lantern Launch Message */}
      {phase === "launching" && (
        <div className="launch-message">
          <span>✧</span>
          Your wish is travelling to the universe...
          <span>✧</span>
        </div>
      )}

      {/* Star appears alone - no lantern or balloon behind it */}
      {phase === "star" && (
        <div className="wish-star-screen">
          <div className="wish-star-orbit orbit-one" />
          <div className="wish-star-orbit orbit-two" />

          <button
            className="wish-star-result"
            onClick={openMemories}
            aria-label="Open your birthday memories"
          >
            <span className="glowing-star">✦</span>

            <span className="star-click-text">
              Your wish is now written in the stars
            </span>

            <span className="star-click-hint">
              Click the star to continue ♡
            </span>
          </button>
        </div>
      )}

      {/* Photos */}
      {phase === "photos" && (
        <div className="memory-photo-screen">
          <div className="memory-photo-heading">
            <span>A LITTLE COLLECTION OF MEMORIES</span>
            <h2>Moments That Make You Special</h2>
            <p>Every picture holds a beautiful memory ♡</p>
          </div>

          <div className="memory-photo-frame">
            <div className="photo-frame-glow" />

            <div className="memory-photo-inner">
              <img
                key={photos[photoIndex]}
                src={photos[photoIndex]}
                alt={`Birthday memory ${photoIndex + 1}`}
                className="memory-photo"
              />
            </div>

            <span className="photo-corner corner-one" />
            <span className="photo-corner corner-two" />
            <span className="photo-corner corner-three" />
            <span className="photo-corner corner-four" />
          </div>

          <div className="memory-photo-counter">
            <span>{String(photoIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>05</span>
          </div>

          <p className="memory-photo-caption">
            {photoIndex === 4
              ? "Some memories stay in our hearts forever... ♡"
              : "A moment to remember, a smile to treasure..."}
          </p>
        </div>
      )}

      {/* Finished */}
      {phase === "finished" && (
        <div className="photos-finished">
          <span className="finished-heart">♡</span>
          <p>Every memory is a little piece of magic...</p>
          <span className="finished-caption">
            A beautiful story, written in the stars
          </span>
        </div>
      )}

      {phase !== "photos" && phase !== "finished" && (
        <footer className="wish-footer">
          MADE WITH ♡ FOR SOMEONE SPECIAL
        </footer>
      )}
    </section>
  );
}

export default BirthdayWishStar;