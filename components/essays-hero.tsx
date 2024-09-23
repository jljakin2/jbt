import Image from "next/image";
import HeroImage from "@/public/images/content-typewriter.svg";

export default function EssaysHero() {
  return (
    <section>
      <div className="max-w-[700px]">
        <div className="pb-10">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-5 shadow-md">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-background w-[36px] h-[36px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1048_7398)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.7 17.41C6.63 17.69 10.15 17.88 10.41 17.89C12.2 17.97 13.14 17.89 15.88 17.76C16.26 17.7 16.95 17.9 16.96 17.4C16.97 16.9 16.27 17.07 15.88 16.99C13.7143 16.7592 11.5323 16.7224 9.36 16.88C7.79 17 6.5 16.94 6.7 17.41Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.66001 14.88C6.85001 14.22 6.30001 13.55 5.32001 13.82C4.75001 13.98 4.81001 14.98 5.23001 15.29C5.3451 15.3771 5.47888 15.4362 5.62076 15.4626C5.76264 15.4891 5.90873 15.4821 6.04746 15.4424C6.1862 15.4026 6.31377 15.3311 6.42008 15.2335C6.5264 15.1358 6.60854 15.0148 6.66001 14.88Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.15 18C5.34 17.34 4.79 16.68 3.8 16.95C3.23 17.1 3.29 18.11 3.71 18.41C3.82525 18.4991 3.95982 18.5599 4.10287 18.5875C4.24593 18.6151 4.39345 18.6086 4.53357 18.5687C4.67369 18.5289 4.80247 18.4566 4.90954 18.3578C5.01662 18.259 5.09898 18.1365 5.15 18Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.43 14.88C14.62 14.22 14.07 13.55 13.08 13.82C12.51 13.98 12.57 14.98 12.99 15.29C13.1059 15.377 13.2405 15.4361 13.383 15.4625C13.5256 15.4889 13.6723 15.482 13.8117 15.4423C13.9512 15.4026 14.0795 15.3312 14.1868 15.2337C14.2941 15.1361 14.3773 15.0151 14.43 14.88Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.89 14.83C11.08 14.17 10.53 13.51 9.54001 13.77C8.97001 13.93 9.03001 14.94 9.45001 15.24C9.56595 15.327 9.70046 15.3861 9.84302 15.4125C9.98557 15.4389 10.1323 15.432 10.2717 15.3923C10.4112 15.3526 10.5395 15.2812 10.6468 15.1836C10.7541 15.0861 10.8373 14.9651 10.89 14.83Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.65 14.83C18.84 14.17 18.29 13.51 17.3 13.77C16.74 13.93 16.8 14.94 17.21 15.24C17.3252 15.3291 17.4598 15.3899 17.6029 15.4175C17.7459 15.4451 17.8934 15.4386 18.0336 15.3988C18.1737 15.3589 18.3025 15.2866 18.4095 15.1878C18.5166 15.089 18.599 14.9665 18.65 14.83Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.9 18.3C19.0152 18.3891 19.1498 18.4499 19.2929 18.4775C19.4359 18.5051 19.5835 18.4986 19.7236 18.4587C19.8637 18.4189 19.9925 18.3466 20.0995 18.2478C20.2066 18.149 20.289 18.0265 20.34 17.89C20.53 17.23 19.98 16.57 18.99 16.83C18.43 17 18.48 18 18.9 18.3Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.25 7.65001C5.12 6.65001 4.92 5.38001 4.87 4.25001C5.98 4.70001 7.79 5.25001 8.72 4.62001C9.3 4.22001 9.16 3.46001 8.82 1.29001C11.44 1.19001 14.04 1.06001 16.08 1.16001C16.5117 1.13175 16.9452 1.15863 17.37 1.24001C18.03 1.74001 18.03 5.58001 18.04 7.68001C18.04 8.54001 18.74 8.53001 18.76 7.68001C18.82 5.68001 18.85 4.40001 18.76 3.41001C18.8213 2.59239 18.7088 1.77105 18.43 1.00001C18.3387 0.772372 18.1872 0.573902 17.9916 0.425908C17.7961 0.277915 17.5639 0.18599 17.32 0.160006C15 -0.259994 8.21 0.260006 7.73 0.290006C6.58 0.410006 4.4 1.88001 4.11 3.20001C3.92 4.02001 4.48 6.72001 4.66 7.74001C4.67868 7.81185 4.72332 7.87422 4.78531 7.91505C4.84729 7.95589 4.92222 7.9723 4.9956 7.96111C5.06898 7.94991 5.1356 7.91191 5.18259 7.85445C5.22958 7.79699 5.2536 7.72415 5.25 7.65001ZM7.81 1.33001H8.06C8.11702 2.12231 8.11702 2.9177 8.06 3.71001C7.00214 3.93626 5.90398 3.88806 4.87 3.57001C5 2.58001 7 1.37001 7.81 1.33001Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.8 21.37C23.5276 20.2419 23.1284 19.1483 22.61 18.11C21.55 16.28 21.34 14.42 19.78 13.11L20 13C20.69 14 23.09 14.16 23.48 12.91C23.5451 12.6338 23.5451 12.3462 23.48 12.07C23.4651 11.679 23.4851 11.2874 23.54 10.9C23.5128 10.3229 23.412 9.75156 23.24 9.19999C22.93 8.43999 22.32 8.02999 21.1 8.13999C20.31 8.20999 19.5 8.41999 19.48 9.20999C16.3222 9.04441 13.1578 9.04441 10 9.20999C9.33 9.20999 8.61 9.14999 7.91 9.13999C7.21 9.12999 6.3 9.28999 4.22 9.35999C4.32 8.43999 3.6 8.16999 2.67 8.07999C2.24797 7.95986 1.79636 8.00076 1.40278 8.19478C1.00921 8.38879 0.701728 8.72209 0.540001 9.12999C0.283701 10.4033 0.219656 11.7077 0.350001 13C0.401462 13.1129 0.477584 13.2128 0.572767 13.2924C0.667949 13.3721 0.77977 13.4293 0.900001 13.46C1.30838 13.5822 1.73811 13.616 2.16057 13.5591C2.58303 13.5022 2.98851 13.3559 3.35 13.13C3.49339 13.2243 3.6526 13.2921 3.82 13.33C1.88 15.76 1.19 18.23 0.370001 21.1C0.0700008 22.1 -0.139999 23.44 0.880001 23.73C2.32 24.14 6.05 23.88 8.69 23.86C10.89 23.86 14 24.07 16.5 23.98C22.19 23.74 24.32 24.82 23.8 21.37ZM20.07 9.14999C20.16 8.85999 21.56 8.88999 21.94 9.14999C22.32 9.40999 22.28 10.25 22.35 10.66C22.77 12.83 22.35 12.97 21.35 12.87C21.1044 12.8531 20.8639 12.7921 20.64 12.69C20.46 12.6 20.47 12.69 20.44 12.5C21.13 11.59 21.03 9.71999 20.02 9.34999C20.0282 9.28149 20.045 9.21429 20.07 9.14999ZM3.12 10.91C2.96532 11.4388 2.92442 11.9943 3 12.54C2.7287 12.6711 2.4313 12.7391 2.13 12.7391C1.8287 12.7391 1.5313 12.6711 1.26 12.54C1.52 9.21999 1.4 8.99999 2.61 8.88999C3.82 8.77999 3.54 9.13999 3.61 9.40999C3.12 9.58999 3.22 10.54 3.12 10.91ZM3.76 12.57C3.57 12.5 3.59 12.22 3.59 12.02C3.59 11.82 3.75 10.09 3.77 10.02C15.41 10.17 16.77 9.87999 19.01 10.24C19.16 10.24 19.55 10.55 19.69 10.47C19.763 10.7993 19.763 11.1407 19.69 11.47C19.43 12.64 17.46 12.34 15.85 12.47C15.47 12.47 15.08 12.53 14.69 12.56C14.6 11.56 12.91 10.16 11.17 10.47C10.556 10.5631 9.98434 10.839 9.52948 11.2617C9.07462 11.6845 8.75768 12.2345 8.62 12.84C6.99806 13.0717 5.34629 12.9799 3.76 12.57ZM14 12.6C12.45 12.66 10.89 12.65 9.34 12.78C9.34 12.65 9.65 12.3 10.18 11.98C11.65 11.07 13.74 11.85 14 12.6ZM22.91 22.4C22.84 23.09 23.84 23 8.64 22.74C6.08 22.8 2.27 23.11 1.09 22.82C0.860001 22.76 1.09 21.55 1.17 21.32C1.89 18.46 2.49 15.96 4.41 13.52C6.05969 13.8158 7.74262 13.8797 9.41 13.71C10.93 13.63 12.41 13.71 13.97 13.71C14.5 13.71 18.31 13.53 19.03 13.36C19.4879 13.7262 19.8744 14.1737 20.17 14.68C20.84 15.83 21.17 17.2 21.86 18.53C22.1216 19.0957 22.3486 19.6768 22.54 20.27C19.54 20.6 14.93 20.09 11.35 20.09C8.45162 20.2982 5.54451 20.3583 2.64 20.27C2.56842 20.2737 2.50052 20.3028 2.44858 20.3522C2.39665 20.4016 2.36411 20.4679 2.35686 20.5393C2.34961 20.6106 2.36812 20.6821 2.40905 20.7409C2.44998 20.7998 2.51063 20.842 2.58 20.86C5.49301 21.1626 8.42185 21.2862 11.35 21.23C12.96 21.23 19.82 21.53 22.74 20.91C22.8901 21.3918 22.9577 21.8956 22.94 22.4H22.91Z"
                />
              </g>
            </svg>
          </div>

          <h1 className="h1 font-aspekta mb-5">
            Thoughts on{" "}
            <span className="inline-flex relative text-primary before:absolute before:inset-0 before:bg-sky-200 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
              building
            </span>{" "}
            and{" "}
            <span className="inline-flex relative text-primary before:absolute before:inset-0 before:bg-sky-200 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
              selling
            </span>{" "}
            quality tech products.
          </h1>
          <p className="text-lg text-muted-foreground">
            Coding, design, creativity, product, marketing, copywriting, you
            name it. I explore only the most valuable ideas so you can become
            the best builder and seller.
          </p>
        </div>
      </div>
    </section>
  );
}
