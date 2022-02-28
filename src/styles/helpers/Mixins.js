import { css } from "styled-components"

export const Flex = ({ display, direction, wrap, flow, justify, align}) => css`
	display: ${display ? display : "flex"};
	flex-direction: ${direction ? direction : "row"};
	flex-wrap: ${wrap ? wrap : "initial"};
	flex-flow: ${flow ? flow : "row"};
	flex-grow: ${flow ? flow : "row"};
	justify-content: ${justify ? justify : "normal"};
	align-items: ${align ? align : "normal"};
`;

export const FlexItem = ({grow, shrink, base }) => css`
	flex: ${grow ? grow : "0"} ${shrink ? shrink : "1"} ${base ? base : "auto"};
`;

export const invertedSelection = () => css`
	background: ${({theme}) => theme.colour_palette.primary};
	color: ${({ theme }) => theme.colour_palette.white};
`;


export const linkActive = () => css`
opacity: 1;
transition: opacity 250ms;

	&::before{
		transform: translate3d(0%, 0,0);
		transition: transform 250ms;
	}
`;

export const btnActive = () => css`
opacity: 1;
transition: opacity 250ms;

	color: ${({ theme }) =>  theme.colour_palette.primary };
	background: ${({ theme }) => theme.colour_palette.white };
	.icon{
		path{
			fill: ${({ theme }) =>  theme.colour_palette.primary };
		}
	}
	
`;


export const btnStyling = ({hasBorder = true}) => css`
	${Flex({ flow: "row" , align: "center", justify: "center"})};
	padding: .5rem;
	background: transparent;
	color: ${({ theme }) => theme.colour_palette.white };
	border: ${hasBorder ? ({ theme }) => `1px ${theme.colour_palette.white} solid`  : '1px transparent solid'};
	font-size: .82rem;
	opacity: 1;
	cursor: pointer;
	&::before{
		display: none;
	}
	&.disabled{
		opacity: .3;
	}
	&.hidden{
		display: none !important;
	}
	.icon{
		margin-left: .5em;
		path{
			fill: ${({ theme }) =>  theme.colour_palette.white };
		}
	}

	&.lhs{
		.icon{
			order: -1;
			margin-right: .5em;
			margin-left: 0;
		}
	}
	&:hover{
		${btnActive({})};
	}
	
`;



export const linkStyling = ({ colour, hasPadding = true, isItalic = false}) => css`
	opacity: .8;
	transition: opacity 250ms;
	display: inline-flex;
	position: relative;
	color: ${colour ? colour : ({theme}) => theme.colour_palette.accent};
	font-style: ${isItalic  ? 'italic' : 'initial'};
	padding: ${hasPadding  ? '0 .1em' : ''};
	overflow: hidden;
	&::before{
		content: '';
		height: 1px;
		background-color: ${colour ? colour : ({theme}) => theme.colour_palette.white};
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		transform: translate3d(-100%, 0,0);
		transition: transform 250ms;
	}
	&:hover{
		${linkActive({})};
	}
`;
