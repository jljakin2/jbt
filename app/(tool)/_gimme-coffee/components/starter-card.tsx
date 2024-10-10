import { Button } from "@/components/ui/button";

export default function StarterCard() {
  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="p-8 relative">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#4a4a4a]">
          V60 Coffee Helper
        </h1>
        <p className="text-lg mb-8 text-center text-[#6c6c6c]">
          Craft the perfect pour-over with our step-by-step guide
        </p>
        <div className="flex justify-center">
          <Button className="bg-[#7ca982] hover:bg-[#5a7d60] text-white text-lg py-6 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Start Brewing
          </Button>
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-[#8c8c8c]">
            Elevate your coffee experience
          </p>
        </div>
      </div>
    </div>
  );
}
