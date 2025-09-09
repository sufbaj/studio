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
            d="M21 15C21 17.7614 18.7614 20 16 20H8C5.23858 20 3 17.7614 3 15V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V15Z"
            fill="url(#grad1)"
        />
        <path
            d="M12 7L13.5279 10.4721L17 12L13.5279 13.5279L12 17L10.4721 13.5279L7 12L10.4721 10.4721L12 7Z"
            fill="hsl(var(--primary-foreground))"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="0.5"
            strokeLinejoin="round"
        />
    </svg>
);