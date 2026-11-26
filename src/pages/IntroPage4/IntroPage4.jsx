
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Orbit,
  Telescope,
  ArrowRight,
  Heart,
  ShieldCheck,
} from "lucide-react";
import "./IntroPage4.css";

function IntroPage4({ onNext, onContinue }) {
  const nextPage = onNext || onContinue;

  const stars = useMemo(
    () =>
      Array.from({ length: 75 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 61 + 7) % 100}%`,
        delay: `${(i % 8) * 0.45}s`,
        size: `${(i % 3) + 1}px`,
      })),
    []
  );

  return (
    <section className="intro4-page">

      {/* SPACE BACKGROUND */}
      <div className="i4-nebula i4-nebula-one" />
      <div className="i4-nebula i4-nebula-two" />
      <div className="i4-nebula i4-nebula-three" />

      <div className="i4-star-field">
        {stars.map((star) => (
          <span
            key={star.id}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="i4-top-label">
        <Sparkles size={14} />
        <span>A LITTLE JOURNEY THROUGH THE UNIVERSE</span>
        <Sparkles size={14} />
      </div>

      {/* MAIN CONTENT */}
      <main className="i4-main">

        {/* LEFT CONTENT */}
        <motion.div
          className="i4-information"
          initial={{ opacity: 0, x: -55 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="i4-small-label">
            <span className="i4-label-line" />
            <span>FIRST, LET'S UNDERSTAND</span>
          </div>

          <h1>
            What is
            <br />
            <span>Star Registration?</span>
          </h1>

          <p className="i4-description">
            Star Registration ante enti telusa?
            Oka real star ki manam oka special name ivvadam.
            Aa name ni oka private star database lo record chesi,
            daniki oka personalized certificate and star map
            create cheyadam.
          </p>

          <div className="i4-meaning-card">
            <div className="i4-meaning-icon">
              <Orbit size={23} />
            </div>

            <div>
              <h3>Oka peru... oka gurthimpu...</h3>
              <p>
                Aa star ni scientific ga own chesukovadam kaadu.
                Kaani aa star ki manam ichina peru, mana feelings
                ni gurthu chese oka beautiful symbolic memory.
              </p>
            </div>
          </div>

          <div className="i4-facts">
            <div className="i4-fact">
              <div className="i4-fact-icon">
                <Star size={18} />
              </div>
              <div>
                <h4>Real Star</h4>
                <p>Akasham lo unna oka nijamaina star</p>
              </div>
            </div>

            <div className="i4-fact">
              <div className="i4-fact-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4>Private Record</h4>
                <p>Oka special name tho database entry</p>
              </div>
            </div>

            <div className="i4-fact">
              <div className="i4-fact-icon">
                <Telescope size={18} />
              </div>
              <div>
                <h4>Star Map</h4>
                <p>A star location ni chupinche map</p>
              </div>
            </div>
          </div>

          <div className="i4-note">
            <Sparkles size={14} />
            <span>
              Idi legal ownership kaadu, oka symbolic and emotional gift.
            </span>
          </div>
        </motion.div>

        {/* RIGHT SIDE — COSMIC STAR */}
        <motion.div
          className="i4-universe"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <div className="i4-universe-caption">
            <span>BEYOND THE ORDINARY</span>
            <div />
          </div>

          <div className="i4-cosmic-scene">

            {/* Orbit rings */}
            <div className="i4-orbit i4-orbit-one" />
            <div className="i4-orbit i4-orbit-two" />
            <div className="i4-orbit i4-orbit-three" />

            {/* Constellation lines */}
            <svg
              className="i4-constellation"
              viewBox="0 0 400 400"
              fill="none"
            >
              <path
                d="M85 120 L150 75 L220 105 L280 65 L330 145 L270 220 L195 260 L115 220 L85 120"
                stroke="rgba(239,204,151,0.55)"
                strokeWidth="1.2"
                strokeDasharray="4 7"
              />
              <path
                d="M150 75 L195 260 M220 105 L115 220 M280 65 L270 220"
                stroke="rgba(239,204,151,0.2)"
                strokeWidth="1"
              />
              {[
                [85, 120],
                [150, 75],
                [220, 105],
                [280, 65],
                [330, 145],
                [270, 220],
                [195, 260],
                [115, 220],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="#f8dca8"
                />
              ))}
            </svg>

            {/* Main glowing star */}
            <div className="i4-star-core">
              <div className="i4-star-aura" />
              <div className="i4-star-rays" />
              <div className="i4-star-shape">
                <Star size={74} strokeWidth={0.7} fill="currentColor" />
              </div>
              <div className="i4-star-center" />
            </div>

            {/* Orbiting mini stars */}
            <div className="i4-orbiting-star i4-orbit-star-one">
              <Star size={14} fill="currentColor" />
            </div>
            <div className="i4-orbiting-star i4-orbit-star-two">
              <Star size={10} fill="currentColor" />
            </div>
            <div className="i4-orbiting-star i4-orbit-star-three">
              <Sparkles size={13} />
            </div>

            {/* Star name */}
            <div className="i4-star-name">
              <span>A STAR</span>
              <h2>One Special Name</h2>
              <p>One beautiful memory</p>
            </div>

            {/* Floating dust */}
            {Array.from({ length: 15 }, (_, i) => (
              <span
                key={i}
                className="i4-floating-dust"
                style={{
                  "--dust-x": `${(i * 47) % 270 - 135}px`,
                  "--dust-y": `${(i * 31) % 260 - 130}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Certificate preview */}
          <motion.div
            className="i4-certificate"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="i4-certificate-top">
              <Sparkles size={14} />
              <span>STAR REGISTRATION</span>
              <Sparkles size={14} />
            </div>

            <div className="i4-certificate-star">
              <Star size={25} fill="currentColor" />
            </div>

            <p>A SPECIAL STAR DEDICATED TO</p>
            <h3>Someone Special</h3>

            <div className="i4-certificate-line" />

            <span className="i4-certificate-bottom">
              A SYMBOLIC GIFT FROM THE UNIVERSE
            </span>
          </motion.div>
        </motion.div>
      </main>

      {/* BOTTOM BUTTON */}
      <motion.div
        className="i4-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="i4-bottom-message">
          <Heart size={14} />
          <span>Prathi star venuka oka story untundi...</span>
        </div>

        <button
          type="button"
          className="i4-next-button"
          onClick={nextPage}
        >
          <span>LET'S CONTINUE</span>
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </section>
  );
}

export default IntroPage4;
