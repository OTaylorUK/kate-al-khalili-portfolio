import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import { GatsbyImage } from "gatsby-plugin-image";
import { SectionContent } from '../components/SectionContent'

import { StyledTextImage } from "../styles/slices/TextImage.styled"
import { useRef,useEffect,useState } from 'react';

export const TextHome = ({slice, context, index }) => {

  const slideNum = index + 1;

  let classList = ["text-home-section", "page-section", "reverse-mobile", context.nicePageName];

  if (slideNum === context.currentSlide) {
    classList.push("active")
  }


  const header = slice.primary.header.richText;
  const sub_header = slice.primary.sub_header.richText;
  const text = slice.primary.text.richText;
  const mobileText = JSON.parse(JSON.stringify(text)); // deep clone without references to og arr

  const image = slice.primary.image.gatsbyImageData;

  const [isTooBig, setIsTooBig] = useState(false);

  const containerSize = useRef(null);
  
  useEffect(() => {
   
    const containerHeight = containerSize.current.offsetHeight;
    let height = 0;

    Object.entries(containerSize.current.children).forEach(([key, value]) => {
      height += value.offsetHeight
    });
    
    if (height > containerHeight) {
      setIsTooBig(true);
    } else {
      setIsTooBig(false);
    }
  

  }, [setIsTooBig]);
  if (isTooBig) {
    // classList.push("hide-on-mobile")
    const indexOfFirst = mobileText[0].text.indexOf('.');
    // const indexOfSecond = mobileText[0].text.indexOf('.', (indexOfFirst + 1));
    let truncatedText = mobileText[0].text.substring(0, indexOfFirst) ;
    truncatedText += '.';
    mobileText[0].text = truncatedText
  }

  const finalClass = classList.join(" ")


  return (
    <StyledTextImage ref={containerSize} className={finalClass}>

      <SectionContent limitWidth={false} contentType={'text'} >
        <div className="row header">
          <PrismicRichText field={header} />
        </div>

        {sub_header.length > 0 ?  <div className="row sub-header">
          <PrismicRichText field={sub_header} />
        </div>
        : '' }
       
       <div className={`row column show-on-mobile ${!isTooBig && 'active'}`}>
          <PrismicRichText field={mobileText} />
        </div>
        <div className={`row column hide-on-mobile ${isTooBig && 'active'}`}>
          <PrismicRichText field={text} />
        </div>

      </SectionContent>

      <SectionContent limitWidth={false} contentType={'image'} >
        <div className="wrapper">
          <GatsbyImage image={image} alt="banner" />
        </div>
      </SectionContent>
        
    </StyledTextImage>
  )
}

export const query = graphql`
  fragment PageDataBodyTextHome on PrismicPageDataBodyTextHome {
    primary {
      header {
        richText
      }
      sub_header {
        richText
      }
      text {
        richText
      }
      image {
        url
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
        )
      }
    }
  }
`