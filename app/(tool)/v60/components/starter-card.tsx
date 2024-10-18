"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BrewingProcess from "./brewing-process";
import MainPlant from "./main-plant";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import illustrations
import V60 from "./illustrations/v60";
import Beans from "./illustrations/beans";
import Kettle from "./illustrations/kettle";
import Scale from "./illustrations/scale";
import Cup from "./illustrations/cup";
import { Coffee, ThumbsUp } from "lucide-react";

export default function StarterCard() {
  const [showInventory, setShowInventory] = useState(false);
  const [startBrewing, setStartBrewing] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const inventoryItems = [
    {
      name: "V60 dripper and filter paper",
      icon: <V60 className="w-12 h-12" />,
    },
    {
      name: "30g of medium ground coffee",
      icon: <Beans className="w-12 h-12" />,
    },
    {
      name: "500ml of hot water in kettle",
      icon: <Kettle className="w-12 h-12" />,
    },
    { name: "Food scale", icon: <Scale className="w-12 h-12" /> },
    { name: "Favorite mug", icon: <Cup className="w-12 h-12" /> },
  ];

  useEffect(() => {
    const checkScrollable = () => {
      if (contentRef.current) {
        setIsScrollable(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [showInventory]);

  const handleRestart = () => {
    setShowInventory(false);
    setStartBrewing(false);
  };

  if (startBrewing) {
    return <BrewingProcess onRestart={handleRestart} />;
  }

  return (
    <div className="w-full max-w-md mx-auto max-h-[90vh] flex flex-col">
      <div className="relative flex-grow">
        <MainPlant className="absolute left-1/2 -translate-x-1/2 -top-52 w-80 z-10" />
        <Card className="bg-white rounded-3xl shadow-xl overflow-hidden relative z-50 h-full flex flex-col py-1">
          <ScrollArea
            ref={contentRef}
            className={`p-8 relative flex-grow ${
              isScrollable ? "overflow-y-auto" : ""
            }`}
          >
            {!showInventory && (
              <>
                <h1 className="text-3xl font-bold mb-6 text-center text-[#4a4a4a]">
                  It's coffee time 😄
                </h1>
                <p className="mb-8 text-center text-[#6c6c6c]">
                  Craft the perfect v60 pour-over based on this{" "}
                  <a
                    href="https://www.youtube.com/watch?v=AI4ynXzkSQo"
                    target="_blank"
                    className="text-[#8FA967] hover:text-[#acc782] transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    guide
                  </a>{" "}
                  from James Hoffman.
                </p>
              </>
            )}
            {!showInventory ? (
              <div className="flex justify-center">
                <Button
                  className="bg-[#8FA967] hover:bg-[#8fa967e0] text-white rounded-lg transition-all duration-300 ease-in-out"
                  onClick={() => setShowInventory(true)}
                  size="lg"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl text-center font-semibold mb-8 text-[#4a4a4a]">
                  You're gonna need some stuff
                </h2>
                <div className="grid grid-cols-3 gap-4 my-12">
                  {inventoryItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="mb-2">{item.icon}</div>
                      <p className="text-sm text-center text-[#707070]">
                        {item.name}
                      </p>
                    </div>
                  ))}
                  <div className="col-span-3 flex justify-center mt-4 md:mt-10">
                    {inventoryItems.slice(3).map((item, index) => (
                      <div
                        key={index + 3}
                        className="flex flex-col items-center px-6"
                      >
                        <div className="mb-2">{item.icon}</div>
                        <p className="text-sm text-center text-[#707070]">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-[#8FA967] hover:bg-[#8fa967e0] text-white rounded-lg transition-all duration-300 ease-in-out"
                    onClick={() => setStartBrewing(true)}
                    size="lg"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Got all my stuff
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
