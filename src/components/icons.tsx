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
        <path
            d="M8 7.25C8 6.00736 9.00736 5 10.25 5H17C18.1046 5 19 5.89543 19 7V13C19 14.1046 18.1046 15 17 15H10.25C9.00736 15 8 13.9926 8 12.75V7.25Z"
            className="fill-primary"
            fillOpacity="0.8"
        />
        <path
            d="M5 9C5 7.89543 5.89543 7 7 7H13C14.1046 7 15 7.89543 15 9V17C15 18.1046 14.1046 19 13 19H7C5.89543 19 5 18.1046 5 17V9Z"
            className="fill-primary"
        />
    </svg>
);
