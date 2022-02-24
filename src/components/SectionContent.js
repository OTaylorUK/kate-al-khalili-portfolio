import * as React from 'react'
// import { useEffect } from 'react'

import { StyledSectionContent } from "../styles/components/SectionContent.styled";


export const SectionContent = ({ limitWidth, contentType, children,myContainer, classList = '' }) => {
  



  return (
    <StyledSectionContent ref={myContainer} className={`${classList} section-content ${limitWidth ? 'limit-width' : ''} ${contentType ? contentType : ''}`} >
      <div className={`inner-content ${contentType ? contentType : ''}`} >
        {children}
      </div>
    </StyledSectionContent>
  )
}
