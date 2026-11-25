
import React, { useState } from "react";

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
import StarUniverse from "./pages/StarUniverse/StarUniverse";
import LittleThings from "./pages/LittleThings/LittleThings";
import FlowerGarden from "./pages/FlowerGarden/FlowerGarden";
import GiftThatWaits from "./pages/GiftThatWaits/GiftThatWaits";
import Step16 from "./pages/Step16/Step16";
import FirstMemory from "./pages/FirstMemory/FirstMemory";
import MemoryPuzzle from "./pages/MemoryPuzzle/MemoryPuzzle";
import HeartLetter from "./pages/HeartLetter/HeartLetter";
import OneMoreSurprise from "./pages/OneMoreSurprise/OneMoreSurprise";
import BeautifulTimeline from "./pages/BeautifulTimeline/BeautifulTimeline";

// SPECIAL AND FINAL PAGES
import BirthdayWishStar from "./pages/BirthdayWishStar/BirthdayWishStar";
import FinalLoveNote from "./pages/FinalLoveNote/FinalLoveNote";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (step) => {
    setCurrentStep(step);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  // Supports both onNext and onContinue callbacks
  const next = (step) => ({
    onNext: () => goToStep(step),
    onContinue: () => goToStep(step),
  });

  switch (currentStep) {
    case 0:
      return <IntroPage1 {...next(1)} />;

    case 1:
      return <IntroPage2 {...next(2)} />;

    case 2:
      return <Welcome {...next(3)} />;

    case 3:
      return (
        <BirthdayPortal
          onUnlock={() => goToStep(4)}
          onNext={() => goToStep(4)}
          onBack={() => goToStep(2)}
        />
      );

    case 4:
      return <BirthdayWelcome {...next(5)} />;

    case 5:
      return <IntroPage3 {...next(6)} />;

    case 6:
      return <StarUniverse {...next(7)} />;

    case 7:
      return <LittleThings {...next(8)} />;

    case 8:
      return <IntroPage4 {...next(9)} />;

    case 9:
      return <FlowerGarden {...next(10)} />;

    case 10:
      return <GiftThatWaits {...next(11)} />;

    // GiftThatWaits తర్వాత BirthdayWelcome removed
    case 11:
      return <Step16 {...next(12)} />;

    case 12:
      return <FirstMemory {...next(13)} />;

    case 13:
      return <MemoryPuzzle onNext={() => goToStep(14)} />;

    case 14:
      return <HeartLetter onNext={() => goToStep(15)} />;

    case 15:
      return <OneMoreSurprise {...next(16)} />;

    case 16:
      return <BeautifulTimeline {...next(17)} />;

    // BirthdayWishStar - BeautifulTimeline తర్వాత direct
    case 17:
      return <BirthdayWishStar {...next(18)} />;

    // IntroPage5 - BirthdayWishStar తర్వాత
    case 18:
      return <IntroPage5 onNext={() => goToStep(19)} />;

    // Akka birthday message
    case 19:
      return <IntroPage6 {...next(20)} />;

    // Five special birthday wishes
    case 20:
      return <IntroPage7 {...next(21)} />;

    // Final love note
    case 21:
      return <FinalLoveNote />;

    default:
      return <IntroPage1 {...next(1)} />;
  }
}

export default App;
