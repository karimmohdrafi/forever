
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
      "Venkata Naga Durga gariki birthday subhakankshalu!",
      "Mee jeevithamlo kottha avakashalu, manchi vijayalu, santosham ninduga undalani korukuntunnanu.",
      "Mee lakshyalanu nammakamtho cherukuntu, mee kutumbaniki garvakaranga nilavali. Mee bhavishyathu उज్వలంగా undalani manaspoorthiga aasisthunnanu.",
    ],
  },
  {
    name: "Pawan Kalyan",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/pawan.jpg`,
    tone: "An energetic and inspiring birthday tribute",
    message: [
      "Venkata Naga Durga gariki happy birthday!",
      "Life lo problems vachina bayapadakandi. Mee meeda meeku nammakam unte, entha pedda goal aina reach avvachu.",
      "Mee journey lo dhairyam, manchi alochanalu, prema eppudu meetho undali. Keep smiling and keep moving forward!",
    ],
  },
  {
    name: "Y. S. Jagan Mohan Reddy",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/jagan.jpg`,
    tone: "A warm and friendly birthday tribute",
    message: [
      "Venkata Naga Durga ki hrudayapoorvaka janmadina subhakankshalu.",
      "Mee jeevithamlo prathi roju santoshamtho, aarogyamtho, mee vallatho anandanga gadavalani korukuntunnanu.",
      "Mee kalalu neraverali. Mee kutumbamlo prema, santhosham eppudu nilichi undali. Happy Birthday!",
    ],
  },
  {
    name: "Narendra Modi",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/modi.jpg`,
    tone: "An uplifting and optimistic birthday tribute",
    message: [
      "Venkata Naga Durga ji ko janmadin ki hardik shubhkamnayein!",
      "Aapke jeevan mein naye sapne, naye avsar aur anek safaltayein aayein.",
      "Aap hamesha utsah, aatmavishwas aur muskaan ke saath aage badhte rahein. Aapka aane wala saal mangalmay ho!",
    ],
  },
  {
    name: "Donald Trump",
    role: "A SPECIAL BIRTHDAY WISH",
    image: `${import.meta.env.BASE_URL}images/trump.jpg`,
    tone: "A bold and upbeat birthday tribute",
    message: [
      "Happy Birthday, Venkata Naga Durga!",
      "Wishing you a fantastic year filled with happiness, confidence, wonderful opportunities and great memories.",
      "Keep dreaming big, keep believing in yourself, and make this year truly special. Have an amazing birthday!",
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
              className="intro7-opening-icon"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Gift size={55} strokeWidth={1.2} />
              <Sparkles className="intro7-gift-sparkle" size={22} />
            </motion.div>

            <p className="intro7-small-heading">
              SOMETHING SPECIAL IS WAITING
            </p>

            <h1>
              Okay...
              <span>Don't Get Too Emotional!</span>
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

            <p className="intro7-opening-subtext">
              Ready aa? Let's welcome them one by one.
            </p>

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
              <span>OPEN YOUR FINAL NOTE</span>
              <Heart size={17} fill="currentColor" />
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

export default IntroPage7;
