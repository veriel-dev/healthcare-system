import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <rect
        x={2}
        y={2}
        width={44}
        height={44}
        rx={3}
        fill="none"
        stroke="#14b8a6"
        strokeWidth={2}
      />
      <path d="M 24 4 V 44" stroke="#14b8a6" strokeWidth={0.5} strokeOpacity={0.2} />
      <path d="M 4 24 H 44" stroke="#14b8a6" strokeWidth={0.5} strokeOpacity={0.2} />
      <path
        d="M 4 24
    H 12
    L 16 24
    L 18 12
    L 22 36
    L 26 16
    L 30 32
    L 32 24
    L 36 24
    H 44"
        stroke="#14b8a6"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,1000;200,0"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="1;0.7;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <g>
        <circle cx={18} cy={12} r={1} fill="#14b8a6">
          <animate
            attributeName="fill-opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={22} cy={36} r={1} fill="#14b8a6">
          <animate
            attributeName="fill-opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle cx={26} cy={16} r={1} fill="#14b8a6">
          <animate
            attributeName="fill-opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
        <circle cx={30} cy={32} r={1} fill="#14b8a6">
          <animate
            attributeName="fill-opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </circle>
      </g>
    </svg>
  );
};
