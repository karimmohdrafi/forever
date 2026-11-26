
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  ArrowRight,
  Star,
  Gift,
} from "lucide-react";
import "./IntroPage7.css";

const wishes = [
  {
    name: "N. Chandrababu Naidu",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/babu.jpeg`,
    tone: "A formal and encouraging birthday tribute",
    message: [
      "తమ్ముళ్లూ... సారీ, చెల్లెమ్మా వెంకట నాగ దుర్గ! నీ పుట్టినరోజు సందర్భంగా నీకు ప్రత్యేక శుభాకాంక్షలు తెలియజేస్తున్నాను. మనం విజన్ 2047 దిశగా వెళ్తున్న ఈ సమయంలో, నీ బర్త్‌డే సెలబ్రేషన్స్ కూడా హైటెక్‌గా, ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ వాడి కేక్ ఆర్డర్ చేసే స్థాయిలో ఉండాలి. నువ్వు మరింత అభివృద్ధి చెంది, అందరికీ ఆదర్శంగా నిలవాలని ఆకాంక్షిస్తున్నాను.",
    ],
  },
  {
    name: "Pawan Kalyan",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/pawan.jpg`,
    tone: "An energetic and inspiring birthday tribute",
    message: [
      "వెంకట నాగ దుర్గ గారూ... మీకు నా హృదయపూర్వక జన్మదిన శుభాకాంక్షలు! జీవితం అనేది ఒక నిరంతర ప్రయాణం, ఈ ప్రయాణంలో మీరు ఎదుర్కొనే ప్రతి సవాలును ధైర్యంగా ఎదుర్కొని, మీ లక్ష్యాలను చేరుకోవాలని మనస్ఫూర్తిగా కోరుకుంటున్నాను. కేక్ కట్ చేసేటప్పుడు కూడా ఒక పద్ధతి, ఒక ప్రణాళిక, ఒక నిబద్ధత ఉండాలి... ఊరికే కట్ చేసి తినేయడం కాదు, ఆ క్రీమ్ అందరికీ సమానంగా పంచాలి!"
    ],
  },
  {
    name: "Y. S. Jagan Mohan Reddy",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/jagan.jpg`,
    tone: "A warm and friendly birthday tribute",
    message: [
      "నా చెల్లెమ్మ వెంకట నాగ దుర్గకు పుట్టినరోజు శుభాకాంక్షలు. దేవుడి దయతో, మీ అందరి చల్లని ఆశీస్సులతో ఈరోజు నా చెల్లెమ్మ తన జీవితంలో మరొక అడుగు ముందుకు వేస్తోంది. బర్త్‌డే కేక్ కట్ చేసి, ఆ కేక్ ముక్కలను నేరుగా మీ నోటికే అందించే 'డైరెక్ట్ కేక్ ట్రాన్స్‌ఫర్' పథకాన్ని మీ ఇంట్లో వాళ్లు అమలు చేయాలని కోరుకుంటూ... ఎల్లప్పుడూ సంతోషంగా ఉండాలని ఆశీర్వదిస్తున్నాను.",
    ],
  },
  {
    name: "Narendra Modi",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/modi.jpg`,
    tone: "An uplifting and optimistic birthday tribute",
    message: [
      "నా ప్రియమైన సోదరి వెంకట నాగ దుర్గకు జన్మదిన శుభాకాంక్షలు! మిత్రులారా... ఈరోజు ఒక చారిత్రాత్మకమైన రోజు. ఈ నవభారత నిర్మాణంలో భాగస్వామి అవుతున్న నా సోదరి, 'ఆత్మనిర్భర్'గా తన బర్త్‌డే కేక్‌ను తానే బేక్ చేసుకుని, అందరికీ పంచుతూ ముందుకు సాగాలి. 'సబ్‌కా సాథ్, సబ్‌కా కేక్' అనే నినాదంతో నీ ఈ కొత్త సంవత్సరం అద్భుతంగా ఉండాలని కోరుకుంటున్నాను.",
    ],
  },
  {
    name: "Donald Trump",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/trump.jpg`,
    tone: "A bold and upbeat birthday tribute",
    message: [
      "హలో వెంకట నాగ దుర్గ, నీకు చాలా అద్భుతమైన, గ్రేట్ బర్త్‌డే శుభాకాంక్షలు! నిజం చెప్పాలంటే, చరిత్రలో ఇంతకంటే గొప్ప బర్త్‌డే మరొకటి ఉండదు, నాకు తెలిసి ఇదే బెస్ట్ బర్త్‌డే. నీ బర్త్‌డే పార్టీకి అందరూ రావాలి, ఒకవేళ రాకపోతే వాళ్లపై నేను భారీగా టారిఫ్‌లు విధిస్తాను, కేక్ తినాలంటే ట్యాక్స్ కట్టాల్సిందే! నువ్వు ఎప్పుడూ విన్నింగ్ స్ట్రీక్‌లో ఉండాలి, అండ్ లెట్స్ మేక్ యువర్ బర్త్‌డే గ్రేట్ అగైన్",
    ],
  },
];

function IntroPage7({ onNext, onContinue }) {
  const handleFinal = onNext || onContinue;

  const [stage, setStage] = useState("opening");
  const [wishIndex, setWishIndex] = useState(0);

  const currentWish = wishes[wishIndex];

  const showFirstWish = () => {
    setWishIndex(0);
    setStage("wishes");
  };

  const showNextWish = () => {
    if (wishIndex < wishes.length - 1) {
      setWishIndex((prev) => prev + 1);
    } else {
      setStage("ending");
    }
  };

  return (
    <main className="intro7-screen">
      <div className="intro7-stars">
        {Array.from({ length: 50 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 31) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 9) * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="intro7-glow intro7-glow-a" />
      <div className="intro7-glow intro7-glow-b" />

      <AnimatePresence mode="wait">
        {stage === "opening" && (
          <motion.section
            key="opening"
            className="intro7-opening"
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              // className="intro7-opening-icon"
              // animate={{
              //   y: [0, -12, 0],
              //   rotate: [0, 5, -5, 0],
              // }}
              // transition={{ duration: 4, repeat: Infinity }}
            >
              {/* <Gift size={55} strokeWidth={1.2} /> */}
              {/* <Sparkles className="intro7-gift-sparkle" size={22} /> */}
            </motion.div>

            {/* <p className="intro7-small-heading">
              SOMETHING SPECIAL IS WAITING
            </p> */}

            <h1>
              Oy...Emotinal avva maku bey...
              <span>Neeku oka vishayam telusa...</span>
            </h1>

            <div className="intro7-opening-line">
              <span />
              <Heart size={18} fill="currentColor" />
              <span />
            </div>

            <p className="intro7-opening-text">
              Neeku birthday wishes cheppadaniki
              <strong> five special members </strong>
              wait chestunnaru!
            </p>

            {/* <p className="intro7-opening-subtext">
              Ready aa? Let's welcome them one by one.
            </p> */}

            <motion.button
              className="intro7-main-button"
              onClick={showFirstWish}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>LET THE WISHES BEGIN</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.section>
        )}

        {stage === "wishes" && (
          <motion.section
            key={`wish-${wishIndex}`}
            className="intro7-wish-layout"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            <div className="intro7-top-label">
              <Sparkles size={15} />
              <span>WISH {wishIndex + 1} OF {wishes.length}</span>
              <Sparkles size={15} />
            </div>

            <div className="intro7-content-grid">
              <div className="intro7-person-side">
                <div className="intro7-person-frame">
                  <img
                    src={currentWish.image}
                    alt={currentWish.name}
                    className="intro7-person-photo"
                  />
                  <div className="intro7-image-shine" />
                </div>

                <h2>{currentWish.name}</h2>
                <p className="intro7-person-role">
                  {currentWish.role}
                </p>
              </div>

              <div className="intro7-message-side">
                <p className="intro7-message-eyebrow">
                  A FICTIONAL FAN-MADE BIRTHDAY TRIBUTE
                </p>

                <div className="intro7-message-title">
                  <Star size={19} fill="currentColor" />
                  <span>{currentWish.tone}</span>
                </div>

                <div className="intro7-message-divider">
                  <span />
                  <Heart size={17} fill="currentColor" />
                  <span />
                </div>

                <div className="intro7-message-copy">
                  {currentWish.message.map((line, index) => (
                    <motion.p
                      key={`${wishIndex}-${index}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + index * 0.25 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <motion.button
                  className="intro7-next-button"
                  onClick={showNextWish}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span>
                    {wishIndex === wishes.length - 1
                      ? "ONE LAST SURPRISE"
                      : "NEXT WISH"}
                  </span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </div>

            <div className="intro7-progress-area">
              <div className="intro7-progress-track">
                <motion.div
                  className="intro7-progress-fill"
                  animate={{
                    width: `${((wishIndex + 1) / wishes.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="intro7-progress-dots">
                {wishes.map((wish, index) => (
                  <span
                    key={wish.name}
                    className={index <= wishIndex ? "active" : ""}
                  />
                ))}
              </div>
            </div>

            <p className="intro7-disclaimer">
              Imaginary birthday messages created for this personal surprise.
              Not actual statements or endorsements.
            </p>
          </motion.section>
        )}

        {stage === "ending" && (
          <motion.section
            key="ending"
            className="intro7-ending"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="intro7-ending-heart"
              animate={{
                scale: [1, 1.16, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart size={65} fill="currentColor" />
            </motion.div>

            <p className="intro7-small-heading">
              FIVE WISHES. ONE BEAUTIFUL SOUL.
            </p>

            <h1>
              And now...
              <span>The most special message is waiting.</span>
            </h1>

            <p className="intro7-ending-text">
              And this final note comes straight from the heart.
            </p>

            <motion.button
              className="intro7-main-button"
              onClick={handleFinal}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>OPEN CHEYI BEY</span>
              <Heart size={17} fill="currentColor" />
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default IntroPage7;
