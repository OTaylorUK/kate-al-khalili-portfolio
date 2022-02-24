import styled from "styled-components";
import { Flex, btnStyling } from '../helpers/Mixins';
import { pageContent } from '../helpers/Layouts';
import { mediaQuery } from '../helpers/MediaQuery';


export const StyledDynamicContent = styled.section`
	${pageContent({})};

	.text-content{
		.row{
			${Flex({})};
			margin-bottom: 1em;
			*{
				flex: 1;
			}
			&.production-name{
				margin-bottom: 1.5em;
			}
			.label{
				color: ${({theme}) => theme.colour_palette.grey};
			}
			
		}
	}

	.row{
		.content{
			${Flex({})};
		}
	}

	.number-count{
		display: none;
	}

	.view-the-show{
		${btnStyling({})} 
		padding: .5rem 1rem;
		flex: initial;
	}

	.inner-content .row{
		.content{
			${Flex({justify:"flex-start"})};
		}
		
	}

	@media ${mediaQuery({ type: "max" })}{ 
		.number-count{
			display: flex;
			position: absolute;
			bottom: 1rem;
			right: 1rem;
			span{
				text-shadow: 1px 1px 3px #00000070;
			}
		}
		.inner-content {
			&.text{
				height: 100%;
				justify-content: space-evenly;
			}
			.row{
				&.hide-on-mobile{
					display: none;
				}
				.view-the-show{
					flex: 1;
				}
			}
		}
	}
	/* @media ${mediaQuery({})}{ 
		.inner-content .row{
			&.hide-on-mobile{
				display: none;
			}
			.content{
				${Flex({justify:"flex-star"})};
			}
			.view-the-show{
				flex: initial;
			}
		}
	} */
`
