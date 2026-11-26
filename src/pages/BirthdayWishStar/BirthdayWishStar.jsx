
import React from "react";
import "./BirthdayWishStar.css";

function BirthdayWishStar({ onNext, onContinue }) {
  const handleStarClick = () => {
    (onNext || onContinue)?.();
  };

  return (
    <main className="wish-star-page">
      {/* BACKGROUND */}
      <div className="wish-night-sky" />
      <div className="wish-moon" />

      {/* STARS */}
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

      {/* CLOUDS */}
      <div className="wish-cloud cloud-one" />
      <div className="wish-cloud cloud-two" />

      {/* DISTANT MOUNTAINS */}
      <div className="wish-mountain mountain-back" />
      <div className="wish-mountain mountain-front" />

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

      {/* MAIN STAR */}
      <section className="wish-star-reveal">
        <div className="star-aura" />
        <div className="star-orbit orbit-one" />
        <div className="star-orbit orbit-two" />

        <button
          className="magical-wish-star"
          onClick={handleStarClick}
          aria-label="Touch the star to continue"
        >
          <span>★</span>
        </button>

        <p className="star-message">
          Make a wish, beautiful...
        </p>

        <p className="star-instruction">
          ✧ TOUCH THE STAR TO CONTINUE ✧
        </p>
      </section>

      {/* BOTTOM LIGHT */}
      <div className="wish-bottom-glow" />
      <div className="wish-ground" />
    </main>
  );
}

export default BirthdayWishStar;
