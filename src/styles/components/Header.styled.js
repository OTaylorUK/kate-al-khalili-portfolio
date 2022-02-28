import styled from "styled-components";
import { Flex, linkActive,linkStyling } from '../helpers/Mixins';
import { mediaQuery } from '../helpers/MediaQuery';
import { menuOpening, menuClose } from "../helpers/Animations";

export const StyledHeader = styled.header`
	width: 100%;
	${Flex({})};
	padding: 3vh 6vw;
	z-index: 9999999;
	position: relative;
	.bg{
		width: 100%;
		height: 100%;
		background-color: ${({theme}) => theme.colour_palette.primary};
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
		display: none;
	}
	&.menu-active,&.toggle-reversing{
		.bg{
			display: block;

		}
	}

	
	
	.mobile_top_nav{
		width: 100%;
		z-index: 4;

		${Flex({ justify: "space-between" })};
		
		.nav-item{
			span{
				font-family: 'Questrial', sans-serif;
				font-weight: 400;
				text-transform: capitalize;
				${linkStyling({colour: ({ theme }) =>   theme.colour_palette.white})};
				${linkActive({})};
				font-size: .9rem;
			}
			
		}


		.close-icon{
			flex: 1;
			width: 2rem;
			background: none;
			border: none;
			height: 100%;

			${Flex({ justify: "flex-end", align: "center" })};
			cursor: pointer;
			
			&.toggle-active{
				.line{
					&:nth-child(1){
						animation: ${menuOpening({level: 1})} 550ms linear forwards;
					}
					&:nth-child(2){
						animation: ${menuOpening({level: 2})} 550ms linear forwards;
					}
					&:nth-child(3){
						animation: ${menuOpening({level: 3})} 550ms linear forwards;
					}
				}
			}
			&.toggle-reversing{
				.line{
					&:nth-child(1){
						animation: ${menuClose({level: 1})} 550ms linear forwards;
					}
					&:nth-child(2){
						animation: ${menuClose({level: 2})} 550ms linear forwards;
					}
					&:nth-child(3){
						animation: ${menuClose({level: 3})} 550ms linear forwards;
					}
				}
			}
			.menu-icon{
				position: relative;
				width: 20px;
				height: 20px;

				.line{
					width: 100%;
					background: ${({ theme }) =>   theme.colour_palette.white};

					display: block;
					height: 2px;
					position: absolute;
					opacity: 1;
					transform-origin: 50% 50%;
					perspective: 20px;
					will-change: transform;
					&:nth-child(1){
						top: 2px;
					}
					&:nth-child(2){
						top: 50%;
					}
					&:nth-child(3){
						top: calc(100% - 2px);
					}
				}
			}
		}
	}

	.main_nav{
		width: 100%;
		top: -1000%;
		.primary-nav-item{
			a{
				line-height: normal;
				${linkStyling({
					colour: ({ theme }) => theme.colour_palette.white,
					hasPadding: false,
					isItalic: false
				})};
			}
		
		}
	}

	@media ${mediaQuery({ type: "max" })}{ 
		&.loaded .main_nav{
			top: -${({ context }) => context.mainHeight};
			transition: top .3s ease-in-out;
		}
		.main_nav{
			${Flex({align:"center", justify:"center"})};
			height: ${({ context }) => context.mainHeight};
			position: absolute;
			background-color: ${({ theme }) => theme.colour_palette.primary};
			opacity: .98;
			z-index: 2;
			left: 0;
			will-change: top;
		
			.primary-nav-item{
				${Flex({align:"center", justify:"center"})};
				margin-bottom: 5vh;
				a{
					font-size: 5vh;
				}
				&.active-page{
					display: none;
				}
			}
			&.menu-active{
				top: 100%;
				
			}
			.navigation{
				${Flex({flow:"column",align:"center", justify:"center"})};
				a{
					font-family: 'Questrial', sans-serif;
					font-weight: 400;
					
				}
			}
		
		}
	}

	@media ${mediaQuery({})}{ 
		.main_nav{
			height: auto;
			.navigation{
				${Flex({})};
				.primary-nav-item{
					${Flex({})};
					margin-bottom: 0;

					&.primary{
						padding-right: 2rem;
					}
					&.secondary{
						margin-left: auto;
					}
					&.active-page a{
						${linkActive({})};
					}
				}
				
			}
		}
		.mobile_top_nav{
			display: none;
		}
	}
`
