import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import { GatsbyImage } from "gatsby-plugin-image";
import { SectionContent } from '../components/SectionContent'
import { useRef,useEffect,useState } from 'react';

import { StyledTextImage } from "../styles/slices/TextImage.styled"

export const TextImage = ({slice, context, index }) => {

  const slideNum = index + 1;

  let classList = ["text-image-section", "page-section", "reverse-mobile", context.nicePageName];



  if (slideNum === context.currentSlide) {
    classList.push("active")
  }


  const header = slice.primary.header.richText;
  const sub_header = slice.primary.sub_header.richText;
  const text = slice.primary.text.richText;


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
    classList.push("hide-on-mobile")
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
       
        <div className="row column hide-on-mobile">
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
  fragment PageDataBodyTextAndImage on PrismicPageDataBodyTextAndImage {
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