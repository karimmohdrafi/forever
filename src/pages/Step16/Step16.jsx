
import React from "react";
import "./Step16.css";

function Step16({ onContinue }) {
  return (
    <section className="s16-screen">

      {/* Floating particles */}
      <div className="s16-particles">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="s16-particle"
            style={{
              "--x": `${Math.random() * 100}%`,
              "--duration": `${5 + Math.random() * 8}s`,
              "--delay": `${Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      {/* Background orbits */}
      <div className="s16-orbit s16-orbit-one" />
      <div className="s16-orbit s16-orbit-two" />

      {/* Main card */}
      <div className="s16-card">

        <div className="s16-top-icon">
          <span>✧</span>
          <div className="s16-heart">♡</div>
          <span>✧</span>
        </div>

        <p className="s16-eyebrow">
          THE CELEBRATION CONTINUES
        </p>

        <div className="s16-divider">
          <span />
          <i>✦</i>
          <span />
        </div>

        <h1 className="s16-heading">
          Another
          <br />
          <em>Beautiful Surprise...</em>
        </h1>

        <p className="s16-description">
          Some beautiful moments are yet to come.
          <br />
          And this one is waiting just for you.
        </p>

        <div className="s16-golden-line">
          <span>♡</span>
        </div>

        <button
          className="s16-continue-btn"
          onClick={onContinue}
        >
          <span>Continue Your Journey</span>
          <span className="s16-arrow">→</span>
        </button>

        <div className="s16-bottom-text">
          MADE WITH LOVE <span>♥</span> JUST FOR YOU
        </div>

      </div>

      {/* Corner decorations */}
      <div className="s16-corner s16-corner-tl">✧</div>
      <div className="s16-corner s16-corner-tr">✧</div>
      <div className="s16-corner s16-corner-bl">✧</div>
      <div className="s16-corner s16-corner-br">✧</div>

    </section>
  );
}

export default Step16;
