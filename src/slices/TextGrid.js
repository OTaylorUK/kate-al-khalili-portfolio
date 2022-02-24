import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import { StyledTextGrid } from "../styles/slices/TextGrid.styled"
import { SectionContent } from '../components/SectionContent'
import {useState } from 'react';
import SVG from 'react-inlinesvg';


export const TextGrid = ({slice, context, index }) => {


  const slideNum = index + 1;

  const [activeItem, updateActiveItem] = useState(1);

  let classList = ["page-section","text-grid-section"];

  if (slideNum === context.currentSlide) {
    classList.push("active")
  }
  
  const header = slice.primary.header.richText;
  const sub_header = slice.primary.sub_header.richText;
  const btn_text = slice.primary.button_text;

  
  const text = slice.primary.text.richText;
  const icon = slice.primary.icon.gatsbyImageData.images.fallback;;
  const {src: iconSVG} = icon
    
    
  const items = slice.items;
  const itemLimit = 6;
  const [itemCount, updateItemCount] = useState(items.length);

  if (itemCount > itemLimit) {
    updateItemCount(itemLimit)
  }
  let base = 1;
  const numVisible = 2;

  const changeGridItem = () => {
    let newNumber = activeItem + 1;
    if (newNumber > (itemCount / numVisible)) {
      newNumber = 1; // reset
    }
    updateActiveItem(newNumber);
  }


  const [gridIsActive, updateGridIsActive] = useState(false);
  

  const toggleActive = ({ type = null }) => {
    
    switch (type) {
      case 'show':
        updateGridIsActive(true)
        break;
      case 'hide':
        updateGridIsActive(false)
        break;
      default:
        break;
    }

  };

  const finalClass = classList.join(" ")



  return (
    <StyledTextGrid  className={finalClass}>

      <SectionContent limitWidth={true} classList={!gridIsActive && `active`} contentType={'text'} >
        <div className="content-actual">
          <div className="row">
            <PrismicRichText field={header} />
          </div>
          
          {sub_header.length > 0 ?  <div className="row sub-header">
            <PrismicRichText field={sub_header} />
          </div>
          : '' }

          <div className="row column">
            <PrismicRichText field={text} />
          </div>
        </div>
        <button className='section-btn-toggle' onClick={() => toggleActive({type: 'show'})}>{btn_text}</button>
      </SectionContent>

      <SectionContent limitWidth={false} classList={ gridIsActive && `active`} contentType={'grid'} >
        <div className="grid-container-actual">
        {items.map((item, index) => {

          if (index >= itemLimit) {
            return false;
          }

          if (index % numVisible === 0 && index !== 0) {
            base++;
          }
         const itemNum = base;
          
        const title = item.title.richText;
        const text = item.text.richText;

        let classList = ["grid-section-item"];

        if (itemNum === activeItem) {
          classList.push("active-item")
        }

        const finalClass = classList.join(" ");
        return (
          <div
            key={index}
            className={finalClass}
            slide-number={itemNum}
          >
            <div className="section-header">
              <PrismicRichText field={title} />
            </div>
            <PrismicRichText field={text} />
          </div>
        )
        })
        }
      </div>

        <button className='mobile-navigation' onClick={() => changeGridItem()}>
          See more skills
         <SVG className="icon" no-cors="true" src={iconSVG} width="16px" height="16px" title="Menu" />
        </button>
        

        <button className='section-btn-toggle lhs' onClick={() => toggleActive({ type: 'hide' })}>
          Go Back
         <SVG className="icon" no-cors="true" src={iconSVG} width="16px" height="16px" title="Menu" />

        </button>

      </SectionContent>
        
    </StyledTextGrid>
  )
}

export const query = graphql`
  fragment PageDataBodyTextAndGrid on PrismicPageDataBodyTextAndGrid {
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
      icon {
        gatsbyImageData
      }
      button_text
    }
    items {
      title {
        richText
      }
      text {
        richText
      }
    }
  }
`