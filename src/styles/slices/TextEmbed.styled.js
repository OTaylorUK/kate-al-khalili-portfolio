import styled from "styled-components";
import { pageContent } from '../helpers/Layouts';
import { Flex } from '../helpers/Mixins';
import { mediaQuery } from '../helpers/MediaQuery';


export const StyledTextEmbed = styled.section`

	// ALL SCREEN SIZES //
	${pageContent({flexDirection: 'row'})}
	height: 100%;

	.section-content{
		flex: 1 ;
		align-items: normal;
	}

	.inner-content{
		&.form{
			${Flex({ flow: "column", justify:"center"})};
			height: 90%;
			padding: 0 6vw ;
		}
		.text-content{
			${Flex({ flow: "column", justify:"center"})};
			flex: 1;
		}
	}

	.contact-form{
		width: 100%;
		align-items: center;
		justify-content: center;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-content: center;
		flex: 1;
		grid-gap: 2vh;
		.field-group{
			${Flex({ flow: "column" })};
			align-self: stretch;
			
			label,.label{
				font-family: 'Poppins',sans-serif;
			}
			input,textarea{
				border: transparent;
				border-bottom: ${({ theme }) =>  `1px ${theme.colour_palette.white} solid` };
				font-family: 'Questrial', sans-serif;
				font-size: .95em;
			}
			.error-msg{
				font-size:.8rem;
				color: red;
			}
			&.field-error{
				input,textarea,.styled-input{
					background-color: #ff00000f;
					border-bottom-color: red;
				}
				
			}

			.field-wrapper{
				${Flex({ flow: "row" })};
				margin-top: .5rem;
				input{
						display: none;
					}
				.styled-input{
					${Flex({ flow: "row", align: "center", justify:"center" })};
					border: ${({ theme }) =>  `1px ${theme.colour_palette.white} solid` };

					padding: .2rem;
					width: auto;
					height: auto;
					margin-top: .8em;
					margin-right: 1rem;

				
				
					svg{
						max-width: 20px;
						max-height: 20px;
						width: 20px;
						height: 20px;
					}
					.label,.label{
						font-size: .9rem;
					}
				}

				&.gdpr{
					align-items: flex-start;
				}
				&:hover,&.is-active{
					cursor:pointer;
					.styled-input{
						background-color: ${({ theme }) =>  theme.colour_palette.white };
						svg{
							path{
								fill: ${({ theme }) =>  theme.colour_palette.primary };
							}
						}

					}
				}
			}
		}
		.submit-btn{
			padding: .3rem;
			font-size: .85rem;
			background: transparent;
			border: ${({ theme }) => `1px ${theme.colour_palette.white} solid` };
			cursor:pointer;
			&:hover{
				background: ${({ theme }) => theme.colour_palette.white };
				color: ${({ theme }) => theme.colour_palette.primary };
			}
		}
	}
	
	.form-message-main{
		padding: 2rem;
		h1{
			margin-bottom: 2rem;
		}
		&.success-message{
			background: #5cfd5c30;
		}
		&.error-message{
			background: #fd645c30;
			margin-bottom: 1rem;
		}

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
				max-width: 100%;
				grid-column: 1 / -1;
				.error-msg{
					display: none;
				}
			}
			label,.label{
				font-size: .8rem;
				margin-bottom: .2rem;
				line-height: 140%;
			}
			input,textarea{
				padding: .5rem;
				max-width: 100%;
				min-width: 100%;
				max-height: 20vh;
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
		.inner-content.form{
			padding: 0 6vw 0 0;

		}
		.section-btn-toggle{
			display: none;
		}

		.contact-form{
			grid-gap: 3rem 2rem;
			.field-group{
				&.full{
					grid-column: 1 / -1;
				}
			}
			label,.label{
				font-size: 1em;
				margin-bottom: .5rem;
			}
			input,textarea{
				padding: 1rem;
			}
		}
	}
`
