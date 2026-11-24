
import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import "./IntroPage6.css";

function IntroPage6({ onNext, onContinue }) {
  const handleNext = onNext || onContinue;

  return (
    <main className="intro6-screen">
      <div className="intro6-stars">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 29) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${(i % 7) * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="intro6-glow intro6-glow-left" />
      <div className="intro6-glow intro6-glow-right" />

      <motion.header
        className="intro6-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles size={17} />
        <span>A MESSAGE FROM SOMEONE SPECIAL</span>
        <Sparkles size={17} />
      </motion.header>

      <section className="intro6-layout">
        {/* LEFT: SISTER PHOTO */}
        <motion.div
          className="intro6-photo-side"
          initial={{ opacity: 0, x: -65 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="intro6-photo-frame">
            <div className="intro6-photo-orbit intro6-orbit-one" />
            <div className="intro6-photo-orbit intro6-orbit-two" />

            <img
              src={`${import.meta.env.BASE_URL}images/akka.jpg`}
              alt="Akka"
              className="intro6-akka-photo"
            />

            <div className="intro6-photo-overlay">
              <Heart size={17} fill="currentColor" />
              <span>With Love</span>
            </div>
          </div>

          <motion.button
            className="intro6-photo-button"
            onClick={handleNext}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Continue Your Surprise</span>
            <ArrowRight size={17} />
          </motion.button>
        </motion.div>

        {/* RIGHT: MESSAGE */}
        <motion.div
          className="intro6-message-side"
          initial={{ opacity: 0, x: 65 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="intro6-eyebrow">A FEW WORDS FROM YOUR AKKA</p>

          <h1>
            My Dear
            <span>Venkata Naga Durga</span>
          </h1>

          <div className="intro6-divider">
            <span />
            <Heart size={16} fill="currentColor" />
            <span />
          </div>

          <div className="intro6-letter">
            <p>
              Nuvvu eppudu ilage navvuthu, santoshamga undali.
              Nee life lo nuvvu korukunna prathi dream nijam
              avvali ani manaspoorthiga korukuntunnanu.
            </p>

            <p>
              Konni rojulu easy ga untayi, konni rojulu
              konchem difficult ga untayi. Kaani edhi
              vachina dhairyamga munduku vellali.
              Nee meeda neeku nammakam eppudu pogottukoku.
            </p>

            <p>
              Nee happiness, nee success, nee smile —
              ivanni chusthu undali anedhe naa korika.
              Eppudu nee pakkana support ga undalani
              korukuntunnanu.
            </p>

            <p className="intro6-last-line">
              Happy Birthday ra bangaram.
              Eppudu happy ga undu. Love you so much!
            </p>
          </div>

          <div className="intro6-signature">
            <span>With lots of love,</span>
            <strong>Your Akka</strong>
            <Heart size={16} fill="currentColor" />
          </div>
        </motion.div>
      </section>

      <div className="intro6-bottom-note">
        <span>MADE WITH LOVE</span>
        <Heart size={12} fill="currentColor" />
        <span>JUST FOR YOU</span>
      </div>
    </main>
  );
}

export default IntroPage6;
