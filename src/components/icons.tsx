import type { SVGProps } from 'react';

export const Logo = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4500" /> 
                <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
        </defs>
        <g opacity="0.9">
            <rect x="4" y="4" width="10" height="10" rx="2" fill="url(#grad1)" />
            <rect x="10" y="10" width="10" height="10" rx="2" fill="url(#grad1)" fillOpacity="0.8" />
             <rect x="7" y="7" width="10" height="10" rx="2" fill="url(#grad1)" fillOpacity="0.6" />
        </g>
    </svg>
);
