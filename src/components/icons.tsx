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
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(var(--accent) / 0.7)" />
            </linearGradient>
        </defs>
        <path
            d="M6 18C4.89543 18 4 17.1046 4 16V9C4 7.89543 4.89543 7 6 7H12C13.1046 7 14 7.89543 14 9V16C14 17.1046 13.1046 18 12 18H6Z"
            fill="url(#grad1)"
        />
        <path
            d="M10 16.5C10 15.3954 10.8954 14.5 12 14.5H18C19.1046 14.5 20 15.3954 20 16.5V16.5C20 17.6046 19.1046 18.5 18 18.5H12C10.8954 18.5 10 17.6046 10 16.5V16.5Z"
            fill="url(#grad2)"
        />
         <path 
            d="M10 7.5C10 6.39543 10.8954 5.5 12 5.5H18C19.1046 5.5 20 6.39543 20 7.5V7.5C20 8.60457 19.1046 9.5 18 9.5H12C10.8954 9.5 10 8.60457 10 7.5V7.5Z"
            fill="url(#grad1)" 
            fillOpacity="0.8"
        />
    </svg>
);
