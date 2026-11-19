
import { useState } from "react";

// STEP 1–3
import Welcome from "./pages/Welcome/Welcome";
import BirthdayPortal from "./pages/BirthdayPortal/BirthdayPortal";
import BirthdayWelcome from "./pages/BirthdayWelcome/BirthdayWelcome";

// STEP 5–9
import StarUniverse from "./pages/StarUniverse/StarUniverse";
import BirthdayCountdown from "./pages/BirthdayCountdown/BirthdayCountdown";
import GiftThatWaits from "./pages/GiftThatWaits/GiftThatWaits";
import BeautifulTimeline from "./pages/BeautifulTimeline/BeautifulTimeline";
import FirstMemory from "./pages/FirstMemory/FirstMemory";

// STEP 10–13
import MemoryPuzzle from "./pages/MemoryPuzzle/MemoryPuzzle";
import HeartLetter from "./pages/HeartLetter/HeartLetter";
import FlowerGarden from "./pages/FlowerGarden/FlowerGarden";
import LittleThings from "./pages/LittleThings/LittleThings";

// STEP 14
import OneMoreSurprise from "./pages/OneMoreSurprise/OneMoreSurprise";

// STEP 15
import BirthdaySurprise from "./pages/BirthdaySurprise/BirthdaySurprise";

// STEP 16
import Step16 from "./pages/Step16/Step16";

// STEP 17
import BirthdayWishStar from "./pages/BirthdayWishStar/BirthdayWishStar";

// STEP 18
import FinalLoveNote from "./pages/FinalLoveNote/FinalLoveNote";


function App() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="app-container">

      {/* STEP 1 - WELCOME */}
      {currentStep === 1 && (
        <Welcome onBegin={() => setCurrentStep(2)} />
      )}

      {/* STEP 2 - BIRTHDAY PORTAL */}
      {currentStep === 2 && (
        <BirthdayPortal
          onUnlock={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {/* STEP 3 - PERSONAL BIRTHDAY WELCOME */}
      {currentStep === 3 && (
        <BirthdayWelcome
          onContinue={() => setCurrentStep(5)}
        />
      )}

      {/* STEP 5 - STAR UNIVERSE */}
      {currentStep === 5 && (
        <StarUniverse
          onContinue={() => setCurrentStep(6)}
        />
      )}

      {/* STEP 6 - BIRTHDAY COUNTDOWN */}
      {currentStep === 6 && (
        <BirthdayCountdown
          onContinue={() => setCurrentStep(7)}
        />
      )}

      {/* STEP 7 - GIFT THAT WAITS */}
      {currentStep === 7 && (
        <GiftThatWaits
          onContinue={() => setCurrentStep(8)}
        />
      )}

      {/* STEP 8 - BEAUTIFUL TIMELINE */}
      {currentStep === 8 && (
        <BeautifulTimeline
          onContinue={() => setCurrentStep(9)}
        />
      )}

      {/* STEP 9 - FIRST MEMORY */}
      {currentStep === 9 && (
        <FirstMemory
          onContinue={() => setCurrentStep(10)}
        />
      )}

      {/* STEP 10 - MEMORY PUZZLE */}
      {currentStep === 10 && (
        <MemoryPuzzle
          onNext={() => setCurrentStep(11)}
        />
      )}

      {/* STEP 11 - HEART LETTER */}
      {currentStep === 11 && (
        <HeartLetter
          onNext={() => setCurrentStep(12)}
        />
      )}

      {/* STEP 12 - FLOWER GARDEN */}
      {currentStep === 12 && (
        <FlowerGarden
          onNext={() => setCurrentStep(13)}
        />
      )}

      {/* STEP 13 - THE LITTLE THINGS */}
      {currentStep === 13 && (
        <LittleThings
          onNext={() => setCurrentStep(14)}
        />
      )}

      {/* STEP 14 - ONE MORE SURPRISE */}
      {currentStep === 14 && (
        <OneMoreSurprise
          onContinue={() => setCurrentStep(15)}
        />
      )}

      {/* STEP 15 - BIRTHDAY SURPRISE */}
      {currentStep === 15 && (
        <BirthdaySurprise
          onNext={() => setCurrentStep(16)}
        />
      )}

      {/* STEP 16 - ANOTHER BEAUTIFUL SURPRISE */}
      {currentStep === 16 && (
        <Step16
          onContinue={() => setCurrentStep(17)}
        />
      )}

      {/* STEP 17 - MAKE A BIRTHDAY WISH */}
      {currentStep === 17 && (
        <BirthdayWishStar
          onNext={() => setCurrentStep(18)}
        />
      )}

      {/* STEP 18 - THE FINAL LOVE NOTE */}
      {currentStep === 18 && (
        <FinalLoveNote />
      )}

    </div>
  );
}

export default App;
