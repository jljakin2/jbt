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
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-background w-[36px] h-[36px]"
            >
              <g clip-path="url(#clip0_728_5823)">
                <path d="M7.74 4.06025C8.2 4.49025 8.69 4.89025 9.16 5.30025C9.63 5.71025 10.1 6.00025 10.57 6.39025C10.8654 6.62962 11.1428 6.89032 11.4 7.17025C11.4257 7.20785 11.459 7.23971 11.4977 7.26383C11.5363 7.28794 11.5796 7.30379 11.6247 7.31036C11.6698 7.31694 11.7157 7.31411 11.7597 7.30204C11.8036 7.28997 11.8446 7.26893 11.88 7.24025C11.9595 7.19248 12.0169 7.11509 12.0394 7.02509C12.0619 6.93508 12.0477 6.83983 12 6.76025C11.7673 6.40648 11.5065 6.07206 11.22 5.76025C10.81 5.29025 10.35 4.85025 9.95 4.44025C9.55 4.03025 9 3.60025 8.48 3.21025C7.96 2.82025 7.22 2.28025 6.58 1.83025C7.22614 1.39492 7.97344 1.13319 8.75 1.07025C9.27634 1.04111 9.80421 1.08146 10.32 1.19025C11.132 1.3414 11.9262 1.57598 12.69 1.89025C13.3417 2.1079 13.9796 2.36504 14.6 2.66025L14.77 2.75025C16.08 3.27025 16.25 3.04025 15.41 2.13025L15 1.87025C14.3814 1.50345 13.7439 1.16965 13.09 0.870251C12.5245 0.608206 11.9394 0.390874 11.34 0.220251C10.7106 0.0543861 10.0606 -0.019712 9.41 0.000250564C8.06878 0.202433 6.7827 0.675356 5.63 1.39025C5.58616 1.49541 5.57807 1.61207 5.60698 1.72227C5.63589 1.83248 5.70019 1.93014 5.79 2.00025C6.44 2.70025 7.06 3.41025 7.74 4.06025Z" />
                <path d="M23.48 12.0006C23.2861 10.9716 22.9317 9.97954 22.43 9.06055C22.302 8.83092 22.1583 8.61039 22 8.40055C20.82 7.67055 20.54 7.83055 21.36 9.12055L21.59 9.52055C21.9599 10.3836 22.2154 11.2913 22.35 12.2206C22.42 12.6906 22.47 13.1606 22.5 13.6206C22.5297 14.0867 22.5297 14.5544 22.5 15.0206C22.4944 15.4825 22.4576 15.9435 22.39 16.4006V16.5406C21.91 15.9706 21.39 15.4106 20.89 14.8906C20.39 14.3706 20.03 14.0706 19.58 13.6806L18.67 12.9406C18.54 12.8306 18.4 12.7306 18.26 12.6306C17.26 12.2206 16.83 12.2706 17.62 13.3506C17.73 13.4706 17.85 13.5806 17.97 13.7006C18.53 14.2506 19.09 14.8206 19.69 15.3306C20.47 16.0006 21.3 16.6006 22.08 17.2506C22.44 17.5406 22.75 17.6306 22.89 17.1306C22.9828 16.9579 23.0598 16.7771 23.12 16.5906C23.2641 16.1196 23.3711 15.6382 23.44 15.1506C23.546 14.6403 23.6062 14.1215 23.62 13.6006C23.6253 13.0639 23.5785 12.5281 23.48 12.0006Z" />
                <path d="M21.66 6.30011C21.7282 6.23088 21.7798 6.14702 21.8107 6.0549C21.8417 5.96277 21.8513 5.8648 21.8388 5.76842C21.8262 5.67204 21.7919 5.57978 21.7384 5.49864C21.6849 5.41749 21.6136 5.3496 21.53 5.30011C21.2054 4.84683 20.8548 4.41277 20.48 4.00011C20.32 3.83011 20.15 3.67011 19.98 3.51011L19.45 3.07011C19.01 2.75011 18.55 2.48011 18.12 2.16011C18.092 2.13138 18.0586 2.10855 18.0217 2.09296C17.9848 2.07737 17.9451 2.06934 17.905 2.06934C17.8649 2.06934 17.8252 2.07737 17.7883 2.09296C17.7514 2.10855 17.7179 2.13138 17.69 2.16011C16.18 3.62011 18.8 0.930111 12.75 6.90011C11.71 7.93344 10.6733 8.96678 9.63999 10.0001L3.35999 16.7101C2.82999 17.2601 1.86999 18.0001 1.21999 18.7701C0.882074 19.1443 0.623533 19.5832 0.459992 20.0601C0.354352 20.4866 0.40398 20.9368 0.599992 21.3301C0.971924 22.0365 1.51519 22.6382 2.17999 23.0801C3.31999 23.8801 4.73999 24.2401 5.53999 23.8201C6.66749 23.194 7.68164 22.3827 8.53999 21.4201C9.84999 20.0401 10.98 18.4201 12.09 17.1001C12.7 16.3601 13.32 15.6301 13.95 14.9201C15.84 12.7901 17.37 11.3901 21.66 6.30011ZM14.13 13.3801C14.0169 13.1965 13.8933 13.0196 13.76 12.8501C13.671 12.7461 13.574 12.6491 13.47 12.5601C13.3655 12.4711 13.2515 12.3939 13.13 12.3301C12.8413 12.1913 12.544 12.0711 12.24 11.9701C12.1763 11.9224 12.0963 11.9019 12.0176 11.9131C11.9388 11.9244 11.8677 11.9665 11.82 12.0301C11.7717 12.0954 11.7509 12.177 11.7621 12.2574C11.7734 12.3378 11.8157 12.4106 11.88 12.4601C12.082 12.7506 12.3025 13.0278 12.54 13.2901C12.6852 13.4273 12.8425 13.5512 13.01 13.6601L13.56 13.9901L13.28 14.2901C12.76 14.8601 12.28 15.4301 11.75 16.0101L11.39 15.6001C11.2867 15.4832 11.1729 15.3761 11.05 15.2801C10.9369 15.1783 10.8166 15.0847 10.69 15.0001C10.37 14.8001 10.05 14.6701 9.68999 14.4801C9.6611 14.4532 9.62719 14.4322 9.5902 14.4184C9.5532 14.4046 9.51385 14.3982 9.47439 14.3996C9.43492 14.401 9.39612 14.4101 9.36019 14.4265C9.32426 14.4429 9.29191 14.4662 9.26499 14.4951C9.23807 14.524 9.2171 14.5579 9.20329 14.5949C9.18947 14.6319 9.18308 14.6713 9.18447 14.7107C9.18586 14.7502 9.19502 14.789 9.21141 14.8249C9.2278 14.8608 9.2511 14.8932 9.27999 14.9201C9.47352 15.2481 9.6943 15.5592 9.93999 15.8501C10.0434 15.9668 10.1572 16.0739 10.28 16.1701C10.4018 16.2714 10.5323 16.3617 10.67 16.4401L11.12 16.7001C10.65 17.2501 10.12 17.8401 9.66999 18.4501C9.57999 18.3201 9.48999 18.2001 9.37999 18.0701C9.30183 17.9786 9.21835 17.8918 9.12999 17.8101C9.03662 17.7311 8.9362 17.6608 8.82999 17.6001C8.56999 17.4401 8.30999 17.3601 8.03999 17.2201C8.01204 17.1914 7.97861 17.1686 7.94168 17.153C7.90475 17.1374 7.86508 17.1293 7.82499 17.1293C7.78491 17.1293 7.74523 17.1374 7.7083 17.153C7.67138 17.1686 7.63795 17.1914 7.60999 17.2201C7.55438 17.2779 7.52332 17.3549 7.52332 17.4351C7.52332 17.5153 7.55438 17.5923 7.60999 17.6501C7.75227 17.9174 7.91265 18.1747 8.08999 18.4201C8.16969 18.5199 8.26025 18.6104 8.35999 18.6901C8.4569 18.7692 8.56064 18.8394 8.66999 18.9001L9.08999 19.1201C8.64999 19.6401 8.19999 20.1201 7.72999 20.6401L7.56999 20.7901L7.36999 20.5101C7.28103 20.4029 7.18409 20.3026 7.07999 20.2101C6.9883 20.1289 6.88765 20.0585 6.77999 20.0001C6.49008 19.848 6.18925 19.7176 5.87999 19.6101C5.81501 19.5624 5.73373 19.5424 5.65403 19.5546C5.57433 19.5668 5.50273 19.6101 5.45499 19.6751C5.40725 19.7401 5.38728 19.8214 5.39947 19.9011C5.41166 19.9808 5.45501 20.0524 5.51999 20.1001C5.71999 20.3601 5.86999 20.6101 6.08999 20.8601C6.17254 20.9542 6.26285 21.0412 6.35999 21.1201C6.46003 21.2056 6.56707 21.2825 6.67999 21.3501L6.89999 21.4901C6.32306 22.0034 5.68489 22.4434 4.99999 22.8001C4.75385 22.8855 4.48614 22.8855 4.23999 22.8001C3.73716 22.6619 3.26305 22.435 2.83999 22.1301C2.40918 21.8281 2.04218 21.4441 1.75999 21.0001C1.68643 20.9083 1.6325 20.8023 1.60154 20.6888C1.57058 20.5753 1.56325 20.4566 1.57999 20.3401C1.75054 19.9032 2.01711 19.5102 2.35999 19.1901C2.99999 18.5801 3.71999 18.0001 4.16999 17.4901C4.61999 16.9801 5.01999 16.5901 5.42999 16.1301C7.05999 14.3201 8.62999 12.4301 10.29 10.6401C11.53 9.29011 12.79 7.97011 14.07 6.64011C15.35 5.31011 16.57 4.08011 17.83 2.80011C18.1306 3.25136 18.4649 3.67925 18.83 4.08011C19.0933 4.34198 19.374 4.58587 19.67 4.81011C20.1 5.15011 20.56 5.44011 20.99 5.81011C21.015 5.8367 21.0458 5.85722 21.08 5.87011C20.49 6.55011 19.88 7.21011 19.27 7.87011C19.1041 7.63897 18.9237 7.41853 18.73 7.21011C18.6242 7.09258 18.5106 6.98233 18.39 6.88011C18.2717 6.77891 18.1445 6.68855 18.01 6.61011C17.69 6.42011 17.37 6.29011 17.01 6.11011C16.9804 6.08319 16.9459 6.06235 16.9083 6.04879C16.8707 6.03522 16.8308 6.0292 16.7908 6.03105C16.7102 6.03481 16.6344 6.07044 16.58 6.13011C16.5256 6.18978 16.4972 6.26861 16.5009 6.34925C16.5047 6.42989 16.5403 6.50574 16.6 6.56011C16.8064 6.87808 17.0335 7.18208 17.28 7.47011C17.39 7.58011 17.5 7.69011 17.62 7.79011L18 8.05011L18.7 8.46011L16.7 10.6201C16.524 10.4009 16.3371 10.1906 16.14 9.99011C16.0339 9.88531 15.9202 9.78839 15.8 9.70011C15.6851 9.61058 15.5611 9.53348 15.43 9.47011C15.12 9.31011 14.8 9.22011 14.43 9.07011C14.3647 9.03377 14.2884 9.02227 14.2152 9.03773C14.1421 9.05318 14.077 9.09456 14.0319 9.15422C13.9869 9.21389 13.9649 9.28783 13.9701 9.36242C13.9752 9.437 14.0072 9.50721 14.06 9.56011C14.2694 9.84136 14.493 10.1117 14.73 10.3701C14.8364 10.4685 14.95 10.5588 15.07 10.6401C15.1851 10.7265 15.3091 10.8003 15.44 10.8601L16.1 11.2001C15.5 11.9101 14.81 12.6501 14.13 13.3801Z" />
              </g>
              <defs>
                <clipPath id="clip0_728_5823">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <h1 className="h1 font-aspekta mb-5">
            I build{" "}
            <span className="inline-flex relative text-primary before:absolute before:inset-0 before:bg-sky-200 before:opacity-30 before:-z-10 before:-rotate-2 before:translate-y-1/4">
              useful tools
            </span>{" "}
            to make work easier.
          </h1>
          <p className="text-lg text-muted-foreground">
            Templates, worksheets, custom apps, and more. It doesn't need to be
            stressful to do quality work.
          </p>
        </div>
      </div>
    </section>
  );
}