import { keyframes } from 'styled-components'

// Create the keyframes
export const loading = keyframes`

0% {
    transform: translate3d(0, 9rem, 0);
}
10% {
    transform: translate3d(-1rem, -4rem, 0);
}
20% {
    transform: translate3d(-8rem, 2rem, 0);
}
30% {
    transform: translate3d(9rem, -9rem, 0);
}
40% {
    transform: translate3d(-2rem, 7rem, 0);
}
50% {
    transform: translate3d(-9rem, -4rem, 0);
}
60% {
    transform: translate3d(2rem, 6rem, 0);
}
70% {
    transform: translate3d(7rem, -8rem, 0);
}
80% {
    transform: translate3d(-9rem, 1rem, 0);
}
90% {
    transform: translate3d(6rem, -5rem, 0);
}
100% {
    transform: translate3d(-7rem, 0, 0);
}

`;

export const menuOpening = ({level}) => keyframes`
0% {
    top: ${
    (level === 1 && "1px") ||
    (level === 3 && "calc(100% - 2px)" )
    };
    transform: rotate(0);
    opacity: 1;
    
}

50% {
    top: 50%;
    transform: rotate(0);
    opacity: ${
    (level === 2 && "0") ||
("1") };
}

100% {
    transform: ${
    (level === 1 && "rotate(45deg)") ||
    (level === 3 && "rotate(-45deg)")
    };
    opacity: ${
    (level === 2 && "0") ||
    ("1") };
    top: 50%;
}

`;


export const menuClose = ({level}) => keyframes`
0% {
    transform: ${
    (level === 1 && "rotate(45deg)") ||
    (level === 3 && "rotate(-45deg)") 
    };
    opacity: ${
    (level === 2 && "0") ||
    ("1") };
    top: 50%;
}

50% {
    top: 50%;
    transform: rotate(0);
    opacity: ${
    (level === 2 && "0") ||
("1") };
}

100% {
   
    top: ${
    (level === 1 && "1px") ||
    (level === 3 && "calc(100% - 2px)") 
    };
    transform: rotate(0);
    opacity: 1;
    
}

`;



export const Pulsate = ({minOpacity = 0}) => keyframes`
from { opacity: 1; }
50% { opacity: ${minOpacity}; }
to { opacity: 1; }
`;
