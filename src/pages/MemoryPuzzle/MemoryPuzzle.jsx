
import { useState, useEffect, useCallback } from "react";
import "./MemoryPuzzle.css";

const PHOTO = "/images/memory-photo.jpg";

function shufflePieces() {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((value, index) => value === index));

  return arr;
}

function MemoryPuzzle({ setCurrentStep, onNext }) {
  const [pieces, setPieces] = useState(shufflePieces);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  const handleNext = useCallback(() => {
    if (onNext) {
      onNext();
    } else if (setCurrentStep) {
      setCurrentStep(11);
    }
  }, [onNext, setCurrentStep]);

  const handlePieceClick = (index) => {
    if (completed) return;

    if (selected === null) {
      setSelected(index);
      return;
    }

    if (selected === index) {
      setSelected(null);
      return;
    }

    const updated = [...pieces];

    [updated[selected], updated[index]] = [
      updated[index],
      updated[selected],
    ];

    setPieces(updated);
    setSelected(null);
    setMoves((prev) => prev + 1);
  };

  // Check puzzle completion
  useEffect(() => {
    const isSolved = pieces.every(
      (piece, index) => piece === index
    );

    if (isSolved && !completed) {
      setCompleted(true);
    }
  }, [pieces, completed]);

  // Reveal the completed photo after the blast begins
  useEffect(() => {
    if (!completed) return;

    const revealTimer = setTimeout(() => {
      setShowReveal(true);
    }, 700);

    return () => clearTimeout(revealTimer);
  }, [completed]);

  return (
    <div className="memory-puzzle-page">

      {/* Background */}
      <div className="memory-bg-glow"></div>
      <div className="memory-stars"></div>

      {/* Floating particles */}
      <div className="floating-hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}>✦</span>
        ))}
      </div>

      {!completed && (
        <div className="puzzle-content">

          <div className="puzzle-subtitle">
            A LITTLE JOURNEY THROUGH TIME
          </div>

          <h1 className="puzzle-heading">
            A Memory Worth
            <span> Putting Together</span>
          </h1>

          <p className="puzzle-description">
            Some memories are worth every little piece.
            Bring them together, one piece at a time.
          </p>

          <div className="puzzle-counter">
            <span>MEMORY PUZZLE</span>
            <span>{moves} MOVES</span>
          </div>

          {/* Puzzle Grid */}
          <div className="memory-puzzle-grid">
            {pieces.map((piece, index) => {
              const row = Math.floor(piece / 3);
              const col = piece % 3;

              return (
                <button
                  type="button"
                  key={index}
                  className={`puzzle-piece ${
                    selected === index ? "piece-selected" : ""
                  }`}
                  onClick={() => handlePieceClick(index)}
                  style={{
                    backgroundImage: `url("${PHOTO}")`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${col * 50}% ${row * 50}%`,
                  }}
                  aria-label={`Puzzle card ${index + 1}`}
                >
                  {selected === index && (
                    <span className="piece-glow"></span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="puzzle-instruction">
            ✨ Select two pieces to swap their positions
          </p>

          <div className="puzzle-progress">
            {pieces.filter((piece, index) => piece === index).length}
            <span> / 9 PIECES IN PLACE</span>
          </div>

        </div>
      )}

      {/* Completion screen */}
      {completed && (
        <div className={`puzzle-success ${showReveal ? "reveal-active" : ""}`}>

          <div className="success-sparkles">✦ ✧ ✦</div>

          <h1>
            Every Piece
            <span> Found Its Place</span>
          </h1>

          <p>
            And every little moment became
            a beautiful memory. ❤️
          </p>

          <div className="completed-photo">
            <img src={PHOTO} alt="Our beautiful memory" />
          </div>

          <div className="success-caption">
            A MEMORY THAT WILL LAST FOREVER
          </div>

          {/* Paper Explosion */}
          <div className="paper-explosion">
            {Array.from({ length: 100 }).map((_, i) => (
              <span
                key={i}
                style={{
                  "--i": i,
                  "--x": `${Math.random() * 100 - 50}vw`,
                  "--y": `${Math.random() * 100 - 50}vh`,
                  "--r": `${Math.random() * 900}deg`,
                  "--delay": `${Math.random() * 0.7}s`,
                }}
              />
            ))}
          </div>

          {/* Continue Button */}
          {showReveal && (
            <button
              type="button"
              className="puzzle-next-button"
              onClick={handleNext}
            >
              Continue <span>→</span>
            </button>
          )}

        </div>
      )}

    </div>
  );
}

export default MemoryPuzzle;
