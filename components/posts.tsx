import Image from "next/image";
import Post01 from "@/public/images/popular-post-01.jpg";
import Post02 from "@/public/images/popular-post-02.jpeg";
import Link from "next/link";

export default function Posts() {
  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-5">Popular Posts</h2>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
        <Link
          className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-700 duration-700 hover:duration-100 ease-in-out shadow-xl"
          href="/blog/improve-leadership-with-photography"
        >
          <Image
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src={Post01}
            width={336}
            height={189}
            alt="Popular post 01"
          />
          <div className="h-full relative flex flex-col items-start justify-between before:mt-auto before:flex-1 p-5">
            <div className="flex-1 flex items-center text-lg font-aspekta text-white font-[650]">
              Want To Improve Your Leadership? Learn Photography
            </div>
            <div className="flex-1 w-full flex justify-end items-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">
                <circle
                  className="fill-white"
                  cx="20"
                  cy="20"
                  r="20"
                  fillOpacity=".88"
                />
                <path
                  className="fill-primary"
                  d="m24.765 19.5-6.263-4.375a.626.626 0 0 0-1.002.5v8.75c0 .5.564.812 1.002.5l6.263-4.375a.65.65 0 0 0 0-1Z"
                />
              </svg>
            </div>
          </div>
        </Link>
        <Link
          className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-700 duration-700 hover:duration-100 ease-in-out shadow-xl"
          href="/blog/stop-spam-bots-with-honeypots"
        >
          <Image
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            src={Post02}
            width={336}
            height={189}
            alt="Popular post 02"
          />
          <div className="h-full relative flex flex-col items-start justify-between before:mt-auto before:flex-1 p-5">
            <div className="flex-1 flex items-center text-lg font-aspekta text-white font-[650]">
              How To Stop Form Spam Bots With Honeypot Fields
            </div>
            <div className="flex-1 w-full flex justify-end items-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">
                <circle
                  className="fill-white"
                  cx="20"
                  cy="20"
                  r="20"
                  fillOpacity=".88"
                />
                <path
                  className="fill-sky-500"
                  d="m24.765 19.5-6.263-4.375a.626.626 0 0 0-1.002.5v8.75c0 .5.564.812 1.002.5l6.263-4.375a.65.65 0 0 0 0-1Z"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
