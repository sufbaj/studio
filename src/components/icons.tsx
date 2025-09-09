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
            d="M21 15C21 17.7614 18.7614 20 16 20H8C5.23858 20 3 17.7614 3 15V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V15Z"
            fill="url(#grad1)"
        />
        <path
            d="M8 18V21.5C8 21.7761 7.77614 22 7.5 22H7C6.44772 22 6 21.5523 6 21V18H8Z"
            fill="url(#grad1)"
        />
        <path
            d="M12 7L13.5279 10.4721L17 12L13.5279 13.5279L12 17L10.4721 13.5279L7 12L10.4721 10.4721L12 7Z"
            fill="url(#grad2)"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="0.5"
            strokeLinejoin="round"
        />
    </svg>
);
