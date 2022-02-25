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
  let niceCurNum = curSetNum;

  if (overrideNumber !== null) {
    classList.push("disabled")
    curSetNum = overrideNumber
  }

  if (curSetNum < 10) {
    niceCurNum = "0" + curSetNum
  } else {
    niceCurNum = curSetNum
  }

  return (
    <StyledNumberCounter className={`number-count`} role="slider" aria-valuenow={curSetNum}>
      <span className="current-number">{niceCurNum}</span>
      <span className="divider">/</span>
      <span className="last-number">{lastNumber}</span>
    </StyledNumberCounter>
  )
}
