import ProjectCard from "@/app/project-card";

const featuredTools = [
  {
    id: 0,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.77 14.1597C23.35 13.7497 22.46 13.9297 21.9 13.9297L17.19 14.1097C17.75 13.6897 15.4 7.78968 13.64 3.88968L13.52 3.46968C14.469 3.00517 15.5135 2.76888 16.57 2.77968C16.57 3.99968 19 9.40968 19.85 11.2997C19.85 11.3797 20.77 13.5997 20.85 13.6797C20.9166 13.7415 21.0041 13.7759 21.095 13.7759C21.1859 13.7759 21.2734 13.7415 21.34 13.6797C21.54 13.4797 20.62 10.8797 20.65 10.9597C17.65 3.15968 17.65 1.86968 16.93 1.75968C15.93 1.61968 14.14 2.45968 13.28 2.90968C12.42 3.35968 13.08 4.14968 13.42 5.43968C13.5 5.66968 13.47 5.52968 13.14 5.52968C12.6155 5.54741 12.0935 5.61098 11.58 5.71968C11.37 4.71968 10.97 4.57968 10.37 4.50968C9.61988 4.45468 8.86613 4.47478 8.12 4.56968C7.86048 4.56544 7.60155 4.59571 7.35 4.65968C7.5 3.36968 7.35 2.78968 6.24 2.37968C5.06349 1.93317 3.77115 1.89443 2.57 2.26968C1.95 2.48968 1.66 2.81968 1.57 3.79968C1.52 4.32968 1.62 13.9397 1.97 14.9297C1.422 15.0368 0.881001 15.177 0.350002 15.3497C-0.449998 15.6297 0.420002 17.3497 0.830002 18.1597C1.4 19.2697 0.830003 18.6597 3.17 18.6497C2.84131 19.3102 2.68317 20.0424 2.71 20.7797C2.81 21.7797 3.63 22.5597 5.39 22.1397C6.65 21.7597 6.19 20.2497 6.13 19.3597C6.13 19.2397 6.03 18.7797 5.98 18.5797C7.45 18.5097 8.83 18.4297 10.86 18.2297C11.93 18.1197 13.03 18.2297 14.11 18.1697C14.99 18.1697 16.06 17.9297 17.46 17.7697C17.3999 18.6653 17.3999 19.564 17.46 20.4597C17.4 21.0897 17.64 21.5197 18.46 21.7797C18.8533 21.9468 19.2898 21.9836 19.7055 21.8846C20.1212 21.7856 20.4942 21.5561 20.77 21.2297C21.15 20.6097 20.91 18.4697 20.77 17.7597C21.3856 18.0098 22.0744 18.0098 22.69 17.7597C23.2314 17.3487 23.5904 16.7421 23.69 16.0697C23.71 15.6997 24.32 14.7097 23.77 14.1597ZM7.25 5.37968C7.96669 5.28203 8.69331 5.28203 9.41 5.37968C9.67309 5.40184 9.93395 5.44532 10.19 5.50968C10.28 5.50968 10.51 5.50968 10.47 5.58968C10.21 5.99968 11 13.9997 11 13.9997C11.055 14.0381 11.119 14.0616 11.1857 14.0681C11.2524 14.0745 11.3197 14.0636 11.381 14.0365C11.4424 14.0093 11.4957 13.9669 11.5358 13.9131C11.5759 13.8594 11.6014 13.7962 11.61 13.7297C11.76 12.8597 11.73 7.66968 11.71 7.24968C11.63 6.16968 11.55 6.24968 12.96 6.32968C13.0586 6.33907 13.1558 6.35918 13.25 6.38968C13.3362 6.7497 13.3732 7.11973 13.36 7.48968C13.56 8.94968 13.36 9.65968 13.69 11.8897L13.86 13.3097C13.94 13.6397 13.77 14.1297 14.19 14.0897C14.68 14.2297 14.71 13.8897 14.62 9.15968C14.81 9.69968 15.03 10.2197 15.27 10.7397C16.84 14.2297 16.66 14.0497 16.76 14.1097C13.4227 14.0249 10.0833 14.1418 6.76 14.4597C6.75 14.3297 7.2 5.75968 7.25 5.37968ZM2.66 4.16968C2.85 1.99968 6.15 3.69968 6.24 3.65968C6.2909 4.28026 6.2674 4.90469 6.17 5.51968C6.11 6.41968 6 10.7897 6.17 13.1697C6.17 13.6497 6.08 14.0697 6.07 14.5097C4.89776 14.5354 3.72852 14.639 2.57 14.8197C2.43 14.2397 2.62 6.48968 2.66 4.16968ZM5.26 20.5597C5.26 20.6597 5.2 21.0097 5.1 21.0297C4.77148 21.1098 4.42852 21.1098 4.1 21.0297C3.1 20.7297 3.86 18.8797 3.62 18.5997C5.48 18.5997 5.23 18.5097 5.26 18.5997C5.08 18.7597 5.43 18.9997 5.26 20.5597ZM19.87 20.5597C19.79 20.7497 18.76 20.7497 18.46 20.6197C18.46 20.5197 18.33 19.9397 18.01 17.6897C18.6757 17.6387 19.3443 17.6387 20.01 17.6897C19.8987 18.6488 19.8519 19.6143 19.87 20.5797V20.5597ZM22.51 15.7497C22.32 16.5297 22.24 16.9297 21.51 16.7497C19.38 16.2397 16.93 16.7497 14.81 17.0997C13.53 17.2997 12.08 17.1597 10.74 17.3197C9.4 17.4797 7.82 17.6497 6.36 17.7597C6.1 17.7597 1.48 18.0897 1.36 17.8597C1.24 17.6297 1.19 16.1697 0.780002 15.9197C3.33 15.1697 6.02 15.4397 8.78 15.2497C11.87 15.0397 14.94 15.2497 17.51 15.2497C20.94 15.2497 21 15.0097 22.51 15.1797C22.52 15.4297 22.52 15.6997 22.51 15.7697V15.7497Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.69 10.4492H4.27C4.1378 10.458 4.00699 10.4814 3.88 10.5192C3.57 10.5992 3.31 10.7292 2.99 10.8092C2.91218 10.8118 2.83842 10.8446 2.7843 10.9005C2.73019 10.9565 2.69996 11.0314 2.7 11.1092C2.69964 11.1865 2.72815 11.2611 2.77994 11.3185C2.83174 11.3758 2.90309 11.4117 2.98 11.4192C3.34311 11.5341 3.71958 11.6013 4.1 11.6192C4.31604 11.6229 4.53151 11.5959 4.74 11.5392C5.05 11.4792 5.34 11.3592 5.65 11.3092C5.69335 11.3119 5.73682 11.306 5.77789 11.2919C5.81897 11.2778 5.85685 11.2557 5.88937 11.2269C5.92189 11.1981 5.9484 11.1632 5.96738 11.1241C5.98637 11.085 5.99745 11.0426 6 10.9992C6.00555 10.9106 5.97623 10.8234 5.91831 10.7561C5.86038 10.6888 5.77844 10.6469 5.69 10.6392C5.363 10.5462 5.02833 10.4826 4.69 10.4492Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.2 10.4492H8.76C8.61785 10.4571 8.477 10.4805 8.34 10.5192C8 10.5992 7.72 10.7292 7.34 10.8092C7.26857 10.8222 7.20396 10.8598 7.15745 10.9156C7.11093 10.9713 7.08545 11.0416 7.08545 11.1142C7.08545 11.1868 7.11093 11.2571 7.15745 11.3129C7.20396 11.3686 7.26857 11.4062 7.34 11.4192C7.73399 11.5336 8.14017 11.6007 8.55 11.6192C8.78253 11.6234 9.01459 11.5965 9.24 11.5392C9.57 11.4792 9.88 11.3592 10.24 11.3092C10.3214 11.2953 10.3953 11.253 10.4486 11.1899C10.5018 11.1268 10.531 11.0468 10.531 10.9642C10.531 10.8816 10.5018 10.8017 10.4486 10.7385C10.3953 10.6754 10.3214 10.6331 10.24 10.6192C9.89856 10.5342 9.55073 10.4774 9.2 10.4492Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.47 8.62984C17.3637 8.65757 17.26 8.69437 17.16 8.73984C17.0611 8.78684 16.9673 8.8438 16.88 8.90984C16.67 9.06984 16.52 9.25984 16.3 9.41984C16.2385 9.45382 16.192 9.50971 16.1697 9.57641C16.1475 9.64311 16.1512 9.71572 16.18 9.77984C16.23 9.93984 16.38 10.0398 16.49 9.99984C16.8037 10.0096 17.1172 9.97249 17.42 9.88984C17.5809 9.83211 17.7325 9.75126 17.87 9.64984C18.09 9.49984 18.27 9.31984 18.49 9.17984C18.5615 9.14512 18.617 9.08425 18.6449 9.0098C18.6728 8.93535 18.6711 8.85303 18.64 8.77984C18.6231 8.70018 18.5764 8.62998 18.5095 8.58353C18.4426 8.53708 18.3606 8.51788 18.28 8.52984C18.0068 8.5279 17.7345 8.56152 17.47 8.62984Z"
        />
      </svg>
    ),
    slug: "https://jeffbuildstech.gumroad.com/l/commonplace-book",
    title: "Digital Commonplace Book",
    excerpt:
      "A simple Notion template that stores all your notes, ideas, books, swipe files, etc into one place.",
    isNew: false,
    isPopular: true,
  },
  {
    id: 0,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <g clipPath="url(#clip0_728_2109)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.5599 3.93996C23.5404 3.88889 23.5109 3.84224 23.4731 3.80274C23.4353 3.76324 23.3901 3.73169 23.3399 3.70996C23.2699 3.70996 23.1099 3.70996 23.0399 3.64996L22.5299 3.50996L20.9999 3.12996H20.8999C20.9883 2.88124 21.0618 2.62745 21.1199 2.36996C21.2081 1.99229 21.2617 1.60736 21.2799 1.21996C21.3039 0.97053 21.3039 0.719381 21.2799 0.469956C21.2481 0.341689 21.1825 0.224289 21.0899 0.129956C21.0085 0.0599845 20.909 0.014416 20.8029 -0.00150593C20.6967 -0.0174278 20.5882 -0.00305602 20.4899 0.0399556C20.1699 0.139956 19.4199 0.489956 19.3499 0.519956C18.7599 0.789956 18.1599 1.04996 17.5999 1.34996C17.2074 1.56411 16.8298 1.80466 16.4699 2.06996C16.2085 2.22879 15.9609 2.40943 15.7299 2.60996C15.6106 2.70263 15.5204 2.82756 15.4699 2.96996C15.3642 3.30284 15.3135 3.65075 15.3199 3.99996C15.3199 4.55996 15.4099 5.17996 15.4599 5.69996L14.9999 6.07996C14.5545 6.47707 14.1305 6.89767 13.7299 7.33996C12.8194 8.37278 11.9744 9.46157 11.1999 10.6C11.1504 10.6684 11.1291 10.7532 11.1402 10.8369C11.1514 10.9206 11.1942 10.9969 11.2599 11.05C11.2933 11.0757 11.3315 11.0946 11.3723 11.1055C11.413 11.1164 11.4556 11.1191 11.4974 11.1136C11.5392 11.108 11.5795 11.0942 11.616 11.073C11.6525 11.0518 11.6844 11.0236 11.7099 10.99C12.6115 9.94191 13.5661 8.94061 14.5699 7.98996C14.9799 7.58996 15.4199 7.21996 15.8599 6.83996H15.9499C16.3099 6.83996 16.6699 6.95996 17.0299 7.03996C17.3686 7.12119 17.7024 7.22135 18.0299 7.33996C18.2605 7.4342 18.4978 7.51108 18.7399 7.56996C18.9336 7.59973 19.1318 7.57191 19.3099 7.48996C19.6364 7.3195 19.9418 7.11142 20.2199 6.86996C20.7381 6.344 21.2964 5.8592 21.8899 5.41996C22.1099 5.26996 22.5999 5.06996 22.9599 4.83996C23.1772 4.71874 23.3624 4.5473 23.4999 4.33996C23.5404 4.28259 23.567 4.21653 23.5774 4.14708C23.5878 4.07762 23.5818 4.00669 23.5599 3.93996ZM16.1199 4.07996C16.2299 3.19996 16.5599 3.21996 17.0399 2.91996C17.3783 2.69424 17.7288 2.48726 18.0899 2.29996C18.6399 1.99996 19.1999 1.72996 19.7699 1.44996L20.4099 1.09996C20.4124 1.14325 20.4124 1.18666 20.4099 1.22996C20.4387 1.56267 20.4387 1.89724 20.4099 2.22996C20.3687 2.49967 20.3119 2.76678 20.2399 3.02996C20.2399 3.02996 20.2399 3.02996 20.1599 3.02996C18.8396 3.52922 17.5866 4.19098 16.4299 4.99996L16.0799 5.27996C16.0717 4.87953 16.085 4.47895 16.1199 4.07996ZM21.3799 4.54996C21.1629 4.66903 20.9586 4.80974 20.7699 4.96996C20.4199 5.24996 20.0999 5.57996 19.7699 5.89996C18.6399 7.02996 18.8599 6.66996 18.2999 6.53996C17.9204 6.45307 17.5365 6.38632 17.1499 6.33996L16.4699 6.26996L16.6099 6.14996C20.5399 2.87996 20.4999 3.53996 22.2099 4.19996C21.8899 4.32996 21.5599 4.44996 21.3799 4.54996Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.3599 9.99983C10.4328 9.98392 10.4965 9.93968 10.5368 9.87686C10.5771 9.81403 10.5908 9.73776 10.5749 9.66483C10.559 9.5919 10.5147 9.52827 10.4519 9.48795C10.3891 9.44763 10.3128 9.43392 10.2399 9.44983C9.94953 9.51267 9.6749 9.63368 9.43256 9.80554C9.19023 9.97741 8.98522 10.1966 8.8299 10.4498C8.65725 10.7231 8.55342 11.0342 8.52729 11.3564C8.50117 11.6786 8.55353 12.0023 8.6799 12.2998C8.83982 12.6457 9.08721 12.9438 9.39763 13.1648C9.70805 13.3858 10.0707 13.5219 10.4499 13.5598C10.8137 13.6038 11.1828 13.5645 11.5293 13.445C11.8758 13.3254 12.1905 13.1288 12.4499 12.8698C12.5075 12.8071 12.5395 12.725 12.5395 12.6398C12.5395 12.5546 12.5075 12.4726 12.4499 12.4098C12.3888 12.3529 12.3084 12.3212 12.2249 12.3212C12.1414 12.3212 12.061 12.3529 11.9999 12.4098C11.8017 12.549 11.576 12.6441 11.338 12.689C11.1 12.7338 10.8552 12.7273 10.6199 12.6698C10.4098 12.624 10.2138 12.5284 10.0484 12.3909C9.88306 12.2534 9.75323 12.0781 9.6699 11.8798C9.5838 11.7287 9.53442 11.5595 9.52574 11.3858C9.51705 11.2121 9.54931 11.0388 9.6199 10.8798C9.67931 10.6917 9.77525 10.5171 9.90223 10.3661C10.0292 10.2151 10.1847 10.0906 10.3599 9.99983Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8799 8.07016C11.8856 8.03334 11.8838 7.99576 11.8747 7.95963C11.8657 7.9235 11.8495 7.88954 11.8271 7.85973C11.8048 7.82993 11.7767 7.80489 11.7446 7.78608C11.7124 7.76726 11.6768 7.75505 11.6399 7.75016C11.2643 7.70958 10.8855 7.70958 10.5099 7.75016C10.124 7.77786 9.74376 7.85862 9.37991 7.99016C8.57353 8.27802 7.8645 8.78711 7.33395 9.45914C6.8034 10.1312 6.47277 10.939 6.37991 11.7902C6.27748 12.6781 6.50082 13.573 7.00843 14.3087C7.51605 15.0444 8.27344 15.5708 9.13991 15.7902C10.1797 16.0964 11.2895 16.0681 12.3124 15.7092C13.3352 15.3503 14.2194 14.679 14.8399 13.7902C15.2739 13.2799 15.5608 12.6611 15.6699 12.0002C15.7054 11.6384 15.6641 11.2732 15.5486 10.9286C15.4332 10.5839 15.2462 10.2675 14.9999 10.0002C14.9744 9.96656 14.9425 9.93834 14.906 9.91713C14.8695 9.89591 14.8292 9.88212 14.7874 9.87654C14.7456 9.87097 14.7031 9.87372 14.6623 9.88463C14.6215 9.89555 14.5833 9.91442 14.5499 9.94016C14.5166 9.96477 14.4886 9.9958 14.4675 10.0314C14.4464 10.067 14.4327 10.1065 14.4271 10.1475C14.4215 10.1885 14.4242 10.2302 14.435 10.2702C14.4458 10.3101 14.4644 10.3475 14.4899 10.3802C14.6713 10.5811 14.8101 10.8167 14.8977 11.0728C14.9854 11.329 15.0202 11.6002 14.9999 11.8702C14.8842 12.3969 14.6364 12.8855 14.2799 13.2902C13.72 13.9841 12.9637 14.493 12.1099 14.7502C11.2711 15.0202 10.3687 15.0202 9.52991 14.7502C8.89291 14.5946 8.3332 14.2149 7.95311 13.6806C7.57302 13.1462 7.39795 12.493 7.45991 11.8402C7.49052 11.1507 7.70881 10.4827 8.09122 9.90816C8.47364 9.33366 9.00567 8.87448 9.62991 8.58016C9.93443 8.45607 10.2538 8.37204 10.5799 8.33016C10.9116 8.28351 11.2482 8.28351 11.5799 8.33016C11.6167 8.33288 11.6537 8.32831 11.6887 8.3167C11.7237 8.30509 11.7561 8.28668 11.784 8.26252C11.8118 8.23836 11.8347 8.20892 11.8511 8.17591C11.8676 8.1429 11.8774 8.10696 11.8799 8.07016Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.34 14.0896C17.2932 14.0199 17.2208 13.9713 17.1384 13.9545C17.0561 13.9376 16.9705 13.9538 16.9 13.9996C16.8644 14.0219 16.8337 14.0512 16.8097 14.0857C16.7858 14.1202 16.7691 14.1592 16.7607 14.2003C16.7523 14.2415 16.7523 14.2839 16.7608 14.325C16.7692 14.3662 16.786 14.4052 16.81 14.4396C17.3426 15.3004 17.7659 16.2242 18.07 17.1896C18.2996 17.7605 18.3587 18.3858 18.24 18.9896C18.0541 19.3911 17.7461 19.7236 17.36 19.9396C16.7062 20.3168 16.0118 20.6187 15.29 20.8396L11.77 22.0396C10.7552 22.4728 9.68484 22.7623 8.59 22.8996C7.90299 22.9639 7.21146 22.8394 6.59 22.5396C6.51247 22.4868 6.45035 22.4143 6.41 22.3296C6.3 22.1596 6.23 21.9796 6.15 21.8296C5.93 21.4096 5.72 20.9796 5.52 20.5396C5.32 20.0996 5.14 19.6596 4.96 19.2096C4.08 17.0096 3.05 14.5896 2.26 12.1496C1.73497 10.5724 1.36325 8.94821 1.15 7.29962C1.14626 7.26277 1.13525 7.22702 1.11761 7.19446C1.09996 7.16189 1.07603 7.13315 1.0472 7.1099C1.01836 7.08664 0.985202 7.06934 0.949636 7.059C0.91407 7.04865 0.876804 7.04546 0.839998 7.04962C0.766627 7.05961 0.699856 7.09728 0.653372 7.15492C0.606889 7.21256 0.584214 7.2858 0.589998 7.35962C0.770565 9.05323 1.10529 10.7268 1.59 12.3596C2.3 14.8396 3.24 17.3596 4.05 19.5696C4.22 20.0396 4.4 20.4996 4.61 20.9596C4.82 21.4196 5.02 21.8696 5.25 22.3096C5.37591 22.6026 5.53352 22.8809 5.72 23.1396C5.84462 23.2949 6.0016 23.4212 6.18 23.5096C6.95302 23.8874 7.81146 24.0564 8.67 23.9996C9.86414 23.8284 11.0286 23.4919 12.13 22.9996L15.6 21.6996C16.378 21.432 17.1228 21.0764 17.82 20.6396C18.3523 20.3194 18.7664 19.8352 19 19.2596C19.1475 18.5001 19.0675 17.7139 18.77 16.9996C18.4134 15.9751 17.9332 14.9979 17.34 14.0896Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.88995 6.86984C0.950498 6.83242 0.995167 6.77403 1.01545 6.7058C1.03574 6.63757 1.03022 6.56427 0.99995 6.49984C0.952901 6.35943 0.942908 6.20924 0.970939 6.06383C0.998971 5.91842 1.06408 5.78271 1.15995 5.66984C1.35845 5.40924 1.59829 5.18291 1.86995 4.99984C1.86995 5.35984 1.96995 5.70984 2.03995 6.06984C2.23995 7.06984 2.49995 8.11984 2.69995 9.13984C2.87995 9.98984 3.05995 10.8498 3.27995 11.7098C3.61995 12.9998 3.99995 14.2798 4.44995 15.5198C5.15643 17.5002 6.00877 19.4255 6.99995 21.2798C6.92672 21.2854 6.85318 21.2854 6.77995 21.2798C6.70477 21.2875 6.63552 21.3241 6.58696 21.382C6.5384 21.4399 6.51435 21.5145 6.51995 21.5898C6.52248 21.6266 6.53227 21.6626 6.54873 21.6956C6.5652 21.7286 6.58803 21.758 6.61591 21.7822C6.64379 21.8064 6.67616 21.8248 6.71118 21.8364C6.7462 21.848 6.78316 21.8526 6.81995 21.8498C8.02472 21.8216 9.221 21.6402 10.3799 21.3098C10.8399 21.1798 11.2899 21.0398 11.7399 20.8798C12.3999 20.6398 13.0499 20.3598 13.7399 20.0998C14.5799 19.7198 15.4199 19.3598 16.2399 18.9698C16.7999 18.6998 17.3399 18.4298 17.8799 18.1198C17.9522 18.0795 18.006 18.0128 18.0302 17.9336C18.0543 17.8545 18.0468 17.769 18.0092 17.6953C17.9717 17.6215 17.9071 17.5652 17.8289 17.5381C17.7507 17.511 17.6651 17.5152 17.59 17.5498C17.04 17.7998 16.4899 18.0198 15.9299 18.2298C15.0799 18.5398 14.2199 18.8298 13.3499 19.1198L11.0499 19.9998C10.2999 20.2898 9.55995 20.5998 8.78995 20.8298C8.42995 20.9398 8.05995 21.0398 7.67995 21.1198C6.98336 19.5756 6.36589 17.9969 5.82995 16.3898C5.40995 15.1998 4.99995 13.9998 4.66995 12.7098C4.33995 11.4198 3.90995 10.1998 3.57995 8.99984C3.29995 7.99984 2.99995 6.99984 2.67995 5.99984C2.56995 5.57984 2.46995 5.15984 2.38995 4.73984C2.65995 4.57984 2.94995 4.42984 3.26995 4.26984L3.65995 4.10984L4.33995 4.99984C4.41995 5.10984 4.49995 5.26984 4.57995 5.39984C4.64355 5.48855 4.72124 5.56624 4.80995 5.62984C4.94375 5.73335 5.11132 5.78326 5.27995 5.76984C5.59557 5.75639 5.90976 5.71962 6.21995 5.65984C6.53126 5.62158 6.83895 5.55803 7.13995 5.46984C7.77995 5.26984 8.39995 4.99984 9.04995 4.84984C9.33898 4.7916 9.62314 4.71137 9.89995 4.60984C10.0609 4.55334 10.2006 4.44858 10.2999 4.30984C10.3774 4.16763 10.4251 4.01111 10.4399 3.84984C10.4399 3.60984 10.4399 3.30984 10.4899 3.12984C10.5307 2.83619 10.5908 2.54556 10.6699 2.25984C10.6699 2.11984 10.7499 1.99984 10.7899 1.85984L11.7899 1.67984C12.0399 1.67984 12.2399 1.89984 12.4299 2.16984C12.7699 2.68056 13.0454 3.23142 13.2499 3.80984C13.2753 3.89065 13.3316 3.95812 13.4066 3.99749C13.4815 4.03685 13.5691 4.04489 13.6499 4.01984C13.7293 3.99238 13.7951 3.93572 13.8341 3.86141C13.8731 3.7871 13.8824 3.70072 13.8599 3.61984C13.6423 2.8486 13.3049 2.11634 12.8599 1.44984C12.7348 1.26218 12.5653 1.10831 12.3664 1.0019C12.1676 0.895489 11.9455 0.839822 11.7199 0.839844C11.3599 0.839844 10.9699 0.919844 10.5799 0.979844H10.4999C9.37676 1.14082 8.26463 1.37127 7.16995 1.66984C6.27473 1.92063 5.3963 2.22792 4.53995 2.58984C3.96439 2.83758 3.40347 3.11804 2.85995 3.42984C1.04995 4.47984 -5.02616e-05 5.68984 0.51995 6.71984C0.550675 6.78748 0.606184 6.84074 0.675027 6.86865C0.743871 6.89656 0.820801 6.89699 0.88995 6.86984ZM4.88995 3.55984C5.68995 3.25984 6.55995 2.97984 7.42995 2.71984C8.29995 2.45984 9.12995 2.23984 9.93995 2.04984C9.82995 2.34984 9.72995 2.65984 9.64995 2.96984C9.49995 3.64984 9.64995 3.62984 8.77995 3.83984L6.02995 4.63984C5.09995 4.88984 5.29995 4.88984 4.89995 4.48984L4.27995 3.79984L4.88995 3.55984Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_728_2109">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    slug: "https://jeffbuildstech.gumroad.com/l/100-days-goal-tracker",
    title: "'100 Days' Goal Tracker",
    excerpt:
      "Have a goal you want to accomplish? You can use this simple worksheet to plan out the next 100 days of accomplishing your goal.",
    isNew: true,
  },
];

export default function FaeturedTools() {
  return (
    <section>
      <h2 className="font-aspekta text-xl font-[650] mb-5">Popular Tools</h2>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
        {featuredTools.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
