import styled from "styled-components";
import { Flex, invertedSelection, btnStyling, btnActive } from '../helpers/Mixins';
import { pageContent } from '../helpers/Layouts';
import { mediaQuery } from '../helpers/MediaQuery';


export const StyledTextGrid = styled.section`
	// ALL SCREEN SIZES //
	${pageContent({})}
	
	.section-content{
		flex: 1 ;
		align-items: normal;
	}
	
	.inner-content{
		${Flex({ flow: "row wrap", align: "normal"})};
		gap: 1vh;
		&.text{
			padding: 0 6vw;
			.content-actual{
				${Flex({ flow: "column", justify: "center" })};
				flex: 1;
				gap: 1.5vh;
			}
		}
		&.grid{
			${Flex({ flow: "column", justify: "center" })};
			padding-left: 6vw;
			padding-right: 6vw;
			
			.grid-container-actual{
				${Flex({ flow: "column"})};
				flex: 1;
				gap: 1vh;

			}

			.grid-section-item{
				display: none;
				border: 1px solid ${({ theme }) => theme.colour_palette.white};
				padding: 1em;
				background-color: transparent;
				cursor: crosshair;
				gap: 1vh;
				.section-header{
					*{
						font-weight: bold;
					}
				}
				&.active-item{
					${Flex({ flow: "column", align: "center", justify: "center" })};
					/* height: calc(100% - 10vw); */
					height:100%;
					text-align: center;
					/* flex: 1; */
				}
			}
			
		}
	}

	.section-btn-toggle {
		&.lhs{
			svg{
				transform: rotate(180deg);
			}
		}
	}

	.mobile-navigation{
		${btnStyling({})} 
		${btnActive({defaultActive: true})} 
		
	}

	// ONLY ON MOBILE //
	@media ${mediaQuery({ type: "max", bp:"laptop" })}{ 
		.section-content{
			flex: 1 0 100%;
			display: none;

			&.active{
				display: flex;
			}
			.inner-content{
				padding: 0 6vw;
				height: auto;
				flex: 1;
			}
			.section-btn-toggle{
				margin-top: auto;
			}
		}
		.contact-form{
			.field-group{
				grid-column: 1 / -1;
				.error-msg{
					display: none;
				}
			}
			label,.label{
				font-size: .8rem;
			}
			input,textarea{
				padding: .5rem;
			}
		}
		

		.form-message-main{
		
			&.success-message{
				margin-top: auto;
			}

		}
	}

	// ONLY ON LAPTOP+ //
	@media ${mediaQuery({})} { 
		align-items: center;
		.inner-content{
			&.grid{
				.grid-container-actual{
					padding-left: initial;

					display: grid;
					grid-gap: 1em;
					grid-template-columns: 1fr 1fr;
					.grid-section-item{
						text-align: left;
						${Flex({ flow: "column", justify: "center" })};
						
						p{
							font-size: .9rem;
						}
						&.active-item{
							margin-bottom: 0;
						}
						&:hover{
							background-color: ${({theme}) => theme.colour_palette.white};
							color: ${({theme}) => theme.colour_palette.primary};
							* ::selection, > ::selection{
								${invertedSelection({})};
							}
						}
					}
				}

			}
		}

		.section-btn-toggle,.mobile-navigation{
			display: none;
		}

	}

	
`
