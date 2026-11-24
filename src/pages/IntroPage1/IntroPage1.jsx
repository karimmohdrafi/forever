
import React, { useEffect, useState } from "react";
import "./IntroPage1.css";

const stars = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  left: `${(i * 47 + 13) % 100}%`,
  top: `${(i * 31 + 7) % 65}%`,
  delay: `${(i % 8) * 0.7}s`,
}));

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i % 9) * -1.4}s`,
  duration: `${7 + (i % 7)}s`,
  size: `${8 + (i % 9)}px`,
}));

function IntroPage1({ onNext }) {
  const [sceneReady, setSceneReady] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const first = setTimeout(() => setSceneReady(true), 500);
    const second = setTimeout(() => setShowWelcome(true), 4400);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, []);

  const handleEnter = () => {
    if (entering) return;

    setEntering(true);

    setTimeout(() => {
      onNext?.();
    }, 1500);
  };

  return (
    <main
      className={[
        "enchanted-intro",
        sceneReady ? "scene-ready" : "",
        showWelcome ? "welcome-ready" : "",
        entering ? "scene-leaving" : "",
      ].join(" ")}
    >
      {/* CINEMATIC SKY */}
      <div className="garden-sky">
        <div className="sky-sunlight" />
        <div className="sky-sun" />
        <div className="sky-cloud sky-cloud-one" />
        <div className="sky-cloud sky-cloud-two" />

        {stars.map((star) => (
          <span
            key={star.id}
            className="sky-dust"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* DISTANT GARDEN */}
      <div className="distant-garden">
        <div className="distant-tree tree-left" />
        <div className="distant-tree tree-right" />
        <div className="distant-hill hill-left" />
        <div className="distant-hill hill-right" />
      </div>

      {/* PALACE ELEVATION */}
      <section className="royal-palace">
        <div className="palace-glow" />

        {/* Main roof */}
        <div className="palace-roof roof-main">
          <div className="roof-top" />
          <div className="roof-decoration">✿</div>
        </div>

        {/* Central palace */}
        <div className="palace-building">
          <div className="palace-upper">
            <div className="upper-window window-a" />
            <div className="upper-window window-b" />
            <div className="upper-window window-c" />
          </div>

          <div className="palace-balcony">
            <div className="balcony-rail">
              {Array.from({ length: 13 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>

          <div className="palace-columns">
            {Array.from({ length: 6 }, (_, i) => (
              <div className="palace-column" key={i}>
                <span />
              </div>
            ))}
          </div>

          <div className="palace-entrance">
            <div className="entrance-light" />
            <div className="entrance-door">
              <span />
              <span />
            </div>
          </div>

          <div className="palace-steps">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Side towers */}
        <div className="palace-side-tower tower-left">
          <div className="tower-roof" />
          <div className="tower-window" />
        </div>

        <div className="palace-side-tower tower-right">
          <div className="tower-roof" />
          <div className="tower-window" />
        </div>

        {/* Royal flags */}
        <div className="palace-flag flag-left">✿</div>
        <div className="palace-flag flag-right">✿</div>
      </section>

      {/* GARDEN ARCH */}
      <div className="flower-arch arch-left">
        <div className="arch-post" />
        <div className="arch-curve" />
        <div className="arch-flower flower-a">✿</div>
        <div className="arch-flower flower-b">✿</div>
        <div className="arch-flower flower-c">✿</div>
      </div>

      <div className="flower-arch arch-right">
        <div className="arch-post" />
        <div className="arch-curve" />
        <div className="arch-flower flower-a">✿</div>
        <div className="arch-flower flower-b">✿</div>
        <div className="arch-flower flower-c">✿</div>
      </div>

      {/* ROSE GARDENS */}
      <div className="rose-garden rose-left">
        <div className="rose-bush bush-one" />
        <div className="rose-bush bush-two" />
        <div className="rose-bush bush-three" />
        <div className="garden-rose rose-one">✿</div>
        <div className="garden-rose rose-two">✿</div>
        <div className="garden-rose rose-three">✿</div>
      </div>

      <div className="rose-garden rose-right">
        <div className="rose-bush bush-one" />
        <div className="rose-bush bush-two" />
        <div className="rose-bush bush-three" />
        <div className="garden-rose rose-one">✿</div>
        <div className="garden-rose rose-two">✿</div>
        <div className="garden-rose rose-three">✿</div>
      </div>

      {/* CENTRAL FOUNTAIN */}
      <div className="royal-fountain">
        <div className="fountain-water water-one" />
        <div className="fountain-water water-two" />
        <div className="fountain-top">✧</div>
        <div className="fountain-bowl" />
        <div className="fountain-base" />
      </div>

      {/* GARDEN PATHWAY */}
      <div className="garden-ground">
        <div className="garden-path">
          <div className="path-center-glow" />
          <div className="path-tile tile-one" />
          <div className="path-tile tile-two" />
          <div className="path-tile tile-three" />
          <div className="path-tile tile-four" />
          <div className="path-tile tile-five" />
        </div>
      </div>

      {/* FLOATING PETALS */}
      <div className="petal-layer">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="falling-petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: `calc(${petal.size} * 1.35)`,
            }}
          />
        ))}
      </div>

      {/* BUTTERFLIES */}
      <div className="garden-butterfly butterfly-one">
        <span />
        <span />
      </div>
      <div className="garden-butterfly butterfly-two">
        <span />
        <span />
      </div>
      <div className="garden-butterfly butterfly-three">
        <span />
        <span />
      </div>

      {/* PRINCESS WELCOME */}
      <section className="princess-welcome">
        <div className="welcome-ornament">
          <span />
          ✧
          <span />
        </div>

        <p className="welcome-overline">
          A ROYAL CELEBRATION AWAITS
        </p>

        <h1 className="welcome-heading">
          Welcome to the
          <span>Enchanted Garden</span>
        </h1>

        <div className="welcome-name-frame">
          <span className="frame-decoration">✿</span>
          <p>MY BEAUTIFUL PRINCESS</p>
          <h2>My Maha Lakshmi</h2>
          <span className="frame-decoration">✿</span>
        </div>

        <p className="welcome-description">
          A magical kingdom is blooming
          <br />
          for someone truly special.
        </p>

        <button
          className="garden-enter-button"
          onClick={handleEnter}
          disabled={!showWelcome || entering}
        >
          <span className="button-flower">✿</span>
          ENTER THE GARDEN
          <span className="button-arrow">→</span>
        </button>

        <div className="welcome-bottom-text">
          <span>✧</span>
          YOUR FAIRYTALE BEGINS HERE
          <span>✧</span>
        </div>
      </section>

      {/* TRANSITION */}
      <div className="garden-transition">
        <div className="transition-flower">✿</div>
      </div>

      {/* CINEMATIC VIGNETTE */}
      <div className="garden-vignette" />
    </main>
  );
}

export default IntroPage1;
