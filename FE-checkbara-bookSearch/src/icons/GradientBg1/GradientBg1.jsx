/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

export const GradientBg1 = ({ className }) => {
  return (
    <svg
      className={`gradient-bg-1 ${className}`}
      fill="none"
      height="852"
      viewBox="0 0 393 852"
      width="393"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" clipPath="url(#clip0_101_7753)">
        <g className="g" filter="url(#filter0_f_101_7753)" opacity="0.32">
          <rect className="rect" fill="#5169BE" height="329.143" rx="14" width="329.143" x="379.857" y="66" />
          <rect className="rect" fill="#FF5A5A" height="329.143" rx="77" width="329.143" x="-315" y="66" />
          <path
            className="path"
            d="M148.702 93.6849C170.168 56.7717 223.832 56.7717 245.298 93.6849L372.302 312.088C393.768 349.001 366.936 395.143 324.005 395.143H69.9952C27.0641 395.143 0.232102 349.001 21.6977 312.088L148.702 93.6849Z"
            fill="#00A4E4"
          />
        </g>
      </g>
      <defs className="defs">
        <filter
          className="filter"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="1329.14"
          id="filter0_f_101_7753"
          width="2024"
          x="-815"
          y="-434"
        >
          <feFlood className="fe-flood" floodOpacity="0" result="BackgroundImageFix" />
          <feBlend className="fe-blend" in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
          <feGaussianBlur className="fe-gaussian-blur" result="effect1_foregroundBlur_101_7753" stdDeviation="250" />
        </filter>
        <clipPath className="clip-path" id="clip0_101_7753">
          <rect className="rect" fill="white" height="852" width="393" />
        </clipPath>
      </defs>
    </svg>
  );
};
