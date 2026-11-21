
import { useState } from "react";

// =====================================
// INTRO PAGES — STEP 1 TO 5
// =====================================

import IntroPage1 from "./pages/IntroPage1/IntroPage1";
import IntroPage2 from "./pages/IntroPage2/IntroPage2";
import IntroPage3 from "./pages/IntroPage3/IntroPage3";
import IntroPage4 from "./pages/IntroPage4/IntroPage4";
import IntroPage5 from "./pages/IntroPage5/IntroPage5";

// =====================================
// MAIN PAGES — STEP 6 TO 22
// =====================================

import BirthdayCountdown from "./pages/BirthdayCountdown/BirthdayCountdown";
import Welcome from "./pages/Welcome/Welcome";
import BirthdayPortal from "./pages/BirthdayPortal/BirthdayPortal";
import BirthdayWelcome from "./pages/BirthdayWelcome/BirthdayWelcome";
import StarUniverse from "./pages/StarUniverse/StarUniverse";
import GiftThatWaits from "./pages/GiftThatWaits/GiftThatWaits";
import FlowerGarden from "./pages/FlowerGarden/FlowerGarden";
import LittleThings from "./pages/LittleThings/LittleThings";
import MemoryPuzzle from "./pages/MemoryPuzzle/MemoryPuzzle";
import FirstMemory from "./pages/FirstMemory/FirstMemory";
import BirthdaySurprise from "./pages/BirthdaySurprise/BirthdaySurprise";
import HeartLetter from "./pages/HeartLetter/HeartLetter";
import OneMoreSurprise from "./pages/OneMoreSurprise/OneMoreSurprise";
import BeautifulTimeline from "./pages/BeautifulTimeline/BeautifulTimeline";
import Step16 from "./pages/Step16/Step16";
import BirthdayWishStar from "./pages/BirthdayWishStar/BirthdayWishStar";
import FinalLoveNote from "./pages/FinalLoveNote/FinalLoveNote";

// =====================================
// APP
// =====================================

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
      {/* STEP 1 */}
      {currentStep === 0 && (
        <IntroPage1 onNext={() => goToStep(1)} />
      )}

      {/* STEP 2 */}
      {currentStep === 1 && (
        <IntroPage2 onNext={() => goToStep(2)} />
      )}

      {/* STEP 3 */}
      {currentStep === 2 && (
        <IntroPage3 onNext={() => goToStep(3)} />
      )}

      {/* STEP 4 */}
      {currentStep === 3 && (
        <IntroPage4 onNext={() => goToStep(4)} />
      )}

      {/* STEP 5 */}
      {currentStep === 4 && (
        <IntroPage5 onNext={() => goToStep(5)} />
      )}

      {/* STEP 6 */}
      {currentStep === 5 && (
        <BirthdayCountdown onContinue={() => goToStep(6)} />
      )}

      {/* STEP 7 */}
      {currentStep === 6 && (
        <Welcome onNext={() => goToStep(7)} />
      )}

      {/* STEP 8 */}
      {currentStep === 7 && (
        <BirthdayPortal
          onUnlock={() => goToStep(8)}
          onBack={() => goToStep(6)}
        />
      )}

      {/* STEP 9 */}
      {currentStep === 8 && (
        <BirthdayWelcome onNext={() => goToStep(9)} />
      )}

      {/* STEP 10 */}
      {currentStep === 9 && (
        <StarUniverse onContinue={() => goToStep(10)} />
      )}

      {/* STEP 11 */}
      {currentStep === 10 && (
        <GiftThatWaits onContinue={() => goToStep(11)} />
      )}

      {/* STEP 12 */}
      {currentStep === 11 && (
        <FlowerGarden onNext={() => goToStep(12)} />
      )}

      {/* STEP 13 */}
      {currentStep === 12 && (
        <LittleThings onNext={() => goToStep(13)} />
      )}

      {/* STEP 14 */}
      {currentStep === 13 && (
        <MemoryPuzzle onNext={() => goToStep(14)} />
      )}

      {/* STEP 15 */}
      {currentStep === 14 && (
        <FirstMemory onContinue={() => goToStep(15)} />
      )}

      {/* STEP 16 */}
      {currentStep === 15 && (
        <BirthdaySurprise onNext={() => goToStep(16)} />
      )}

      {/* STEP 17 */}
      {currentStep === 16 && (
        <HeartLetter onNext={() => goToStep(17)} />
      )}

      {/* STEP 18 */}
      {currentStep === 17 && (
        <OneMoreSurprise onContinue={() => goToStep(18)} />
      )}

      {/* STEP 19 */}
      {currentStep === 18 && (
        <BeautifulTimeline onContinue={() => goToStep(19)} />
      )}

      {/* STEP 20 */}
      {currentStep === 19 && (
        <Step16 onContinue={() => goToStep(20)} />
      )}

      {/* STEP 21 */}
      {currentStep === 20 && (
        <BirthdayWishStar onNext={() => goToStep(21)} />
      )}

      {/* STEP 22 — FINAL PAGE */}
      {currentStep === 21 && (
        <FinalLoveNote />
      )}
    </>
  );
}

export default App;
