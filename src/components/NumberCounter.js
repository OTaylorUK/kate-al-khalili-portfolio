import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { StyledNumberCounter } from "../styles/components/NumberCounter.styled";

export const NumberCounter = ({context, overrideNumber = null}) => {


  const [lastNumber, setLastNumber] = useState(null);


  useEffect(() => {
    if (context.sliderCount < 10) {
      setLastNumber("0" + context.sliderCount)
    } else {
      setLastNumber(context.sliderCount)
    }


  }, [context.sliderCount]);

  let classList = ["number-count"];


  let curSetNum = context.currentSlide;

  if (overrideNumber !== null) {
    classList.push("disabled")
    curSetNum = overrideNumber
  }

  return (
    <StyledNumberCounter className={`number-count`} role="slider" aria-valuenow={curSetNum}>
      <span className="current-number">0{curSetNum}</span>
      <span className="divider">/</span>
      <span className="last-number">{lastNumber}</span>
    </StyledNumberCounter>
  )
}
