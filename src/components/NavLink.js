// Header.js file 

import * as React from 'react'
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { useRef } from 'react'
import { useEffect } from 'react';


export const NavLink = ({ pathName,  headerVals, finalClass,finalNavClass, direction, bgColour, linkURL, linkText }) => {

  const linkRef = useRef(null);


  
  

  useEffect(() => {
    const triggerClick = () => {
      headerVals.setSimulateClick(false)
      linkRef.current.children[0].click()
    }
   

    if (headerVals.simulateClick) {
      if (headerVals.simulateTarget === pathName) {
        triggerClick()
      }
    }
  
  }, [headerVals, pathName]);
  
  return (
    <li  ref={linkRef}  className={finalClass} >
      <AniLink className={finalNavClass} cover direction={direction} bg={bgColour}  to={linkURL}>
        {linkText}
      </AniLink>
    </li>
  )
}
