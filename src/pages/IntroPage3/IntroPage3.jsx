
import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ScrollText,
  ArrowRight,
  Star,
  CalendarDays,
  MapPin,
  Clock3,
} from "lucide-react";
import "./IntroPage3.css";

const navagraha = [
  { name: "Surya", symbol: "☀", sign: "Vrischika", house: "5th House" },
  { name: "Chandra", symbol: "☾", sign: "Mithuna", house: "12th House" },
  { name: "Kuja", symbol: "♂", sign: "Kanya", house: "3rd House" },
  { name: "Budha", symbol: "☿", sign: "Vrischika", house: "5th House" },
  { name: "Guru", symbol: "♃", sign: "Vrishabha", house: "11th House" },
  { name: "Shukra", symbol: "♀", sign: "Makara", house: "7th House" },
  { name: "Shani", symbol: "♄", sign: "Vrishabha", house: "11th House" },
  { name: "Rahu", symbol: "☊", sign: "Mithuna", house: "12th House" },
  { name: "Ketu", symbol: "☋", sign: "Dhanu", house: "6th House" },
];

const coreDetails = [
  { label: "LAGNA", value: "Karka", sub: "Cancer" },
  { label: "JANMA RASHI", value: "Mithuna", sub: "Gemini" },
  { label: "NAKSHATRAM", value: "Ardra", sub: "Pada 3" },
  { label: "SURYA RASHI", value: "Vrischika", sub: "Scorpio" },
];

const zodiacSigns = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

const stars = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 23 + 7) % 100}%`,
  delay: `${(i % 9) * 0.45}s`,
  duration: `${2.5 + (i % 5)}s`,
}));

// ============================================
// JANMA KUNDALI CHART
// ============================================

function KundaliChart() {
  return (
    <div className="i3-kundali-chart">
      <div className="i3-chart-aura" />

      <svg
        viewBox="0 0 400 400"
        className="i3-kundali-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="kundaliGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5dfa9" />
            <stop offset="50%" stopColor="#bd9557" />
            <stop offset="100%" stopColor="#f5dfa9" />
          </linearGradient>
        </defs>

        <rect
          x="15"
          y="15"
          width="370"
          height="370"
          rx="3"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="2"
        />

        <path
          d="M15 15 L385 385 M385 15 L15 385"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="1.7"
        />

        <path
          d="M200 15 L385 200 L200 385 L15 200 Z"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="1.7"
        />

        <path
          d="M200 15 L200 385 M15 200 L385 200"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="1.7"
        />

        <path
          d="M15 15 L200 200 L385 15"
          fill="none"
          stroke="#d7b477"
          strokeOpacity=".35"
        />

        <path
          d="M15 385 L200 200 L385 385"
          fill="none"
          stroke="#d7b477"
          strokeOpacity=".35"
        />

        <circle
          cx="200"
          cy="200"
          r="5"
          fill="#f5dfa9"
          className="i3-chart-center-dot"
        />

        <text
          x="200"
          y="211"
          textAnchor="middle"
          className="i3-chart-om"
        >
          ॐ
        </text>
      </svg>

      <span className="i3-chart-label c1">1</span>
      <span className="i3-chart-label c2">2</span>
      <span className="i3-chart-label c3">3</span>
      <span className="i3-chart-label c4">4</span>
      <span className="i3-chart-label c5">5</span>
      <span className="i3-chart-label c6">6</span>
      <span className="i3-chart-label c7">7</span>
      <span className="i3-chart-label c8">8</span>
      <span className="i3-chart-label c9">9</span>
      <span className="i3-chart-label c10">10</span>
      <span className="i3-chart-label c11">11</span>
      <span className="i3-chart-label c12">12</span>
    </div>
  );
}

// ============================================
// CELESTIAL UNIVERSE
// ============================================

function CelestialUniverse() {
  return (
    <div className="i3-cosmos">
      <div className="i3-cosmos-aura" />

      <div className="i3-orbit i3-orbit-one" />
      <div className="i3-orbit i3-orbit-two" />
      <div className="i3-orbit i3-orbit-three" />

      <div className="i3-orbit-particles">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            style={{ "--particle-index": i }}
          />
        ))}
      </div>

      <div className="i3-zodiac-ring">
        {zodiacSigns.map((sign, index) => (
          <span
            key={sign}
            className="i3-zodiac-sign"
            style={{ "--sign-index": index }}
          >
            {sign}
          </span>
        ))}
      </div>

      <div className="i3-energy-ring">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="i3-sacred-center">
        <div className="i3-center-halo" />
        <div className="i3-center-outline" />
        <span className="i3-swastik">卐</span>
        <div className="i3-center-pulse" />
      </div>

      <div className="i3-cosmos-stars">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 61 + 7) % 100}%`,
              animationDelay: `${(i % 8) * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

function IntroPage3({ onNext, onContinue }) {
  const handleContinue = onContinue || onNext;

  return (
    <main className="intro3-page">
      <div className="i3-background">
        <div className="i3-nebula i3-nebula-one" />
        <div className="i3-nebula i3-nebula-two" />

        {stars.map((star) => (
          <span
            key={star.id}
            className="i3-star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* ===================================
          HEADER + THREE BIRTH DETAIL CARDS
      =================================== */}

      <header className="i3-top-header">
        <div className="i3-heading">
          <motion.div
            className="i3-heading-icon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles size={21} />
          </motion.div>

          <div className="i3-heading-copy">
            <motion.p
              className="i3-eyebrow"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
            >
              A GLIMPSE INTO HER DESTINY
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              Her <span>Janma Jathakam</span>
            </motion.h1>

            <motion.p
              className="i3-heading-sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Written in the stars, wrapped in a little magic
            </motion.p>
          </div>
        </div>

        {/* Three cards beside the title */}
        <div className="i3-header-details">
          <motion.div
            className="i3-header-detail-card"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="i3-header-detail-icon">
              <CalendarDays size={17} />
            </span>
            <div>
              <small>DATE OF BIRTH</small>
              <strong>12 December 2000</strong>
            </div>
          </motion.div>

          <motion.div
            className="i3-header-detail-card"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            <span className="i3-header-detail-icon">
              <MapPin size={17} />
            </span>
            <div>
              <small>PLACE OF BIRTH</small>
              <strong>Guntur, Andhra Pradesh</strong>
            </div>
          </motion.div>

          <motion.div
            className="i3-header-detail-card"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44 }}
          >
            <span className="i3-header-detail-icon">
              <Clock3 size={17} />
            </span>
            <div>
              <small>BIRTH TIME</small>
              <strong>9:30 PM (Assumed)</strong>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ===================================
          THREE MAIN PANELS
      =================================== */}

      <section className="i3-layout">

        {/* PANEL 1 — KUNDALI */}
        <motion.section
          className="i3-panel i3-kundali-panel"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="i3-panel-heading">
            <div>
              <span className="i3-panel-kicker">THE BIRTH CHART</span>
              <h2>Janma Kundali</h2>
            </div>
            <span className="i3-panel-icon">✧</span>
          </div>

          {/* Only the chart in this panel */}
          <div className="i3-chart-wrap">
            <KundaliChart />
          </div>

          <p className="i3-chart-note">
            A beautiful story written among the stars.
          </p>

          <motion.button
            className="i3-continue-btn"
            onClick={handleContinue}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.97 }}
            type="button"
          >
            Continue Her Story
            <ArrowRight size={18} />
          </motion.button>
        </motion.section>

        {/* PANEL 2 — CELESTIAL UNIVERSE */}
        <motion.section
          className="i3-panel i3-celestial-panel"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="i3-panel-heading i3-center-heading">
            <div>
              <span className="i3-panel-kicker">COSMIC BLESSINGS</span>
              <h2>The Celestial Universe</h2>
            </div>
          </div>

          <CelestialUniverse />

          <div className="i3-celestial-caption">
            <p>THE UNIVERSE HAS ITS OWN WAY</p>
            <h3>Of making someone special.</h3>
            <span className="i3-caption-line" />
          </div>

          <div className="i3-celestial-footer">
            <Star size={14} />
            <span>May the stars always shine upon her</span>
            <Star size={14} />
          </div>
        </motion.section>

        {/* PANEL 3 — GRAHA STHITI */}
        <motion.section
          className="i3-panel i3-details-panel"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="i3-panel-heading i3-details-heading">
            <div>
              <span className="i3-panel-kicker">PLANETARY POSITIONS</span>
              <h2>Graha Sthiti</h2>
            </div>
            <ScrollText size={23} />
          </div>

          <p className="i3-scroll-hint">
            <span className="i3-scroll-dot" />
            (Scroll to explore all details)
          </p>

          <div className="i3-details-scroll">
            <div className="i3-details-section">
              <h3 className="i3-section-title">Birth Details</h3>

              <div className="i3-core-grid">
                {coreDetails.map((item) => (
                  <div className="i3-core-card" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <small>{item.sub}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="i3-details-section">
              <div className="i3-graha-title">
                <h3 className="i3-section-title">Navagraha Sthiti</h3>
                <span>9 PLANETS</span>
              </div>

              <div className="i3-graha-list">
                {navagraha.map((planet, index) => (
                  <motion.div
                    className={`i3-graha-row ${
                      planet.name === "Rahu" || planet.name === "Ketu"
                        ? "i3-shadow-planet"
                        : ""
                    }`}
                    key={planet.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.07 }}
                  >
                    <span className="i3-graha-symbol">
                      {planet.symbol}
                    </span>
                    <strong className="i3-graha-name">
                      {planet.name}
                    </strong>
                    <span className="i3-graha-sign">
                      {planet.sign}
                    </span>
                    <small className="i3-graha-house">
                      {planet.house}
                    </small>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="i3-rahu-ketu-note">
              <span>☊</span>
              <div>
                <strong>Rahu & Ketu</strong>
                <p>
                  The lunar nodes are traditionally considered important
                  points in Vedic astrology.
                </p>
              </div>
            </div>

            <p className="i3-accuracy-note">
              Birth time is assumed as 9:30 PM. Planetary positions, Lagna,
              houses and Nakshatra shown here are illustrative and need
              verification with an accurate birth time and a verified
              Panchangam or ephemeris.
            </p>
          </div>
        </motion.section>
      </section>
    </main>
  );
}

export default IntroPage3;
