
import { useMemo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight } from "lucide-react";
import "./Welcome.css";

// Vite deployment-safe public music path
const BACKGROUND_MUSIC = `${import.meta.env.BASE_URL}music/background-music.mp3`;

/* =========================================
   ANIMATED FEMALE SIDE PROFILE
========================================= */

function GirlOutline() {
  const drawingPaths = [
    `M278 91 C226 54 158 70 124 125
     C91 178 111 239 105 295
     C96 369 69 424 88 493
     C105 559 163 600 226 621`,
    `M278 91 C323 87 355 115 363 153
     C369 176 359 193 364 207`,
    `M364 207 C367 216 383 223 381 231
     C379 237 365 239 362 245
     C358 250 365 254 360 260
     C355 266 344 263 342 273
     C339 287 350 298 338 309
     C326 323 307 322 289 315`,
    `M289 315 C291 354 280 384 255 407`,
    `M342 306 C342 352 359 393 390 419
     C423 446 444 486 451 535`,
    `M255 407 C215 430 165 436 127 470
     C94 499 89 539 104 570
     C143 605 192 625 244 627`,
    `M105 295 C145 337 140 392 125 438
     C110 485 127 537 162 574`,
    `M153 130 C197 91 269 95 307 133
     C335 161 336 204 321 239`,
    `M133 226 C165 280 167 348 177 402
     C188 459 211 503 220 554`,
    `M339 143 C353 192 338 237 340 284
     C342 333 365 374 366 427`,
    `M158 182 C198 137 257 130 296 160`,
    `M319 237 C303 229 298 245 306 262
     C314 280 329 278 335 261`,
    `M331 205 C341 198 351 201 357 207`,
    `M332 218 C340 211 350 213 355 220
     M335 216 L331 209
     M348 214 L351 207`,
    `M360 231 C355 235 350 238 346 239`,
    `M344 270 C350 267 356 269 360 272
     C355 277 349 278 344 275`,
    `M361 314 C376 371 375 432 351 485
     C333 526 307 564 270 592`,
  ];

  return (
    <svg
      className="girl-outline"
      viewBox="0 0 500 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animated elegant female side profile"
    >
      <defs>
        <linearGradient
          id="portraitGradient"
          x1="100"
          y1="70"
          x2="400"
          y2="620"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFB4ED" />
          <stop offset="70%" stopColor="#D77AFF" />
          <stop offset="100%" stopColor="#9B65FF" />
        </linearGradient>

        <filter
          id="portraitGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        className="portrait-drawing"
        stroke="url(#portraitGradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#portraitGlow)"
      >
        {drawingPaths.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="1"
            className={`draw-line draw-${index + 1}`}
          />
        ))}
      </g>

      <g className="portrait-sparkles">
        <path d="M75 180 L82 196 L98 203 L82 210 L75 226 L68 210 L52 203 L68 196 Z" />
        <path d="M410 150 L416 164 L430 170 L416 176 L410 190 L404 176 L390 170 L404 164 Z" />
        <path d="M90 430 L96 443 L109 449 L96 455 L90 468 L84 455 L71 449 L84 443 Z" />
        <path d="M420 400 L427 416 L443 423 L427 430 L420 446 L413 430 L397 423 L413 416 Z" />
      </g>

      <g className="portrait-glow-dots">
        <circle cx="145" cy="165" r="2.5" />
        <circle cx="380" cy="300" r="2" />
        <circle cx="120" cy="510" r="2.5" />
        <circle cx="350" cy="530" r="2" />
      </g>
    </svg>
  );
}

/* =========================================
   WELCOME COMPONENT
========================================= */

function Welcome({ onBegin }) {
  const audioRef = useRef(null);
  const [showJourneyButton, setShowJourneyButton] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: `${(i * 37.17) % 100}%`,
        top: `${(i * 61.73) % 100}%`,
        delay: `${(i % 8) * 0.4}s`,
        duration: `${2 + (i % 5)}s`,
        size: `${1 + (i % 3)}px`,
      })),
    []
  );

  // WELCOME PAGE MUSIC ONLY
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.4;
    audio.muted = false;

    const startMusic = async () => {
      try {
        await audio.play();
        console.log("Welcome page music started");
      } catch (error) {
        console.warn(
          "Autoplay was blocked by the browser:",
          error
        );
      }
    };

    // Try immediately when Welcome page mounts
    startMusic();

    // Stop music when leaving Welcome page
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // BUTTON APPEARS AFTER 12 SECONDS
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowJourneyButton(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  // BUTTON ONLY NAVIGATES TO NEXT PAGE
  const handleBegin = () => {
    if (typeof onBegin === "function") {
      onBegin();
    } else {
      console.error(
        "Welcome: onBegin callback is missing. Check App.jsx."
      );
    }
  };

  return (
    <main className="welcome-screen">

      {/* WELCOME PAGE MUSIC */}
      <audio
        ref={audioRef}
        src={BACKGROUND_MUSIC}
        autoPlay
        loop
        preload="auto"
        playsInline
        onCanPlay={() => {
          const audio = audioRef.current;

          if (audio && audio.paused) {
            audio.play().catch((error) => {
              console.warn("Music autoplay blocked:", error);
            });
          }
        }}
      />

      <div className="galaxy-bg" />
      <div className="ambient-glow" />

      {/* STARS */}
      <div className="stars-container">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* FLOATING PARTICLES */}
      <div className="floating-particles">
        {["✦", "♡", "✧", "🦋", "✦", "♡", "✧", "✦"].map(
          (item, i) => (
            <span key={i}>{item}</span>
          )
        )}
      </div>

      {/* MAIN LAYOUT */}
      <div className="welcome-layout">

        {/* LEFT SIDE */}
        <motion.section
          className="girl-section"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="girl-halo" />

          <motion.div
            className="girl-art"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GirlOutline />
          </motion.div>

          <motion.div
            className="girl-caption"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles size={14} />
            <span>THE STAR OF THIS UNIVERSE</span>
            <Sparkles size={14} />
          </motion.div>
        </motion.section>

        {/* RIGHT SIDE */}
        <section className="welcome-content">

          <motion.div
            className="welcome-symbol"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <Heart size={22} fill="currentColor" />
          </motion.div>

          <motion.p
            className="welcome-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            A SPECIAL UNIVERSE IS WAITING FOR YOU
          </motion.p>

          <motion.h1
            className="welcome-title"
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            Her Universe
            <span>♡</span>
          </motion.h1>

          <motion.div
            className="welcome-divider"
            initial={{ width: 0 }}
            animate={{ width: "160px" }}
            transition={{ delay: 1.6, duration: 1 }}
          />

          <motion.p
            className="welcome-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            A Birthday Journey Through Our World
          </motion.p>

          <motion.div
            className="name-reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.3, duration: 1 }}
          >
            <span>Created for someone special</span>
            <h2>Venkat</h2>
            <Heart size={16} className="name-heart" />
          </motion.div>

          <motion.p
            className="welcome-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            Some people make ordinary moments feel magical.
            This little universe is all about you.
          </motion.p>

          {/* BUTTON APPEARS AFTER 12 SECONDS */}
          {showJourneyButton && (
            <motion.button
              type="button"
              className="journey-button"
              onClick={handleBegin}
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.85,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles size={17} />
              Begin Our Journey
              <ArrowRight size={17} />
            </motion.button>
          )}

          <motion.p
            className="welcome-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.7 }}
          >
            MADE WITH LOVE, JUST FOR YOU
          </motion.p>

        </section>
      </div>

      {/* CORNER DECORATIONS */}
      <div className="corner-decoration top-left">✿</div>
      <div className="corner-decoration top-right">✿</div>
      <div className="corner-decoration bottom-left">✧</div>
      <div className="corner-decoration bottom-right">✧</div>

    </main>
  );
}

export default Welcome;
