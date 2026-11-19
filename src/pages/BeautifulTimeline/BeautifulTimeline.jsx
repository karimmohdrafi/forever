
import { useState, useEffect, useRef } from "react";
import "./BeautifulTimeline.css";

const memories = [
  { id: 1, image: "/images/photo1.jpeg", caption: "A beautiful beginning" },
  { id: 2, image: "/images/photo2.jpg", caption: "A little sunshine" },
  { id: 3, image: "/images/photo3.jpg", caption: "Simply beautiful" },
  { id: 4, image: "/images/photo4.png", caption: "A lovely moment" },
  { id: 5, image: "/images/photo5.jpg", caption: "Unforgettable smile" },
  { id: 6, image: "/images/photo6.jpg", caption: "Pure happiness" },
  { id: 7, image: "/images/photo7.jpg", caption: "Little memories" },
  { id: 8, image: "/images/photo8.jpg", caption: "Beautiful soul" },
  { id: 9, image: "/images/photo9.jpeg", caption: "Forever special" },
  { id: 10, image: "/images/photo10.jpeg", caption: "My favourite star" },
];

const TIMELINE_MUSIC = `${import.meta.env.BASE_URL}music/background-music6.mp3`;

function BeautifulTimeline({ onContinue }) {
  const [timelineFinished, setTimelineFinished] = useState(false);
  const audioRef = useRef(null);

  // Background music: autoplay + loop
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.warn("Timeline music autoplay was blocked:", error);
      }
    };

    playMusic();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    onContinue?.();
  };

  return (
    <main className="timeline-page">

      {/* BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src={TIMELINE_MUSIC}
        loop
        preload="auto"
      />

      {/* BACKGROUND */}
      <div className="timeline-background">
        <div className="timeline-glow glow-one"></div>
        <div className="timeline-glow glow-two"></div>
        <div className="timeline-stars"></div>
      </div>

      {/* HEADING */}
      <header className="timeline-heading">
        <span className="timeline-subtitle">
          A COLLECTION OF BEAUTIFUL MOMENTS
        </span>

        <h1>Her Beautiful Timeline</h1>

        <div className="timeline-heading-line">
          <span></span>
          <i>✦</i>
          <span></span>
        </div>

        <p>Every picture holds a little piece of magic.</p>
      </header>

      {/* TIMELINE STAGE */}
      <section className="timeline-stage">

        <div
          className={`timeline-track ${
            timelineFinished ? "timeline-completed" : ""
          }`}
          onAnimationEnd={(event) => {
            if (
              event.target === event.currentTarget &&
              event.animationName === "timelineTravel"
            ) {
              setTimelineFinished(true);
            }
          }}
        >

          {/* WAVY THREAD */}
          <svg
            className="timeline-string"
            viewBox="0 0 2600 440"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="threadGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="
                M 0 210
                C 130 210, 130 100, 260 130
                S 390 300, 520 240
                S 650 100, 780 145
                S 910 300, 1040 230
                S 1170 100, 1300 150
                S 1430 300, 1560 235
                S 1690 100, 1820 145
                S 1950 300, 2080 235
                S 2210 100, 2340 150
                S 2470 250, 2600 210
              "
              fill="none"
              stroke="#e9b8da"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#threadGlow)"
            />

            <path
              d="
                M 0 210
                C 130 210, 130 100, 260 130
                S 390 300, 520 240
                S 650 100, 780 145
                S 910 300, 1040 230
                S 1170 100, 1300 150
                S 1430 300, 1560 235
                S 1690 100, 1820 145
                S 1950 300, 2080 235
                S 2210 100, 2340 150
                S 2470 250, 2600 210
              "
              fill="none"
              stroke="#fff0fa"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="5 9"
            />
          </svg>

          {/* TEN PHOTOS */}
          {memories.map((memory, index) => (
            <article
              className={`timeline-memory memory-${index + 1}`}
              key={memory.id}
            >
              <div className="memory-clip">
                <span></span>
              </div>

              <div className="polaroid-frame">
                <div className="polaroid-photo">
                  <img
                    src={memory.image}
                    alt={`Memory ${memory.id}`}
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />

                  <div className="photo-overlay">✦</div>
                </div>

                <p>{memory.caption}</p>

                <span className="memory-number">
                  MEMORY {String(memory.id).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}

        </div>

        {/* CENTER ARROW - APPEARS AFTER ALL PHOTOS */}
        <div
          className={`timeline-center-ending ${
            timelineFinished ? "center-ending-visible" : ""
          }`}
        >
          <div className="center-ending-star">✦</div>

          <button
            className="timeline-next-button"
            onClick={handleContinue}
            aria-label="Continue to Step 9"
          >
            <span>→</span>
          </button>

          <p>THE STORY CONTINUES</p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="timeline-footer">
        <span>✧</span>
        <p>Some moments deserve to last forever</p>
        <span>✧</span>
      </footer>

    </main>
  );
}

export default BeautifulTimeline;
