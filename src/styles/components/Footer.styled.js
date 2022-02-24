import styled from "styled-components";
import { Flex, FlexItem, btnStyling } from '../helpers/Mixins';
import { mediaQuery } from '../helpers/MediaQuery';
import { Pulsate } from "../helpers/Animations";



export const StyledFooter = styled.footer`
	width: 100%;
	${Flex({justify:"space-between"})};

	padding: 3vh 6vw;
	z-index: 9999999;
	.slide-btn{
		a{
			/* animation: ${Pulsate({minOpacity: .5})} 5s infinite linear; */
			${btnStyling({hasBorder : false})} 
			
			${Flex({align:"center"})};
		
			&.icon-first{
				.icon{
					margin-right: .5em;
				}
			}
			&.icon-last{
				flex-flow: row-reverse;
				.icon{
					margin-left: .5em;
				}
			}
		}
	}
	.slider-wrapper{

		display: none;
		
		
		.selection-area{
			${Flex({align: "center"})};
			margin-right: 2rem;
			position: relative;
			flex: 1;
			min-width: 10vw;

			&:before{
				content: '';
				height: 2px;
				background-color: white;
				position: absolute;
				top: 50%;
				transform: translate(0,-50%);
				left: .5rem;
				width: calc(100% - 1rem);
				opacity: .3;
			}
			.selection-tab{
				flex: 1;
				${Flex({align: "center"})};
				cursor: pointer;
				opacity: .6;
				&.active-tab,&:hover{
					opacity: 1;
					svg{
						transform: scale(1.3);
						transition: transform .3s ease-in-out;
					}
				}
				&.last{
					flex: 0;
				}
				svg{
					width: 1rem;
					transition: transform .3s ease-in-out;

				}
			}
			&.lhs{
				flex-flow: row-reverse;
				.selection-tab{
					&.last{
						flex: 1;
					}
					&.first{
						flex: 0;
					}
				}
			}
		}

		&.rhs{
			justify-content: flex-end;
		}

		&.lhs{
			justify-content: flex-start;
		}
		
	}
	.toggle-next-slide{
		${btnStyling({hasBorder : false})} 
	}

	@media ${mediaQuery({ type: "max" })}{ 
		.number-count{
			display: none;
		}
		
	}
	@media ${mediaQuery({})}{ 
		.slider-wrapper{
			${FlexItem({ shrink: "0", base: "50%", })};
			${Flex({ align: "center" })};
		}
		.toggle-next-slide{
			display: none;
		}
	}
`
