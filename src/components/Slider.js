import * as React from 'react'
// import { useState } from 'react';
import { NumberCounter } from "./NumberCounter";
import Svg from 'react-inlinesvg';

export const Slider = ({ position, context, icon}) => {


  let arr = Array.from({length: context.sliderCount}, (_, i) => i + 1)

  const handleClick = (number) => {
    context.updateSlide(number)
  }

  const changeSlide = (number, isBack = false) => {
    let newNum = null;
   

    if (!isBack) {
      if (number < context.sliderCount) {
        newNum = number + 1;
      } 
    } else {
      if (number > 1) {
        newNum = number - 1;
      } 
    }

    if (newNum === null) return false;
    
    context.updateSlide(newNum)
  }

  let btnText = 'Next';


  if (context.currentSlide === context.sliderCount) {
    btnText = 'Reset'
  }

  return (
    <>
      <div className={`slider-wrapper ${position}`} role="slider" aria-valuenow={context.currentSlide}>

      <div className={`selection-area ${position}`}>

        {arr.map((item, index) => {
        
          const slideNum = index + 1; 


          let classList = ["selection-tab"];
      

          if (slideNum === context.sliderCount){
            classList.push("last")
          }

          if (index === 0){
            classList.push("first")
          }

          if (slideNum === context.currentSlide){
            classList.push("active-tab")
          }

          const finalClass = classList.join(" ");
          
          return (
            <div
              key={`link-${item}`}
              onClick={() => handleClick(slideNum)}
              onKeyDown={() => handleClick(slideNum)}
              role="tab"
              tabIndex={context.currentNumber}
              className={finalClass}
            >
              <svg  viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="outer" cx="6.02513" cy="5.62142" r="4.60494" fill="white" fillOpacity="0.3" stroke="white"/>
                <circle className="inner"  cx="6.02513" cy="5.62144" r="2.55247" fill="white"/>
              </svg>
            </div>
          )
      })}
        
      </div>
      <NumberCounter context={context}  />
      </div>


        <button
          className={`toggle-next-slide ${position} ${context.currentSlide === context.sliderCount ? 'disabled' : ''}`}
          onClick={() => changeSlide(context.currentSlide)}
        >
        Next
          <Svg  className={`icon `} no-cors="true" src={icon} width="16px" height="16px" title="Menu" />
        </button>
     

      
        <button
          className={`toggle-previous-slide ${position === 'lhs' ? 'rhs' : 'lhs force-order'} ${context.currentSlide === 1 ? 'hidden' : ''}`}
          onClick={() => changeSlide(context.currentSlide, true)}
        >
        Back
          <Svg  className={`icon `} no-cors="true" src={icon} width="16px" height="16px" title="Menu" />
        </button>
        

    </>
  )
}
