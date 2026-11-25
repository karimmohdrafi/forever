
import React, { useEffect, useState } from "react";
import "./BirthdayWishStar.css";

function BirthdayWishStar({ onNext, onContinue }) {
  const [stage, setStage] = useState("waiting");
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const launchTimer = setTimeout(() => {
      setStage("launch");
    }, 1200);

    const starTimer = setTimeout(() => {
      setStage("star");
    }, 6500);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(starTimer);
    };
  }, []);

  const handleStarClick = () => {
    if (leaving) return;

    setLeaving(true);

    setTimeout(() => {
      (onNext || onContinue)?.();
    }, 1200);
  };

  return (
    <main className={`wish-star-page ${stage} ${leaving ? "wish-leaving" : ""}`}>
      <div className="wish-night-sky" />

      <div className="wish-moon" />

      <div className="wish-stars">
        {Array.from({ length: 65 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i % 8) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="wish-cloud cloud-one" />
      <div className="wish-cloud cloud-two" />

      {/* FIRE BALLOON */}
      <div className="fire-balloon">
        <div className="balloon-glow" />
        <div className="balloon-flame">
          <span />
          <span />
        </div>

        <div className="balloon-body">
          <div className="balloon-highlight" />
          <div className="balloon-pattern" />
        </div>

        <div className="balloon-neck" />
        <div className="balloon-basket" />
        <div className="balloon-rope" />
      </div>

      {/* STAR REVEAL */}
      <div className="wish-star-reveal">
        <div className="star-aura" />

        <button
          className="magical-wish-star"
          onClick={handleStarClick}
          aria-label="Open the next surprise"
        >
          <span>★</span>
        </button>

        <p className="star-message">
          Make a wish, beautiful...
        </p>

        <p className="star-instruction">
          ✧ TOUCH THE STAR TO CONTINUE ✧
        </p>
      </div>

      <div className="wish-bottom-glow" />
      <div className="wish-transition" />
    </main>
  );
}

export default BirthdayWishStar;
