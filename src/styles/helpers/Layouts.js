import { css } from "styled-components"
import { Flex, btnStyling } from './Mixins';
import { mediaQuery } from '../helpers/MediaQuery';

export const pageContent = (flexDirection = "column") => css`
	min-width: 100vw;
	max-height: 100%;
	height: 100%;
	overflow: hidden;
	${Flex({ flow: flexDirection })};

	&.reverse-mobile{
		${Flex({ flow: "column-reverse" })};
	}

	> *{
		flex: 1;
		max-width: 100%;

	}


	.section-btn-toggle{
		${btnStyling({})} 
	}
	
	@media ${mediaQuery({})} { 
		flex-flow: row !important;

		
	}
`;
