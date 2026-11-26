
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
  { name: "Surya", symbol: "☉", sign: "Vrischika", house: "5th House", degree: "27°02′" },
  { name: "Chandra", symbol: "☾", sign: "Mithuna", house: "12th House", degree: "14°13′" },
  { name: "Kuja", symbol: "♂", sign: "Kanya", house: "3rd House", degree: "29°35′" },
  { name: "Budha", symbol: "☿", sign: "Vrischika", house: "5th House", degree: "19°43′" },
  { name: "Guru", symbol: "♃", sign: "Vrishabha", house: "11th House", degree: "10°21′" },
  { name: "Shukra", symbol: "♀", sign: "Makara", house: "7th House", degree: "11°05′" },
  { name: "Shani", symbol: "♄", sign: "Vrishabha", house: "11th House", degree: "1°50′" },
  { name: "Rahu", symbol: "☊", sign: "Mithuna", house: "12th House", degree: "22°50′" },
  { name: "Ketu", symbol: "☋", sign: "Dhanu", house: "6th House", degree: "22°50′" },
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

const chartHouses = [
  { house: "1", sign: "Karka", planets: "Lagna", className: "house-top" },
  { house: "2", sign: "Simha", planets: "—", className: "house-top-right" },
  { house: "3", sign: "Kanya", planets: "Kuja", className: "house-right-top" },
  { house: "4", sign: "Tula", planets: "—", className: "house-right" },
  { house: "5", sign: "Vrischika", planets: "Surya · Budha", className: "house-right-bottom" },
  { house: "6", sign: "Dhanu", planets: "Ketu", className: "house-bottom-right" },
  { house: "7", sign: "Makara", planets: "Shukra", className: "house-bottom" },
  { house: "8", sign: "Kumbha", planets: "—", className: "house-bottom-left" },
  { house: "9", sign: "Meena", planets: "—", className: "house-left-bottom" },
  { house: "10", sign: "Mesha", planets: "—", className: "house-left" },
  { house: "11", sign: "Vrishabha", planets: "Guru · Shani", className: "house-left-top" },
  { house: "12", sign: "Mithuna", planets: "Chandra · Rahu", className: "house-top-left" },
];

const stars = Array.from({ length: 75 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 23 + 7) % 100}%`,
  delay: `${(i % 9) * 0.45}s`,
  duration: `${2.5 + (i % 5)}s`,
}));

/* =========================================
   JANMA KUNDALI
========================================= */

function KundaliChart() {
  return (
    <div className="i3-kundali-chart">
      <div className="i3-chart-aura" />
      <div className="i3-chart-outer-glow" />

      <svg
        viewBox="0 0 400 400"
        className="i3-kundali-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="kundaliGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff4d4" />
            <stop offset="48%" stopColor="#c69b59" />
            <stop offset="100%" stopColor="#fff0c4" />
          </linearGradient>

          <radialGradient id="kundaliCenter">
            <stop offset="0%" stopColor="#fff2c9" />
            <stop offset="55%" stopColor="#d6ad6b" />
            <stop offset="100%" stopColor="#87633c" />
          </radialGradient>

          <filter id="chartGlow">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="12"
          y="12"
          width="376"
          height="376"
          rx="5"
          fill="rgba(12,18,34,.28)"
          stroke="url(#kundaliGold)"
          strokeWidth="2.4"
          className="i3-chart-frame"
        />

        <rect
          x="24"
          y="24"
          width="352"
          height="352"
          fill="none"
          stroke="#d7b477"
          strokeOpacity=".5"
          strokeWidth="1"
        />

        <path
          d="M12 12 L388 388 M388 12 L12 388"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="1.8"
        />

        <path
          d="M200 12 L388 200 L200 388 L12 200 Z"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="2"
        />

        <path
          d="M200 12 L200 388 M12 200 L388 200"
          fill="none"
          stroke="url(#kundaliGold)"
          strokeWidth="1.5"
        />

        <path
          d="M12 12 L200 200 L388 12 M12 388 L200 200 L388 388"
          fill="none"
          stroke="#e6c58e"
          strokeWidth="1.4"
          strokeOpacity=".75"
        />

        <circle
          cx="200"
          cy="200"
          r="30"
          fill="rgba(18,22,38,.92)"
          stroke="#d9b675"
          strokeWidth="1.2"
        />

        <circle
          cx="200"
          cy="200"
          r="23"
          fill="none"
          stroke="#e8c783"
          strokeOpacity=".65"
          strokeDasharray="3 4"
          className="i3-chart-center-ring"
        />

        <circle
          cx="200"
          cy="200"
          r="8"
          fill="url(#kundaliCenter)"
          filter="url(#chartGlow)"
          className="i3-chart-center-dot"
        />

        <text
          x="200"
          y="210"
          textAnchor="middle"
          className="i3-chart-om"
        >
          ॐ
        </text>

        {[12, 388].map((x) =>
          [12, 388].map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="4"
              fill="#ffe6b0"
              filter="url(#chartGlow)"
            />
          ))
        )}
      </svg>

      {chartHouses.map((item) => (
        <div
          className={`i3-chart-house ${item.className}`}
          key={item.house}
        >
          <span className="i3-house-number">{item.house}</span>
          <strong>{item.sign}</strong>
          <small>{item.planets}</small>
        </div>
      ))}

      <div className="i3-chart-center-label">
        <span>JANMA</span>
        <strong>RASHI</strong>
      </div>
    </div>
  );
}

/* =========================================
   CELESTIAL UNIVERSE
========================================= */

function CelestialUniverse() {
  return (
    <div className="i3-cosmos">
      <div className="i3-cosmos-aura" />

      <div className="i3-orbit i3-orbit-one" />
      <div className="i3-orbit i3-orbit-two" />
      <div className="i3-orbit i3-orbit-three" />

      <div className="i3-mandala">
        <div className="i3-mandala-ring i3-mandala-ring-one" />
        <div className="i3-mandala-ring i3-mandala-ring-two" />
        <div className="i3-mandala-petals" />
        <div className="i3-mandala-dots" />
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

      <div className="i3-orbit-particles">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} style={{ "--particle-index": i }} />
        ))}
      </div>

      <div className="i3-sacred-center">
        <div className="i3-center-halo" />
        <div className="i3-center-outline" />
        <div className="i3-center-inner-ring" />

        <span className="i3-swastik">ॐ</span>

        <div className="i3-center-pulse" />
      </div>

      <div className="i3-cosmos-stars">
        {Array.from({ length: 35 }, (_, i) => (
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

/* =========================================
   MAIN PAGE
========================================= */

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

      <div className="i3-page-content">
        <header className="i3-top-header">
          <div className="i3-heading">
            <motion.div
              className="i3-heading-icon"
              initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <Sparkles size={22} />
            </motion.div>

            <div className="i3-heading-copy">
              <motion.p
                className="i3-eyebrow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                A GLIMPSE INTO HER DESTINY
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8 }}
              >
                Her <span>Janma Jathakam</span>
              </motion.h1>

              <motion.p
                className="i3-heading-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Written in the stars, wrapped in a little magic
              </motion.p>
            </div>
          </div>

          <div className="i3-header-details">
            <motion.div
              className="i3-header-detail-card"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
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
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="i3-header-detail-icon">
                <Clock3 size={17} />
              </span>
              <div>
                <small>BIRTH TIME</small>
                <strong>8:20 PM IST</strong>
              </div>
            </motion.div>
          </div>
        </header>

        <section className="i3-layout">
          {/* FIRST PANEL */}
          <motion.section
            className="i3-panel i3-kundali-panel"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className="i3-panel-heading">
              <div>
                <span className="i3-panel-kicker">THE BIRTH CHART</span>
                <h2>Janma Kundali</h2>
              </div>
              <span className="i3-panel-icon">✧</span>
            </div>

            <div className="i3-chart-wrap">
              <KundaliChart />
            </div>

            <div className="i3-chart-summary">
              <span className="i3-summary-star">✦</span>
              <div>
                <strong>Karka Lagna</strong>
                <small>Ardra Nakshatram · Pada 3</small>
              </div>
            </div>

            <p className="i3-chart-note">
              A celestial map of her birth moment.
            </p>

            <motion.button
              className="i3-continue-btn"
              onClick={handleContinue}
              whileHover={{ scale: 1.035, y: -3 }}
              whileTap={{ scale: 0.96 }}
              type="button"
            >
              Continue Her Story
              <ArrowRight size={18} />
            </motion.button>
          </motion.section>

          {/* SECOND PANEL */}
          <motion.section
            className="i3-panel i3-celestial-panel"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
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

          {/* THIRD PANEL */}
          <motion.section
            className="i3-panel i3-details-panel"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
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
              Planetary placements at birth
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
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="i3-graha-symbol">
                        {planet.symbol}
                      </span>

                      <div className="i3-graha-main">
                        <strong className="i3-graha-name">
                          {planet.name}
                        </strong>
                        <small>{planet.degree}</small>
                      </div>

                      <span className="i3-graha-sign">{planet.sign}</span>
                      <small className="i3-graha-house">{planet.house}</small>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="i3-rahu-ketu-note">
                <span>☊</span>
                <div>
                  <strong>Rahu & Ketu</strong>
                  <p>
                    The lunar nodes are opposite points used in traditional
                    Vedic astrology.
                  </p>
                </div>
              </div>

              <p className="i3-accuracy-note">
                Calculated for 12 December 2000, 8:20 PM IST, Guntur,
                using Lahiri sidereal zodiac and whole-sign houses.
                Mean lunar nodes are used. Please verify the recorded
                birth time and coordinates with a professional Panchangam
                or ephemeris before relying on this chart for formal
                astrological decisions.
              </p>
            </div>
          </motion.section>
        </section>

        <footer className="i3-footer">
          <span>✦</span>
          A little universe, made for someone extraordinary
          <span>✦</span>
        </footer>
      </div>
    </main>
  );
}

export default IntroPage3;
