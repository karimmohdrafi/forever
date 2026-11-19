
import React, { useState, useEffect, useRef } from "react";
import "./HeartLetter.css";

const paragraphs = [
  "Nijam cheppali ante ee roju nee birthday kabatti special kaadu... Nuvvu naa life lo unnanduke ee roju special ayyindi...",
  "Prathi year calendar lo chaala dates vasthayi... Kaani konni dates maatram manasuki daggaraga untayi... Naaku alanti date ee roju...",
  "Endukante... Ee world lo ekkado puttina oka manishi... Oka roju naa life loki vacchi... Naa happiness ki reason avuthundani... Nenu eppudu anukoledu...",
  "Nuvvu vachaka... Konni baadhalu thaggipoyayi... Konni navvulu perigipoyayi...",
  "Life lo entha kashtam vachina... Nee smile maatram pogottukoku...",
  "Endukante... Nuvvu navvithe nee chuttu unna vallaki kuda hope vasthundi...",
  "Happy Birthday ani cheppadam saripodu... Naa life lo oka andhamaina roju nee birthday...",
  "Happy Birthday My Favourite Person... ❤️"
];

const LETTER_MUSIC = `${import.meta.env.BASE_URL}music/background-music8.mp3`;

function HeartLetter({ onNext }) {
  const [opened, setOpened] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [letterComplete, setLetterComplete] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  // Autoplay music and keep it looping
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.45;

    const startMusic = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.warn("Browser blocked music autoplay:", error);
        setPlaying(false);
      }
    };

    startMusic();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Open letter and retry music after user interaction
  const openLetter = async () => {
    if (opened) return;

    setOpened(true);
    setVisibleCount(1);

    const audio = audioRef.current;

    if (audio) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.warn("Unable to start music:", error);
        setPlaying(false);
      }
    }
  };

  // Reveal paragraphs one by one
  useEffect(() => {
    if (!opened || visibleCount >= paragraphs.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((previous) =>
        Math.min(previous + 1, paragraphs.length)
      );
    }, 3800);

    return () => clearTimeout(timer);
  }, [opened, visibleCount]);

  // Show final seal when the letter is complete
  useEffect(() => {
    if (!opened || visibleCount !== paragraphs.length) return;

    const timer = setTimeout(() => {
      setLetterComplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [visibleCount, opened]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.warn("Unable to play music:", error);
      }
    }
  };

  const updateProgress = (event) => {
    const audio = event.currentTarget;
    setCurrentTime(audio.currentTime);
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  };

  const handleLoadedMetadata = (event) => {
    const audio = event.currentTarget;
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
  };

  const seekMusic = (event) => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextTime = Number(event.target.value);
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !muted;
    setMuted(!muted);
  };

  const restartMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);

    if (!playing) {
      audio.play().catch((error) => {
        console.warn("Unable to restart music:", error);
      });
    }
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleNext = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setPlaying(false);
    onNext?.();
  };

  return (
    <section className={`heart-letter-page ${opened ? "letter-page-opened" : ""}`}>

      <audio
        ref={audioRef}
        src={LETTER_MUSIC}
        loop
        preload="auto"
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* BACKGROUND */}
      <div className="letter-background">
        <div className="letter-orb letter-orb-one" />
        <div className="letter-orb letter-orb-two" />
        <div className="letter-orb letter-orb-three" />
      </div>

      <div className="letter-stars">
        {Array.from({ length: 35 }).map((_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 23) % 100}%`,
              animationDelay: `${(index % 8) * 0.6}s`
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* HEADING */}
      <header className="letter-heading">
        <span className="letter-heading-eyebrow">
          <i>✧</i> A MESSAGE FROM MY HEART <i>✧</i>
        </span>

        <h1>The Voice From My Heart</h1>

        <div className="letter-heading-divider">
          <span />
          <i>♥</i>
          <span />
        </div>

        <p>Some feelings are too special to be left unspoken.</p>
      </header>

      {/* MAIN CONTENT */}
      <main className="letter-main">

        {/* LETTER */}
        <div className="letter-left">
          <div className={`vintage-letter ${opened ? "opened" : ""}`}>

            <div className="letter-paper">
              <div className="paper-decoration paper-decoration-one" />
              <div className="paper-decoration paper-decoration-two" />

              {!opened ? (
                <div className="letter-closed-content">
                  <div className="closed-letter-icon">✉</div>

                  <span className="letter-small-text">
                    A LITTLE LETTER FOR YOU
                  </span>

                  <h2>Open My Heart</h2>

                  <p className="letter-recipient">
                    To My Favourite Person
                  </p>

                  <div className="closed-flourish">❦</div>

                  <button
                    className="heart-seal-button"
                    onClick={openLetter}
                    aria-label="Open the love letter"
                  >
                    <span className="seal-heart">♥</span>
                    <span className="seal-text">OPEN LETTER</span>
                  </button>

                  <p className="letter-bottom-text">
                    Something from my heart, just for you...
                  </p>
                </div>
              ) : (
                <div className="letter-open-content">

                  <div className="letter-date">
                    <span>✧</span>
                    A LETTER WRITTEN FOR YOU
                    <span>✧</span>
                  </div>

                  <h2 className="letter-title">
                    Nee Birthday Naa Life-lo Oka Special Day
                  </h2>

                  <div className="letter-divider">
                    <span>♥</span>
                  </div>

                  <div className="letter-paragraphs">
                    {paragraphs.slice(0, visibleCount).map((paragraph, index) => (
                      <p
                        key={index}
                        className={`letter-paragraph ${
                          index === paragraphs.length - 1
                            ? "final-letter-paragraph"
                            : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="letter-signature">
                    With Love, Always <span>♥</span>
                  </div>

                  {letterComplete && (
                    <div className="letter-ending">
                      <div className="final-heart-seal">
                        <span>♥</span>
                        <small>SEALED WITH LOVE</small>
                      </div>

                      <button
                        className="letter-inline-arrow"
                        onClick={handleNext}
                        aria-label="Continue to next step"
                      >
                        <span>↓</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {!opened && (
            <p className="letter-hint">
              <span>✦</span>
              A special message is waiting for you...
              <span>✦</span>
            </p>
          )}
        </div>

        {/* MUSIC PLAYER */}
        <div className={`letter-right ${opened ? "player-visible" : ""}`}>
          {opened && (
            <div className="love-music-player">

              <div className="music-top-label">
                <span className="music-note">♫</span>
                <span>NOW PLAYING</span>
                <span className="music-live-dot" />
              </div>

              <div className="music-cover">
                <div className="music-cover-ring ring-one" />
                <div className="music-cover-ring ring-two" />

                <div className="music-cover-heart">♥</div>

                <span className="cover-sparkle sparkle-one">✦</span>
                <span className="cover-sparkle sparkle-two">✧</span>
                <span className="cover-sparkle sparkle-three">✦</span>
              </div>

              <div className="music-information">
                <h2>A Song For You</h2>
                <p>Our Little Love Story</p>
              </div>

              <div className="music-progress-section">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(currentTime, duration || 0)}
                  onChange={seekMusic}
                  className="music-progress"
                  style={{
                    "--progress": duration
                      ? `${(currentTime / duration) * 100}%`
                      : "0%"
                  }}
                  aria-label="Music progress"
                />

                <div className="music-time">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="music-controls">
                <button
                  className="music-control-button"
                  onClick={restartMusic}
                  aria-label="Restart song"
                >
                  ↺
                </button>

                <button
                  className="music-play-button"
                  onClick={toggleMusic}
                  aria-label={playing ? "Pause music" : "Play music"}
                >
                  {playing ? "Ⅱ" : "▶"}
                </button>

                <button
                  className="music-control-button"
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute music" : "Mute music"}
                >
                  {muted ? "×" : "♫"}
                </button>
              </div>

              <div className="music-footer">
                <span>♥</span>
                A melody dedicated to you
                <span>♥</span>
              </div>

            </div>
          )}
        </div>
      </main>

      <footer className="letter-bottom-glow">
        <span>MADE WITH LOVE</span>
        <i>♥</i>
      </footer>

    </section>
  );
}

export default HeartLetter;
