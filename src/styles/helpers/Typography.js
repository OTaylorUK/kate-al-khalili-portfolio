import { css } from "styled-components"
import { mediaQuery } from '../helpers/MediaQuery';


const fontSizes = {
	h1: {
		mobile: '1.6rem',
		laptop: '2rem',
	},
	h2: {
		mobile: '1rem',
		laptop: '1.3rem'
	},
	h3: {
		mobile: '1rem',
		laptop: '1.1rem'
	},
	h4: {
		mobile: '.7rem',
		laptop: '.9rem'
	},
	h5: {
		mobile: '.7rem',
		laptop: '.7rem'
	},
	h6: {
		mobile: '.65rem',
		laptop: '.65rem'
	},
	
}


export const Typography = () => css`
	h1,h2,h3,h4,h5,h6 {
		font-family: 'Poppins', sans-serif;
		line-height: 140%;
		margin-bottom: .3em;
	}

	h1{
		font-size: ${fontSizes.h1.mobile};
	}
	h2{
		font-size: ${fontSizes.h2.mobile};
	}
	h3{
		font-size: ${fontSizes.h3.mobile};
	}
	h4{
		font-size: ${fontSizes.h4.mobile};
	}
	h5{
		font-size: ${fontSizes.h5.mobile};
	}
	h6{
		font-size: ${fontSizes.h6.mobile};
	}

	@media ${mediaQuery({})} { 
		h1{
			font-size: ${fontSizes.h1.laptop};
		}
		h2{
			font-size: ${fontSizes.h2.laptop};
		}
		h3{
			font-size: ${fontSizes.h3.laptop};
		}
		h4{
			font-size: ${fontSizes.h4.laptop};
		}
		h5{
			font-size: ${fontSizes.h5.laptop};
		}
		h6{
			font-size: ${fontSizes.h6.laptop};
		}
	}


	p{
		margin-bottom: .5em;
		font-size: .95em;
		line-height: 150%;
		@media ${mediaQuery({})} { 
			font-size: 1em;
		}
		
	}
	.small{
		font-size: .9em;
	}

`;
