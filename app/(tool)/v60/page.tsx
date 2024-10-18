import Link from "next/link";
import StarterCard from "./components/starter-card";
import Logo from "@/components/logo";
import { HandHeart, Heart } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function v60Page() {
  return (
    <>
      <header className="bg-[#f8f3e7] w-full h-16 px-4 z-20">
        <div className="container flex justify-between mx-auto">
          <Link href="/">
            <span className="sr-only">Home</span>
            <Logo className="w-14 h-14" />
          </Link>
          <Popover>
            <PopoverTrigger>
              <Button
                size="icon"
                variant="ghost"
                className="text-[#858585] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[##f8f3e7] hover:bg-[#f8f3e7] hover:text-[#7ca982]"
              >
                <Heart className="w-6 h-6 " />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="text-sm w-fit"
              side="bottom"
              align="end"
              sideOffset={2}
            >
              <h4 className="font-bold">Much love for the illustrations ❤️</h4>
              <p>
                The plants are from{" "}
                <a
                  href="https://www.vecteezy.com/free-vector/plant"
                  className="text-[#7ca982] hover:text-[#5a7d60] transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Vecteezy
                </a>
                .
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      <div className="bg-[#f8f3e7] text-[#3c3c3c] flex justify-center items-center p-4 h-[calc(100svh-64px)]">
        <StarterCard />
      </div>
    </>
  );
}
