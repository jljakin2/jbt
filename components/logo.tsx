import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      width="401"
      height="249"
      viewBox="0 0 401 249"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-foreground ${className}`}
    >
      <g clip-path="url(#clip0_131_20)">
        <circle
          cx="124.397"
          cy="124.397"
          r="121.397"
          stroke="currentColor"
          stroke-width="6"
        />
        <circle
          cx="276.603"
          cy="124.397"
          r="121.397"
          stroke="currentColor"
          stroke-width="6"
        />
        <line
          x1="191.664"
          y1="36.7909"
          x2="219.338"
          y2="48.4574"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="184.334"
          y1="45.7421"
          x2="232.627"
          y2="65.8193"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="175.365"
          y1="57.4025"
          x2="239.666"
          y2="82.9059"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="166.416"
          y1="69.0705"
          x2="246.182"
          y2="101.085"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="161.521"
          y1="82.9031"
          x2="246.171"
          y2="115.732"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="158.276"
          y1="95.1164"
          x2="244.825"
          y2="129.844"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="156.647"
          y1="109.767"
          x2="244.824"
          y2="145.037"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="153.936"
          y1="123.876"
          x2="241.57"
          y2="159.147"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="153.945"
          y1="139.073"
          x2="235.339"
          y2="172.716"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="158.302"
          y1="155.901"
          x2="229.657"
          y2="186.831"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="166.443"
          y1="175.165"
          x2="221.248"
          y2="199.041"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="173.232"
          y1="191.447"
          x2="214.2"
          y2="209.625"
          stroke="currentColor"
          stroke-width="2"
        />
        <line
          x1="186.511"
          y1="207.176"
          x2="206.317"
          y2="215.587"
          stroke="currentColor"
          stroke-width="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_131_20">
          <rect width="401" height="248.794" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Logo;
