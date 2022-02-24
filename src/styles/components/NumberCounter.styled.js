import styled from "styled-components";
import { Flex, FlexItem } from '../helpers/Mixins';

export const StyledNumberCounter = styled.div`
	padding-left: 5vw;
	${Flex({justify: "flex-end"})};
	flex: 0;

	font-size: 1.7rem;
	span{
		font-family: 'Poppins', sans-serif;
		color: ${({ theme }) => theme.colour_palette.white};
		font-size: 1em;
		&.divider{
			padding: .2em;
		}
		&.last-number{
			font-size: .9em;

		}
	}
`
