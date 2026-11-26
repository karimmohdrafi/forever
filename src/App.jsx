
import React, { useState, useEffect } from "react";

// INTRO PAGES
import IntroPage1 from "./pages/IntroPage1/IntroPage1";
import IntroPage2 from "./pages/IntroPage2/IntroPage2";
import IntroPage3 from "./pages/IntroPage3/IntroPage3";
import IntroPage4 from "./pages/IntroPage4/IntroPage4";
import IntroPage5 from "./pages/IntroPage5/IntroPage5";
import IntroPage6 from "./pages/IntroPage6/IntroPage6";
import IntroPage7 from "./pages/IntroPage7/IntroPage7";

// MAIN PAGES
import Welcome from "./pages/Welcome/Welcome";
import BirthdayPortal from "./pages/BirthdayPortal/BirthdayPortal";
import BirthdayWelcome from "./pages/BirthdayWelcome/BirthdayWelcome";
import LittleThings from "./pages/LittleThings/LittleThings";
import FlowerGarden from "./pages/FlowerGarden/FlowerGarden";
import Step16 from "./pages/Step16/Step16";
import MemoryPuzzle from "./pages/MemoryPuzzle/MemoryPuzzle";
import FirstMemory from "./pages/FirstMemory/FirstMemory";
import HeartLetter from "./pages/HeartLetter/HeartLetter";
import BeautifulTimeline from "./pages/BeautifulTimeline/BeautifulTimeline";
import GiftThatWaits from "./pages/GiftThatWaits/GiftThatWaits";

// SPECIAL AND FINAL PAGES
import BirthdayWishStar from "./pages/BirthdayWishStar/BirthdayWishStar";
import FinalLoveNote from "./pages/FinalLoveNote/FinalLoveNote";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [currentStep]);

  // Supports both onNext and onContinue callbacks
  const next = (step) => ({
    onNext: () => goToStep(step),
    onContinue: () => goToStep(step),
  });

  let page;

  switch (currentStep) {
    // STEP 1
    case 0:
      page = <IntroPage1 {...next(1)} />;
      break;

    // STEP 2
    case 1:
      page = <IntroPage2 {...next(2)} />;
      break;

    // STEP 3
    case 2:
      page = <Welcome {...next(3)} />;
      break;

    // STEP 4
    case 3:
      page = (
        <BirthdayPortal
          onUnlock={() => goToStep(4)}
          onNext={() => goToStep(4)}
          onBack={() => goToStep(2)}
        />
      );
      break;

    // STEP 5
    case 4:
      page = <BirthdayWelcome {...next(5)} />;
      break;

    // STEP 6
    case 5:
      page = <LittleThings {...next(6)} />;
      break;

    // STEP 7
    case 6:
      page = <FlowerGarden {...next(7)} />;
      break;

    // STEP 8
    case 7:
      page = <Step16 {...next(8)} />;
      break;

    // STEP 9
    case 8:
      page = <MemoryPuzzle onNext={() => goToStep(9)} />;
      break;

    // STEP 10
    case 9:
      page = <FirstMemory {...next(10)} />;
      break;

    // STEP 11
    case 10:
      page = <HeartLetter onNext={() => goToStep(11)} />;
      break;

    // STEP 12
    case 11:
      page = <Step16 {...next(12)} />;
      break;

    // STEP 13
    case 12:
      page = <BeautifulTimeline {...next(13)} />;
      break;

    // STEP 14
    case 13:
      page = <Step16 {...next(14)} />;
      break;

    // STEP 15
    case 14:
      page = <IntroPage6 {...next(15)} />;
      break;

    // STEP 16
    case 15:
      page = <IntroPage7 {...next(16)} />;
      break;

    // STEP 17
    case 16:
      page = <GiftThatWaits {...next(17)} />;
      break;

    // STEP 18
    case 17:
      page = <IntroPage4 {...next(18)} />;
      break;

    // STEP 19
    case 18:
      page = <BirthdayWishStar {...next(19)} />;
      break;

    // STEP 20
    case 19:
      page = <IntroPage5 onNext={() => goToStep(20)} />;
      break;

    // STEP 21
    case 20:
      page = <IntroPage3 {...next(21)} />;
      break;

    // STEP 22 - FINAL PAGE
    case 21:
      page = <FinalLoveNote />;
      break;

    default:
      page = <IntroPage1 {...next(1)} />;
  }

  return (
    <main className="app-step-wrapper" key={currentStep}>
      {page}
    </main>
  );
}

export default App;
