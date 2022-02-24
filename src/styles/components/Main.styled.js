import styled from "styled-components";
import { Flex } from '../helpers/Mixins';

export const StyledMain = styled.main`
	/* color: red; */
	/* overflow: hidden; */
	flex: 1;
	${Flex({})};
	height: 100%;
	position: relative;

	&.fixed{
		.inner-section{
			transition: transform .5s ease-in-out;

		}
	}
	.inner-section{
		${Flex({align: "center"})};
		transform: ${({ sliderOffset }) => sliderOffset};
		position: absolute;
		height: 100%;

		&.reversed{
			right: 0;
			flex-flow:row-reverse;
		}
	}
`
