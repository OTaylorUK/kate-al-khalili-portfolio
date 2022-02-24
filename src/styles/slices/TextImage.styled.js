import styled from "styled-components";
// import { Flex } from '../helpers/Mixins';
import { pageContent } from '../helpers/Layouts';
import { mediaQuery } from '../helpers/MediaQuery';


export const StyledTextImage = styled.section`
	
	// ALL SCREEN SIZES //
	${pageContent({})}
	&.home{
		.row{
			&.header{
				*{
					font-size: 2.3rem;
					margin: 0;
				}
			}
		}
	}
	
	// ONLY ON MOBILE //
	@media ${mediaQuery({ type: "max", bp:"laptop" })}{ 
		.inner-content .row{
			&.hide-on-mobile{
				display: none;
			}
			&.show-on-mobile{
				display: flex;
			}
		}
		
	}

	// ONLY ON LAPTOP+ //
	@media ${mediaQuery({})} { 
		.inner-content .row{
			&.header{
				*{
					font-size: 3rem;
				}
			}
			&.show-on-mobile{
				display: none;
			}
			&.hide-on-mobile{
				display: flex;
			}
		}
	}
`
