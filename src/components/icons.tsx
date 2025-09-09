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
                <stop offset="0%" stopColor="hsl(var(--chart-1))" />
                <stop offset="50%" stopColor="hsl(var(--chart-2))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
        </defs>
        <path
            d="M8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3Z"
            fill="url(#grad1)"
        />
        <path
            d="M9 8C9 7.44772 9.44772 7 10 7H14C14.5523 7 15 7.44772 15 8V16C15 16.5523 14.5523 17 14 17H10C9.44772 17 9 16.5523 9 16V8Z"
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.8"
        />
        <path
            d="M7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10V14C17 14.5523 16.5523 15 16 15H8C7.44772 15 7 14.5523 7 14V10Z"
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.8"
        />
    </svg>
);
