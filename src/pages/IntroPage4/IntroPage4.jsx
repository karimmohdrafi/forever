
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./IntroPage4.css";

const wishes = [
  {
    name: "Narendra Modi",
    image: "/images/modi.jpg",
    content: (
      <>
        మిత్రోం... నా ప్రియమైన మనవరాలు వెంకట నాగ దుర్గ గారికి, నా
        హృదయపూర్వక జన్మదిన శుభాకాంక్షలు! ఈ రోజు ఎంతో ప్రత్యేకమైన రోజు.
        వెంకట నాగ దుర్గ గారు తన జీవితంలో ఎన్నో అద్భుతమైన విజయాలు
        సాధించాలని, ఆయురారోగ్యాలతో, అష్టైశ్వర్యాలతో ఎల్లప్పుడూ
        సంతోషంగా ఉండాలని ఆ భగవంతుడిని ప్రార్థిస్తున్నాను. మీ కలలన్నీ
        నిజం కావాలి. మరోసారి... హ్యాపీ బర్త్‌డే వెంకట నాగ దుర్గ జీ!
        జై హింద్!
      </>
    ),
  },
  {
    name: "N. Chandrababu Naidu",
    image: "/images/babu.jpeg",
    content: (
      <>
        తమ్ముళ్లు... ఈ రోజు మనందరికీ ఎంతో సంతోషకరమైన రోజు. మన
        మనవరాలు <strong>వెంకట నాగ దుర్గ</strong> పుట్టినరోజు సందర్భంగా
        నా హృదయపూర్వక జన్మదిన శుభాకాంక్షలు తెలియజేస్తున్నాను.
        వెంకట నాగ దుర్గ చాలా కష్టపడే తత్వం, విజన్ ఉన్న అమ్మాయి.
        భవిష్యత్తులో తను ఇంకా ఉన్నత శిఖరాలకు ఎదగాలని, అనుకున్న
        లక్ష్యాలన్నీ సాధించాలని మనస్ఫూర్తిగా కోరుకుంటున్నాను.
        ఎక్కడా తగ్గకుండా ముందుకు వెళ్ళు... I wish you all the very best,
        Happy Birthday!
      </>
    ),
  },
  {
    name: "Pawan Kalyan",
    image: "/images/pawan.jpg",
    content: (
      <>
        నా ప్రియమైన సోదరి <strong>వెంకట నాగ దుర్గ</strong> కి నా
        హృదయపూర్వక పుట్టినరోజు శుభాకాంక్షలు. నువ్వు ఎంచుకున్న రంగంలో,
        నువ్వు అనుకున్న పనుల్లో అద్భుతమైన విజయాలు సాధించాలని
        మనస్ఫూర్తిగా కోరుకుంటున్నాను. జీవితంలో ఎన్ని అడ్డంకులు
        వచ్చినా... వెనకడుగు వేయకుండా ధైర్యంగా ముందుకు వెళ్ళు.
        నీ ఆశయాలన్నీ నెరవేరాలి. నువ్వు ఎప్పుడూ ఇలాగే చిరునవ్వుతో,
        ఆయురారోగ్యాలతో సంతోషంగా ఉండాలని ఆ భగవంతుడిని
        ప్రార్థిస్తున్నాను. హ్యాపీ బర్త్‌డే సోదరి... జై హింద్!
      </>
    ),
  },
  {
    name: "Y. S. Jagan Mohan Reddy",
    image: "/images/jagan.jpg",
    content: (
      <>
        నా ప్రియమైన చెల్లెలు <strong>వెంకట నాగ దుర్గ</strong> కి
        హృదయపూర్వక పుట్టినరోజు శుభాకాంక్షలు. ఈ రోజు నా చెల్లెలి
        పుట్టినరోజు సందర్భంగా... ఆ దేవుడి దయతో, మీ అందరి చల్లని
        దీవెనలతో తను ఎప్పుడూ సంతోషంగా, ఆయురారోగ్యాలతో ఉండాలని
        మనస్ఫూర్తిగా కోరుకుంటున్నాను. తన కలలన్నీ నెరవేరాలి,
        జీవితంలో ఎన్నో ఉన్నత శిఖరాలకు ఎదగాలి. హ్యాపీ బర్త్‌డే
        చెల్లెలు... గాడ్ బ్లెస్ యూ!
      </>
    ),
  },
  {
    name: "Donald Trump",
    image: "/images/trump.jpg",
    content: (
      <>
        హలో EveryOne! నాకు విజయవాడ కనకదుర్గ అమ్మవారు అంటే చాలా
        చాలా ఇష్టం... నాకంటే ఎక్కువగా అమ్మవారిని ఎవరూ ప్రేమించలేరు,
        బిలీవ్ మీ! అందుకే అమ్మవారి పేరు పెట్టుకున్న మన
        <strong> వెంకట నాగ దుర్గ</strong> కి ట్రెమండస్ హ్యాపీ బర్త్‌డే
        చెబుతున్నాను. నువ్వు సూపర్, నీ పుట్టినరోజు గ్రాండ్ సక్సెస్
        అవ్వాలి... గాడ్ బ్లెస్ యూ!
      </>
    ),
  },
];

function IntroPage4({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinally, setShowFinally] = useState(false);

  useEffect(() => {
    let timer;

    if (showFinally) {
      timer = setTimeout(() => {
        setShowFinally(false);
        setCurrentIndex(4);
      }, 2500);
    } else if (currentIndex === 3) {
      timer = setTimeout(() => {
        setShowFinally(true);
      }, 15000);
    } else if (currentIndex === 4) {
      timer = setTimeout(() => {
        onNext?.();
      }, 15000);
    } else {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 15000);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, showFinally, onNext]);

  return (
    <main className="intro4-page">
      <div className="intro4-background-glow" />

      <AnimatePresence mode="wait">
        {showFinally ? (
          <motion.div
            key="finally"
            className="intro4-finally"
            initial={{ opacity: 0, scale: 0.7, filter: "blur(15px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(12px)" }}
            transition={{ duration: 0.9 }}
          >
            <span className="intro4-finally-line" />
            <h1>FINALLY...</h1>
            <p>And now, one more special wish ♡</p>
            <span className="intro4-finally-line" />
          </motion.div>
        ) : (
          <motion.section
            key={currentIndex}
            className="intro4-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="intro4-left">
              <motion.div
                className="intro4-message"
                initial={{ opacity: 0, x: -45 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="intro4-eyebrow">
                  A SPECIAL BIRTHDAY MESSAGE
                </span>

                <h2>{wishes[currentIndex].name}</h2>

                <span className="intro4-gold-line" />

                <div className="intro4-quote">
                  {wishes[currentIndex].content}
                </div>

                <div className="intro4-signature">
                  With warm wishes ♡
                </div>
              </motion.div>
            </div>

            <div className="intro4-right">
              <motion.div
                className="intro4-photo-frame"
                initial={{ opacity: 0, scale: 0.88, x: 45 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.2 }}
              >
                <img
                  src={wishes[currentIndex].image}
                  alt={`${wishes[currentIndex].name} portrait`}
                  className="intro4-photo"
                />

                <div className="intro4-photo-shade" />
                <div className="intro4-photo-caption">
                  {wishes[currentIndex].name}
                </div>
              </motion.div>
            </div>

            <div className="intro4-progress">
              <span
                className="intro4-progress-fill"
                key={`progress-${currentIndex}`}
              />
            </div>

            <div className="intro4-counter">
              0{currentIndex + 1} <span>/</span> 05
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="intro4-disclaimer">
        Imaginary Birthday Wishes · Fan-made Tribute
      </div>
    </main>
  );
}

export default IntroPage4;
