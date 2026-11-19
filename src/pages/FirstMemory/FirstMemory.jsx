
import { useEffect, useRef } from "react";
import "./FirstMemory.css";

const MEMORY_MUSIC = `${import.meta.env.BASE_URL}music/background-music7.mp3`;

function FirstMemory({ onContinue }) {
  const audioRef = useRef(null);

  // Background music: autoplay and loop
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.warn("First Memory music autoplay was blocked:", error);
      }
    };

    playMusic();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Automatically continue after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue?.();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <main className="first-memory">

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src={MEMORY_MUSIC}
        loop
        preload="auto"
      />

      {/* BACKGROUND */}
      <div className="memory-bg">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="memory-particle"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i % 7) * 0.7}s`,
              animationDuration: `${4 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* HEADING */}
      <header className="memory-heading">
        <span className="memory-eyebrow">
          A MOMENT TO REMEMBER
        </span>

        <h1>The First Memory</h1>

        <div className="memory-divider">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p>
          Every beautiful story begins with a memory...
        </p>
      </header>

      {/* FLOATING PHOTO FRAME */}
      <section className="memory-stage">
        <div className="memory-glow" />

        <div className="memory-frame">
          <div className="memory-frame-inner">
            <div className="memory-photo">
              <img
                src="/images/first-memory.jpg"
                alt="Our first memory"
              />
              <div className="memory-photo-shine" />
            </div>

            <div className="memory-frame-caption">
              <span>♡</span>
              A memory worth keeping
              <span>♡</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="memory-footer">
        <span>Some moments stay forever</span>
        <span className="memory-heart">♥</span>
      </footer>

    </main>
  );
}

export default FirstMemory;
