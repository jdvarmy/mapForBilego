import styled from 'styled-components';

export const $css = {
    sizes: {
        containerH: 645 + 'px;'
    },
    animation: {
        duration: 500,
        name: {
            in: 'animation-name: fade-in;',
            inLeft: 'animation-name: in-left;',
            out: 'animation-name: fade-out;',
            outLeft: 'animation-name: out-left;'
        }
    }
};

export const Animation = styled('div')`
    animation-duration: ${props=>props.fast ? $css.animation.duration /3 : $css.animation.duration}ms;
    animation-timing-function: cubic-bezier(0,0,0.88,1);
    animation-fill-mode: both; 
    ${props=>props.loading ? $css.animation.name.in : $css.animation.name.out}
`;
export const AnimationLeft = styled('div')`
    transform: translateX(-103%);
    transition: transform ${props=>props.fast ? $css.animation.duration /3 : $css.animation.duration}ms cubic-bezier(0,0,0.88,1);
    will-change: transform;
`;