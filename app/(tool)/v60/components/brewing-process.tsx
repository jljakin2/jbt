"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainPlant from "./main-plant";
import { Play, Pause, RotateCcw, CircleCheck } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BrewingStep {
  time: number;
  title: string;
  subTitle: string;
  hint: string;
  gifUrl: string;
}

const brewingSteps: BrewingStep[] = [
  {
    time: 0,
    title: "Add 60g of water",
    subTitle: "Wait until 0:45",
    hint: "This is the bloom phase. Be patient here. This is flavor town, baby 😋",
    gifUrl: "https://djg4kctbfokfu.cloudfront.net/tools/v60/bloom.gif",
  },
  {
    time: 45,
    title: "Pour water in circular motion",
    subTitle: "Aim to reach 300g by 1:15",
    hint: "This is somewhat fast pouring. Keep the water flow steady. No need to be perfect though 🙂.",
    gifUrl: "https://djg4kctbfokfu.cloudfront.net/tools/v60/initial-pour.gif",
  },
  {
    time: 75,
    title: "Continue pouring but slower",
    subTitle: "Aim to reach 500g by 1:45",
    hint: "Your cone should be quite full during this time. This helps to retain the heat ☕.",
    gifUrl: "https://djg4kctbfokfu.cloudfront.net/tools/v60/second-pour.gif",
  },
  {
    time: 105,
    title: "Stir the coffee",
    subTitle: "Stir once in both directions",
    hint: "Make this a calm stir. No tornadoes, please 🌪️.",
    gifUrl: "https://djg4kctbfokfu.cloudfront.net/tools/v60/stir.gif",
  },
  {
    time: 120,
    title: "Give it one last swirl",
    subTitle: "Pick it up and swirl it in your hand",
    hint: "After the coffee has drained a bit, give the cone a good swirl. We want a flat bed of coffee grounds to drain from.",
    gifUrl: "https://djg4kctbfokfu.cloudfront.net/tools/v60/swirl.gif",
  },
  {
    time: 135,
    title: "Let it rest",
    subTitle: "Let gravity do its thing",
    hint: "You've done all the hard work. Congrats 🎊. Now just wait until all the coffee has drained.",
    gifUrl: "https://djg4kctbfokfu.cloudfront.net/tools/v60/rest.gif",
  },
];

interface BrewingProcessProps {
  onRestart: () => void;
}

const stepVariants = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100%",
  },
};

const stepTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function BrewingProcess({ onRestart }: BrewingProcessProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time < 180) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (time >= 180) {
      setIsFinished(true);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    const currentStepIndex = brewingSteps.findIndex((step) => step.time > time);
    const newStep =
      currentStepIndex === -1 ? brewingSteps.length - 1 : currentStepIndex - 1;
    if (newStep !== currentStep) {
      setCurrentStep(newStep);
    }
  }, [time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setHasStarted(true);
  };

  const handleStop = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setCurrentStep(0);
    setIsFinished(false);
    setHasStarted(false);
    onRestart();
  };

  return (
    <div className="w-full max-w-md mx-auto max-h-[90vh] flex flex-col">
      <div className="relative flex-grow">
        <MainPlant className="absolute left-1/2 -translate-x-1/2 -top-52 w-80 z-10" />
        <Card className="bg-white rounded-3xl shadow-xl overflow-hidden relative z-50 h-full flex flex-col">
          <ScrollArea className="p-8 relative flex-grow">
            {!hasStarted ? (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#4a4a4a]">
                  Ready to go?
                </h2>
                <p className="mb-6 text-[#6c6c6c]">
                  You are about to go through a series of steps.
                </p>
                <p className="mb-6 text-[#6c6c6c]">
                  Pay close attention to the timer on the screen and the grams
                  on your scale. The timer will continue as the screen changes.
                </p>
                <p className="mb-6 text-[#6c6c6c]">
                  There will be instructions at each step along with a visual to
                  help you.
                </p>
                <p className="mb-6 text-[#6c6c6c]">
                  No need to be perfect. You'll end up with coffee at the end of
                  this no matter what, so all is good 🤙.
                </p>
                <p className="text-lg font-bold mb-8 text-[#6c6c6c]">
                  You got this!{" "}
                </p>
                <Button
                  className="bg-[#8FA967] hover:bg-[#8fa967e0] text-white rounded-lg transition-all duration-300 ease-in-out"
                  size="lg"
                  onClick={handleStart}
                >
                  <CircleCheck className="w-4 h-4 mr-2" />
                  I'm ready
                </Button>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={isFinished ? "finished" : "brewing"}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={stepVariants}
                  transition={stepTransition}
                >
                  {isFinished ? (
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2 text-[#4a4a4a]">
                        All done. Have a great day 👋
                      </h3>

                      <div className="mb-4 rounded-lg overflow-hidden flex justify-center">
                        <iframe
                          src="https://giphy.com/embed/DrJm6F9poo4aA"
                          width="480"
                          height="280"
                          className="giphy-embed"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <Button
                        className="bg-[#8FA967] hover:bg-[#8fa967e0] text-white rounded-lg transition-all duration-300 ease-in-out mt-8"
                        onClick={handleReset}
                      >
                        Make another cup
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-5xl font-bold mb-3 text-center text-[#4a4a4a]">
                        {formatTime(time)}
                      </h2>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={stepVariants}
                          transition={stepTransition}
                          className="mb-4 text-center"
                        >
                          <h3 className="text-xl font-semibold mb-1 text-[#4a4a4a]">
                            {brewingSteps[currentStep].title}
                          </h3>
                          <p className="text-lg mb-3 text-[#6c6c6c]">
                            {brewingSteps[currentStep].subTitle}
                          </p>
                          <div className="mb-3 rounded-lg overflow-hidden w-3/4 mx-auto">
                            <Image
                              src={brewingSteps[currentStep].gifUrl}
                              alt={`Step ${currentStep + 1}`}
                              width={150}
                              height={112}
                              layout="responsive"
                            />
                          </div>
                          <p className="text-sm text-[#8c8c8c]">
                            {brewingSteps[currentStep].hint}
                          </p>
                        </motion.div>
                      </AnimatePresence>

                      <div className="flex justify-center space-x-8">
                        {isRunning ? (
                          <Button
                            className="bg-[#c97064] hover:bg-[#a85a50] text-white p-6"
                            onClick={handleStop}
                          >
                            <Pause className="w-6 h-6" />
                          </Button>
                        ) : (
                          <Button
                            className="bg-[#7ca982] hover:bg-[#5a7d60] text-white p-6"
                            onClick={handleResume}
                          >
                            <Play className="w-6 h-6" />
                          </Button>
                        )}
                        <Button
                          className="bg-[#6c6c6c] hover:bg-[#4a4a4a] text-white p-6"
                          onClick={handleReset}
                        >
                          <RotateCcw className="w-6 h-6" />
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
