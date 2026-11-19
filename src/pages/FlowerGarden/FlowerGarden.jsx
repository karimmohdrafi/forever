
import React, { useState, useEffect, useRef } from "react";
import "./FlowerGarden.css";

const MUSIC_PATH = `${import.meta.env.BASE_URL}music/background-music9.mp3`;

const flowers = [
  {
    title: "Your Smile",
    message: "Your smile makes even my ordinary days feel beautiful.",
    symbol: "♡",
  },
  {
    title: "Your Kindness",
    message: "The kindness in your heart makes you truly special.",
    symbol: "♡",
  },
  {
    title: "Your Caring",
    message: "The way you care makes people feel loved and valued.",
    symbol: "♡",
  },
  {
    title: "Your Support",
    message: "Your support gives strength when everything feels difficult.",
    symbol: "♡",
  },
  {
    title: "Your Honesty",
    message: "Your honesty is one of the most beautiful things about you.",
    symbol: "♡",
  },
  {
    title: "Your Patience",
    message: "The way you understand things makes you even more precious.",
    symbol: "♡",
  },
  {
    title: "Your Beautiful Heart",
    message: "Above everything, I love the beautiful person you are. ❤️",
    symbol: "♥",
  },
];

function FlowerGarden({ onNext }) {
  const [openedFlowers, setOpenedFlowers] = useState([]);
  const audioRef = useRef(null);

  // Automatic looping background music
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    const playMusic = () => {
      audio.play().catch((error) => {
        console.log("Music autoplay was blocked by the browser:", error);
      });
    };

    playMusic();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const openFlower = (index) => {
    if (openedFlowers.includes(index)) return;

    setOpenedFlowers((prev) => [...prev, index]);
  };

  const allFlowersOpened = openedFlowers.length === flowers.length;

  const handleNext = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onNext?.();
  };

  return (
    <section className="flower-garden-page">

      {/* Background Music */}
      <audio
        ref={audioRef}
        src={MUSIC_PATH}
        loop
        preload="auto"
      />

      {/* Magical background */}
      <div className="garden-moon"></div>
      <div className="garden-glow"></div>
      <div className="garden-stars"></div>

      {/* Floating fireflies */}
      <div className="garden-fireflies">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            style={{
              "--i": i,
              "--left": `${(i * 37) % 100}%`,
              "--top": `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <header className="garden-heading">
        <span className="garden-eyebrow">
          ✧ SEVEN LITTLE REASONS ✧
        </span>

        <h1>The Flower Garden</h1>

        <p>
          Click each flower to reveal a special thing I love about you
        </p>

        <div className="garden-heading-line"></div>
      </header>

      {/* Flower garden */}
      <main className="garden-content">
        <div className="lotus-garden">
          {flowers.map((flower, index) => {
            const isOpen = openedFlowers.includes(index);

            return (
              <button
                type="button"
                key={index}
                className={`lotus-card flower-position-${index + 1} ${
                  isOpen ? "lotus-open" : ""
                }`}
                onClick={() => openFlower(index)}
                disabled={isOpen}
                aria-label={`Reveal ${flower.title}`}
              >
                <div className="lotus-visual">
                  <div className="lotus-halo"></div>

                  <div className="lotus-flower">
                    {Array.from({ length: 8 }).map((_, petal) => (
                      <span
                        key={petal}
                        className={`lotus-petal petal-${petal + 1}`}
                      />
                    ))}

                    <span className="lotus-center">
                      ♥
                    </span>
                  </div>

                  <span className="lotus-water-ring"></span>
                </div>

                {!isOpen ? (
                  <div className="flower-label">
                    <span>
                      FLOWER {String(index + 1).padStart(2, "0")}
                    </span>
                    <small>Tap to bloom ✧</small>
                  </div>
                ) : (
                  <div className="flower-reveal">
                    <span className="reveal-heart">♥</span>
                    <h2>{flower.title}</h2>
                    <p>{flower.message}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </main>

      {/* Progress */}
      <div className="garden-progress">
        <span>{openedFlowers.length}</span>
        <span> / 7 BLOOMED</span>
      </div>

      {/* Final continuation */}
      {allFlowersOpened && (
        <button
          type="button"
          className="garden-next-button"
          onClick={handleNext}
          aria-label="Continue to step 13"
        >
          <span>Continue</span>
          <span className="garden-next-arrow">➜</span>
        </button>
      )}

      <div className="garden-bottom-glow"></div>
    </section>
  );
}

export default FlowerGarden;
