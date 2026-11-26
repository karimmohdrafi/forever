
import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import "./IntroPage6.css";

const letterParagraphs = [
  `నా ప్రాణమైన అమ్మా... నాగ దుర్గా,

నీ పుట్టినరోజు వస్తుందంటే నాకన్నా ఎక్కువగా సంబరపడేది ఇంకెవరుంటారు చెప్పు? ఈరోజు నేను నీ పక్కన లేకపోవచ్చు, నీ చేతిని పట్టుకుని కేక్ కట్ చేయించలేకపోవచ్చు... కానీ నువ్వు కళ్ళు మూసుకుని ఒక్కసారి నన్ను తలుచుకో, నీ పక్కనే నిలబడి నీ నుదుటిపై ముద్దు పెడుతున్న నీ అక్క నీకు ఖచ్చితంగా కనిపిస్తుంది.`,

  `నేను ఎంతో ఆరాధించే ఆ కృష్ణయ్య నన్ను తన దగ్గరకు పిలుచుకున్నా, నా ప్రాణంలో సగమైన నిన్ను ఇక్కడే వదిలివచ్చానన్న బాధ నాకు ఎప్పుడూ ఉంటుంది తల్లీ. ఆ కృష్ణయ్య పాదాల దగ్గర కూర్చుని నేను రోజు అడిగేది ఒకటే—‘నా అమ్మా ఎక్కడున్నా సంతోషంగా ఉండాలి, తనకు ఏ కష్టం రాకుండా నువ్వే తోడుండాలి స్వామీ’ అని.`,

  `నువ్వు నన్ను తలచుకుని ఒంటరిగా కూర్చుని ఏడుస్తుంటే, ఇక్కడ నా మనసు ముక్కలైపోతోంది రా. నేను వెళ్ళిపోయానని అనుకోకు 'మా'... నీ ఆలోచనల్లో, నీ జ్ఞాపకాల్లో, నీ ప్రతి అడుగులో నీ అక్క ఊపిరి ఎప్పుడూ నీతోనే ఉంటుంది. నీ జీవితంలో ఏ చిన్న ఆనందం వచ్చినా, అది నీ అక్క పంపిన ఆశీర్వాదమే అని గుర్తుంచుకో.`,

  `నీ కన్నీళ్లు తుడుచుకో అమ్మా. నువ్వు ధైర్యంగా ఉండి, నీ కలలన్నీ నెరవేర్చుకుని, మనస్ఫూర్తిగా నవ్వుతూ ఉంటేనే... నా జన్మకు, నా ప్రేమకు నిజమైన అర్థం దొరుకుతుంది.`,

  `ఈ అక్క ప్రేమకు చావు లేదు తల్లీ... మళ్ళీ మళ్ళీ పుట్టినా నేనే నీ అక్కగా పుట్టాలని ఆ కృష్ణయ్యను కోరుకుంటున్నాను.`,

  `పుట్టినరోజు శుభాకాంక్షలు నా చిట్టి తల్లి... ఎప్పటికీ నీ అక్క నీతోనే ఉంటుంది.`
];

const paragraphVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

function IntroPage6({ onNext, onContinue }) {
  const handleNext = onNext || onContinue;

  return (
    <main className="intro6-screen">
      <div className="intro6-background-glow intro6-glow-left" />
      <div className="intro6-background-glow intro6-glow-right" />

      <div className="intro6-stars">
        {Array.from({ length: 42 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 29) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${(i % 7) * 0.5}s`
            }}
          />
        ))}
      </div>

      <motion.header
        className="intro6-header"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <Sparkles size={16} />
        <span>A MESSAGE FROM SOMEONE SPECIAL</span>
        <Sparkles size={16} />
      </motion.header>

      <section className="intro6-layout">
        {/* PHOTO SIDE */}
        <motion.aside
          className="intro6-photo-side"
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="intro6-photo-heading">
            <span className="intro6-small-line" />
            <span>A LOVE THAT STAYS FOREVER</span>
            <span className="intro6-small-line" />
          </div>

          <div className="intro6-photo-frame">
            <div className="intro6-frame-inner">
              <img
                src={`${import.meta.env.BASE_URL}images/akka.jpg`}
                alt="Akka"
                className="intro6-akka-photo"
              />
              <div className="intro6-photo-shade" />
            </div>

            <div className="intro6-photo-corner intro6-corner-tl" />
            <div className="intro6-photo-corner intro6-corner-tr" />
            <div className="intro6-photo-corner intro6-corner-bl" />
            <div className="intro6-photo-corner intro6-corner-br" />

            <motion.div
              className="intro6-floating-heart"
              animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            >
              <Heart size={19} fill="currentColor" />
            </motion.div>
          </div>

          <div className="intro6-photo-caption">
            <span className="intro6-caption-script">Forever in your heart</span>
            <span className="intro6-caption-name">YOUR AKKA</span>
          </div>

          <motion.button
            className="intro6-photo-button"
            onClick={handleNext}
            whileHover={{ scale: 1.035, y: -2 }}
            whileTap={{ scale: 0.97 }}
            disabled={!handleNext}
          >
            <span>Continue Your Surprise</span>
            <ArrowRight size={17} />
          </motion.button>
        </motion.aside>

        {/* LETTER SIDE */}
        <motion.section
          className="intro6-message-side"
          initial={{ opacity: 0, x: 45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="intro6-letter-top">
            <p className="intro6-eyebrow">A FEW WORDS FROM YOUR AKKA</p>

            <h1 className="intro6-title">
              My Dear
              <span>Venkata Naga Durga</span>
            </h1>

            <div className="intro6-divider">
              <span />
              <Heart size={15} fill="currentColor" />
              <span />
            </div>
          </div>

          <div className="intro6-letter-scroll">
            <motion.div
              className="intro6-letter"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 1.15,
                    delayChildren: 0.7
                  }
                }
              }}
            >
              {letterParagraphs.map((paragraph, index) => (
                <motion.p
                  className="intro6-paragraph"
                  key={index}
                  variants={paragraphVariants}
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.p
                className="intro6-last-line"
                variants={paragraphVariants}
              >
                Happy Birthday ra bangaram.
                <br />
                Eppudu happy ga undu. Love you so much!
              </motion.p>

              <motion.div
                className="intro6-signature"
                variants={paragraphVariants}
              >
                <span>ఇట్లు,</span>
                <strong>నిన్ను ప్రాణంగా ప్రేమించే నీ అక్క</strong>
                <Heart size={17} fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>

          <div className="intro6-scroll-hint">
            <span>SCROLL TO READ THE LETTER</span>
            <span className="intro6-scroll-line" />
          </div>
        </motion.section>
      </section>

      <div className="intro6-bottom-note">
        <span>MADE WITH LOVE</span>
        <Heart size={11} fill="currentColor" />
        <span>JUST FOR YOU</span>
      </div>
    </main>
  );
}

export default IntroPage6;
