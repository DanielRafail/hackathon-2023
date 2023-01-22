import styled, { ThemeProvider } from "styled-components";


function StarryNight() {


  return (
    <Container>
        <Inner>
            <Stars>{createStars()}</Stars>
            <Stars>{createStars()}</Stars>
            <Stars>{createStars()}</Stars>
            <Extra>
                <defs>
                    <radialGradient id="comet-gradient" cx="0" cy=".5" r="0.5">
                        <stop offset="0%" stop-color="rgba(255,255,255,.8)"></stop>
                        <stop offset="100%" stop-color="rgba(255,255,255,0)"></stop>
                    </radialGradient>
                </defs>
                <g transform="rotate(-135)">
                    <Comet fill="url(#comet-gradient)" cx="100%" cy="0" rx="150" ry="2"/>
                </g>
                <g transform="rotate(20)">
                    <CometB fill="url(#comet-gradient)" cx="100%" cy="0" rx="150" ry="2"/>
                </g>
                <g transform="rotate(300)">
                    <CometC fill="url(#comet-gradient)" cx="100%" cy="0" rx="150" ry="2"/>
                </g>
            </Extra>
        </Inner>
    </Container>
  );
}

const createStars = () => {
    const stars = [];

    for (let i = 0; i < 200; i++) {
        const cx = Math.round(Math.random() * 10000) / 100 + '%';
        const cy = Math.round(Math.random() * 10000) / 100 + '%';
        const r = Math.round((Math.random() + 0.5) * 10) / 10;

        const star = <Star cx={cx} cy={cy} r={r}/>
        stars.push(star)
    }

    return stars;
};

const Container = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
`

const Inner = styled.div`
    position: relative;
	pointer-events: none;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(#16161d, #1f1f3a, #3b2f4a);
	overflow: hidden;
`

const Stars = styled.svg`
    position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    width: 100%;
    height: 100%;
    preserveAspectRatio: none;

    animation: twinkle var(--twinkle-duration) ease-in-out infinite;
    
    &:nth-child(2) {
		animation-delay: calc(var(--twinkle-duration) * -0.33);
	}
	&:nth-child(3) {
		animation-delay: calc(var(--twinkle-duration) * -0.66);
	}

	@keyframes twinkle {
		25% {
			opacity: 0;
		}
	}
`

const Star = styled.circle`
	fill: white;

    &:nth-child(3n) {
        opacity: 0.8;
    }
    &:nth-child(7n) {
        opacity: 0.6;
    }
    &:nth-child(13n) {
        opacity: 0.4;
    }
    &:nth-child(19n) {
        opacity: 0.2;
    }
`

const Extra = styled.svg`
    width: 100%;
    height: 100%;
    preserveAspectRatio: none;
`

const Comet = styled.ellipse`
    transform-origin: center center;
	animation: comet 10s linear infinite;

	@keyframes comet {
		0%,
		40% {
			transform: translateX(0);
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		60%,
		100% {
			transform: translateX(-100vmax);
			opacity: 0;
		}
	}
`

const CometB = styled(Comet)`
    animation-delay: -3.3s;
`

const CometC = styled(Comet)`
    animation-delay: -5s;
`

export default StarryNight;
