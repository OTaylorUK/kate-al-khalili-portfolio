import { createGlobalStyle } from "styled-components";
import { loading} from "./helpers/Animations";
import { linkStyling } from './helpers/Mixins';
import { Typography } from './helpers/Typography';

const GlobalStyles = createGlobalStyle`


	/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
	*/

	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video,button {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		font-style: normal;
		font-weight: normal;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}



	/** Globals */
	* {
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
	}

	::selection {
		background: ${({theme}) => theme.colour_palette.white};
		color: ${({ theme }) => theme.colour_palette.primary};
	}

	a{
		text-decoration: initial;
		color: initial;
		color: ${({ theme }) =>   theme.colour_palette.white};
		position: relative;
		overflow: hidden;
		display: inline-flex;
		${linkStyling({})};

		
	}


	body {
		margin: 0;
		padding: 0;
		color: ${
			({ theme }) =>   theme.colour_palette.white
		};
		font-style: normal;
		font-family: 'Questrial', sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 28px;
		text-rendering: optimizeLegibility;
		-moz-osx-font-smoothing: grayscale;
	}

	${Typography({})}
	
	
	p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		font-family: 'Questrial', sans-serif;
	
	}


	html{
		min-height: 100%;
		height: 100%;
		max-height: 100vh;
		display: flex;
		flex-flow: column;
	
		overflow: hidden;
		position: relative;

		background-color: ${
			({ theme }) =>   theme.colour_palette.primary
		};
		
	}

	body{
		min-height: 100%;
		height: 100%;
		max-height: 100vh;

		overflow: hidden;
		position: relative;
		&:before{
			top: -10rem;
			left: -10rem;
			width: calc(100% + 20rem);
			height: calc(100% + 20rem);
			z-index: 9;
			content: '';
			position: absolute;
			pointer-events: none;
			background-position: 50%;
			background-image: url(https://alitwotimes.com/wp-content/themes/aliali/public/images/noise.png);
		
			pointer-events: none;
			animation: ${loading} 2s linear infinite;
			/* animation: noise 1s steps(2) infinite; */
		}
		> *{
			min-height: 100%;
			height: 100%;
			max-height: 100%;
			#gatsby-focus-wrapper{
				min-height: 100%;
				height: 100%;
				max-height: 100%;
				> *{
					min-height: 100%;
					height: 100%;
					max-height: 100%;
					> *{
						min-height: 100%;
						height: 100%;
						max-height: 100%;
						
					}
				}
			}
		}
	}

	.page-wrapper{
		min-height: 100%;
		height: 100%;
		max-height: 100%;
		display: flex;
		flex-flow: column;
	
		overflow: hidden;
		position: relative;
		
		
	}



`


export default GlobalStyles
