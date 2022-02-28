import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Slider } from './Slider'
import { StyledFooter } from "../styles/components/Footer.styled";
import Svg from 'react-inlinesvg';


export const Footer = ({ count, theme, position, context, currentSlide}) => {

  const bgColour = theme.colour_palette.primary;

  const queryData = useStaticQuery(graphql`
    {
      prismicFooter {
        data {
          links {
            icon {
              gatsbyImageData
            }
            uid
            keytext
            url {
              url
              target
            }
          }
        }
      }
    }
  `)

  const { links } = queryData.prismicFooter.data;

  let direction, iconFirst

  const numLinks = links.length - 1;


  return (
    <StyledFooter className={`site-footer`}>

     {links.map((item, index) => {
      const { url, keytext, uid, icon } = item;
       let classList = ["slide-btn"];
       
       if (context.currentSlide === 1) {
        classList.push('visible')
       }
      const {src: iconSVG} = icon.gatsbyImageData.images.fallback;

       
       const finalClass = classList.join(" ");
       
       if ((position === "lhs") || (position === "home" && index === numLinks) ) {
        direction = "left"
        iconFirst = false;
       } else if ((position === "rhs") || (position === "home" && index === 0)){
        direction = "right"
        iconFirst = true;
       }
       
       if ((context.nicePageName) && (uid === context.nicePageName) && (uid !== "home")) {
         return (
           <Slider
             key={uid}
             position={position}
             context={context}
             icon={iconSVG}
           />
         );
       }
      return (
        <div
          key={uid}
          className={finalClass}
        >
          <AniLink
            cover
            direction={direction}
            bg={bgColour}
            to={url.url}
            className={iconFirst ? "icon-first" : "icon-last"}
          >
            <Svg className="icon" no-cors="true" src={iconSVG} width="16px" height="16px" title="Menu" />
          
            {keytext}
          </AniLink>
        </div>
      )
     })}
      
    

    </StyledFooter>
  )
}
