import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import "./IntroPage5.css";

const wishPhotos = [
  {
    src: `${import.meta.env.BASE_URL}images/wish-photo-1.jpeg`,
    caption: "A little moment, made beautiful by you.",
  },
  {
    src: `${import.meta.env.BASE_URL}images/wish-photo-2.jpeg`,
    caption: "Some smiles stay in the heart forever.",
  },
  {
    src: `${import.meta.env.BASE_URL}images/wish-photo-3.jpeg`,
    caption: "You make ordinary moments feel special.",
  },
  {
    src: `${import.meta.env.BASE_URL}images/wish-photo-4.jpeg`,
    caption: "A beautiful soul deserves beautiful wishes.",
  },
  {
    src: `${import.meta.env.BASE_URL}images/wish-photo-5.jpeg`,
    caption: "And this little wish is just for you.",
  },
];

function IntroPage5({ onNext }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (finished) return;

    const timer = setTimeout(() => {
      if (photoIndex < wishPhotos.length - 1) {
        setPhotoIndex((prev) => prev + 1);
        setImageError(false);
      } else {
        setFinished(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [photoIndex, finished]);

  const currentPhoto = wishPhotos[photoIndex];

  return (
    <main className="intro5-screen">
      <div className="intro5-stars" aria-hidden="true">
        {Array.from({ length: 45 }).map((_, index) => (
          <span
            key={index}
            className="intro5-star"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 61) % 100}%`,
              animationDelay: `${(index % 8) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="intro5-glow intro5-glow-one" />
      <div className="intro5-glow intro5-glow-two" />

      <header className="intro5-header">
        <motion.div
          className="intro5-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={17} />
          <span>A WISH FOR YOU</span>
          <Sparkles size={17} />
        </motion.div>

        <p>Five little moments. One beautiful person.</p>
      </header>

      <section className="intro5-photo-stage">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={photoIndex}
              className="intro5-photo-content"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="intro5-photo-frame">
                {!imageError ? (
                  <img
                    src={currentPhoto.src}
                    alt={`Birthday wish ${photoIndex + 1}`}
                    className="intro5-photo"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="intro5-image-error">
                    <Heart size={34} />
                    <p>Photo {photoIndex + 1} could not be loaded.</p>
                    <small>
                      Check the image name inside public/images.
                    </small>
                  </div>
                )}

                <div className="intro5-photo-shine" />
              </div>

              <motion.p
                className="intro5-caption"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                {currentPhoto.caption}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              className="intro5-finale"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Heart size={58} fill="currentColor" />
              </motion.div>

              <h1>Keep Smiling, Beautiful.</h1>
              <p>
                May your life always be filled with the happiness
                you bring into the lives around you.
              </p>

              <motion.button
                className="intro5-continue"
                onClick={onNext}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
                <span>✦</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {!finished && (
        <footer className="intro5-footer">
          <div className="intro5-progress">
            <motion.div
              className="intro5-progress-fill"
              key={photoIndex}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>

          <div className="intro5-photo-count">
            <span>0{photoIndex + 1}</span>
            <span className="intro5-count-divider">/</span>
            <span>0{wishPhotos.length}</span>
          </div>

          <div className="intro5-dots">
            {wishPhotos.map((_, index) => (
              <span
                key={index}
                className={`intro5-dot ${
                  index === photoIndex ? "active" : ""
                }`}
              />
            ))}
          </div>
        </footer>
      )}
    </main>
  );
}

export default IntroPage5;