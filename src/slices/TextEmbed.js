import * as React from 'react'
import { graphql } from 'gatsby'
import { PrismicRichText } from '@prismicio/react'
import { StyledTextEmbed } from '../styles/slices/TextEmbed.styled'
import { SectionContent } from '../components/SectionContent'
import { ContactForm } from '../components/ContactForm'
import Svg from 'react-inlinesvg';
import {useState } from 'react';


export const TextEmbed = ({slice, context, index }) => {

  const { header, sub_header, text, button_text, button_icon } = slice.primary;

  const [formIsActive, updateFormIsActive] = useState(false);
  

  const toggleActive = ({ type = null }) => {
    
    switch (type) {
      case 'show':
        updateFormIsActive(true)
        break;
      case 'hide':
        updateFormIsActive(false)
        break;
      default:
        break;
    }
  };

  return (
    <StyledTextEmbed className={`content-section`}>

      <SectionContent limitWidth={false} classList={!formIsActive && `active`} contentType={'text'} >
        <div className="text-content">
          <div className="row">
            <PrismicRichText field={header.richText} />
          </div>
          
          <div className="row">
            <PrismicRichText field={sub_header.richText} />
          </div>

          <div className="row column">
            <PrismicRichText field={text.richText} />
          </div>
        </div>

        <button className='section-btn-toggle' onClick={() => toggleActive({ type: 'show' })}>
          {button_text}
        </button>
      </SectionContent>
      
      <SectionContent limitWidth={false} classList={ formIsActive && `active`}  contentType={'form'} >
      
        <ContactForm />

        <button className='section-btn-toggle lhs' onClick={() => toggleActive({ type: 'hide' })}>
          Go Back
          <Svg className="icon" no-cors="true" src={button_icon.url} width="16px" height="16px" title="Menu" /> 
        </button>
      </SectionContent>
        
    </StyledTextEmbed>
  )
}

export const query = graphql`
  fragment PageDataBodyTextAndEmbed on PrismicPageDataBodyTextAndEmbed {
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
      button_text
      button_icon {
        url
      }
    }
  }
`