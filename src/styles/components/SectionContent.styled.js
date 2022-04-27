import styled from "styled-components";
import { Flex } from '../helpers/Mixins';
import { mediaQuery } from '../helpers/MediaQuery';

export const StyledSectionContent = styled.div`
	${Flex({ align: "center" })};


	.inner-content{
		flex: 1;
		&.text{
			${Flex({justify: "center", flow: "column"})};
			padding-right: 6vw;
			padding-left: 6vw;

			.row{
				${Flex({})};
				margin-bottom: 1em;
				&.column{
					flex-flow: column;
					/* p:nth-last-child(1){
						display: none;
					} */
				}
				&.header{
					margin-bottom: .5vh;
				}
				&.sub-header{
					margin-bottom: 1vh;
					*{
						/* text-transform: uppercase; */
						color: ${({ theme }) => theme.colour_palette.grey};

					}
				}
			
				&.split-row{
					${Flex({ align: "center" })};
					margin-bottom: 1vh;
					*{
						font-size: .95em;
					}
					.label{
						flex: 1;
						padding-right: 1rem;
						color: ${({ theme }) => theme.colour_palette.grey};
					}
					.content{
						flex: 1;
						${Flex({ align: "center" })};
						*{
							margin: 0;
						}
					}

				}
				&:nth-last-child(1){
					margin-bottom: 0;
				}
			}
		}
		&.image{
			${Flex({align:"center"})};
			height: 100%;
			max-height: 70%;
			min-height: 100%;
			position: relative;
			.wrapper{
				height: 100%;

				flex: 1;
				.gatsby-image-wrapper{
					height: 100%;
					/* > div:nth-child(1){
							padding-top: 0 !important;
						} */
					img{
						/* position: relative !important; */
						&[aria-hidden="true"]{
							position: absolute !important;
						}
					}
				}
			}
		}
	}

	@media ${mediaQuery({ type: "max" })}{ 
		&.text{
			flex: 1;
			.inner-content{
				padding-top: 4vh;
				padding-bottom: 1vh;
			}
		}

		.inner-content{
		
			&.image{
				min-height: 100%;
				.wrapper{
					height: 100%;
					.gatsby-image-wrapper{
						height: 100%;
						/* > div:nth-child(1){
							padding-top: 0 !important;
						} */
					}
				}
			}

			.row{
				&.hide-on-mobile{
					display: none;
				}
			
			}
		}
	}


	@media ${mediaQuery({})} { 

		&.limit-width{
			max-width: 45%;
		}
		.inner-content{
			&.text{
				flex: 1;
				.row{
					&.column{
						p:nth-last-child(1){
							display: initial;
						}
					}
					&.header{
						margin-bottom: .2em;
					}
					&.sub-header{
						margin-bottom: 3vh;
					}
				}
			}
			&.image,&.grid,&.form{
				flex: 1;
			}
			&.image{
				min-height: 100%;
			
				.wrapper{
					height: auto;
					.gatsby-image-wrapper{
						img{
							height: auto;
						}
					}
				}
			}
		}
		
	}
`
