import * as React from 'react'
import { SliceZone } from '@prismicio/react'
import { components } from '../slices'
// import { useEffect } from 'react'


import { StyledMain } from "../styles/components/Main.styled";

export const Main = ({  position, body, context}) => {

  const { sliderOffset } = context 
  

  return (
    <StyledMain className={`site-main ${context.slideStatus}`} sliderOffset={sliderOffset}>
		<div className={`inner-section ${position === "lhs" ? "reversed" : ""}`}>
			<SliceZone slices={body} components={components} context={context} />
		</div>
    </StyledMain>
  )
}
