import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useEffect, useState, useRef } from 'react'

import { ThemeProvider } from 'styled-components'

import GlobalStyles from "../styles/Global"

import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'

import { convertSettings, useWindowSize } from '../utils/Functions';

export const Layout = ({ isHomepage, children, body, pageName, nicePageName }) => {


  // GRAPHQL QUERY //
  const queryData = useStaticQuery(graphql`
  {
    prismicGlobalSettings {
      data {
        colour_palette {
          name {
            text
          }
          colour
        }
      }
    }
  }
  `)


  // VARIABLES //
  const settings = queryData.prismicGlobalSettings.data;
  const settings_obj = convertSettings(settings)


  const [width] = useWindowSize();
  const windowWidth = width;
  const scrollSensitivity = useState(2); // 1= highest sens 4 = lowest sens
  const [currentSlide, setCurrentSlide] = useState(1);
  const [sliderPosition, setsliderPosition] = useState("home");
  const [sliderCount, setsliderCount] = useState(0);
  const [sliderOffset, setsliderOffset] = useState(`translate3d(0, 0px, 0px)`);
  const [slideStatus, setslideStatus] = useState("fixed");
  const [sliderScrolled, setsliderScrolled] = useState(false);
  let scrollLimit = useRef(null);
  const slideBreakPoints = useRef([]);
  
  const previousY = useRef(0);
  let itemNum = useRef(1);
  const [mainHeight, setMainHeight] = useState('0px')
  const scrollStart = useRef(0);
  const scrollStartY = useRef(0);

  const scrollEnd = useRef(0);
  const scrollEndY = useRef(0);



  const [isScrolling, setIsScrolling] = useState(false);

  const [theme, setTheme] = useState('dark');
 
    
  const [lightTheme, setLightTheme] = useState(settings_obj);

 
  const [darkTheme] = useState(settings_obj);

  
  const [finalTheme, setFinalTheme] = useState(darkTheme);


  const setTheTheme = (theme) => {
    setFinalTheme(theme)
  }
  
  useEffect(() => {
    const swap = (object, key1, key2) => {
      if (object !== undefined) {
      [object[key1], object[key2]] = [object[key2], object[key1]];
      }
    }
    const newObj = JSON.parse(JSON.stringify(darkTheme)); // deep clone without references to og arr
    // let newObj = { ...darkTheme }
    swap(newObj.colour_palette, 'primary', 'white');
    setLightTheme(newObj)
  }, [darkTheme]);
  
  const updateSliderOffset = (number) => {
    const base = windowWidth;
    const multiplier = number - 1;
    const moveAmount = (multiplier * base)
  
    const res = calculateTranslate({number: moveAmount})
  
    setsliderOffset(res)
   }
  
  const updateSlide = number => {
    setCurrentSlide(number)
    updateSliderOffset(number)
  }
  
// fix - reduce
  const updateSliderPosition = number => {
    setsliderPosition(number)
  }
// fix - reduce
  const updateSliderCount = number => {
    setsliderCount(number)
  }

  const calculateTranslate = ({number}) => {

    let intType = 1;
  
    if (sliderPosition === "rhs") {
      intType = -1;
    }
  
    let offset = number * intType;
    let finalOffset = `${offset}px`;
  
    const res = `translate3d(${finalOffset}, 0px, 0px)`;
  
    return res;
  }

  



  const [simulateClick, setSimulateClick] = useState(false);
  const [simulateTarget, setSimulateTarget] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const headerVals = {
    simulateClick,
    simulateTarget,
    setSimulateClick
  }

  // MOBILE - SCROLL EVENTS //
  const touchStart = (event) => {

    scrollStart.current = event.touches[0].pageX;
    scrollStartY.current = event.touches[0].pageY;
    setIsScrolling(true);
  }
  
  const touchEnd = (event) => {

    // if (pageName === "" || !isScrolling) {
    //   return null;
    // }
  
    if (!isDragging) {
      return false;
    }

    console.log('scrollStart:', scrollStart.current);
    console.log('scrollEnd:', scrollEnd.current);

    const scrollYMin = scrollStartY.current - 10;
    const scrollYMax = scrollStartY.current + 10;


    // if (event.touches[0].pageY < scrollYMin && event.touches[0].pageY > scrollYMax) { 
    //   return false;
    // }

    let moveDir = 'no-move';
    let moveToSlideNumber;
    let nearestSlide;


    const dif = scrollStart.current - scrollEnd.current;

    console.log('dif:', dif);
    
    if (sliderPosition === 'rhs' || sliderPosition === 'home') {

      if (dif > 0) {
        moveDir = 'forward';
      } else if (dif === 0){
        moveDir = 'no-move';
      }else {
        moveDir = 'back';
      }
   
    } else {

      if (dif < 0) {
        moveDir = 'forward';
      } else if (dif === 0){
        moveDir = 'no-move';
      }else {
        moveDir = 'back';
      }
    }

    console.log('moveDir', moveDir);
    console.log('sliderPosition', sliderPosition);

    // setMoveDirection(moveDir)
    if (sliderPosition === 'home') { 
      setSimulateClick(true);
      console.log('HOME!');

      if (moveDir === 'forward') {
        console.log('work');

        setSimulateTarget('work')
      } else {
        console.log('bio');
        setSimulateTarget('bio')
      }
    } else {
      if (moveDir !== null) {

        switch (moveDir) {
          case 'forward':
  
              moveToSlideNumber = currentSlide + 1;
  
              if (moveToSlideNumber > slideBreakPoints.current.length) {
                moveToSlideNumber = currentSlide;
              }
  
            break;
          case 'back':
            // moving back
            moveToSlideNumber = currentSlide - 1;
  
            if (moveToSlideNumber < 1) {
              moveToSlideNumber = currentSlide;
              setSimulateClick(true);
              setSimulateTarget('home')
            }
  
            break;
          
          default:
            break;
        }
  
  
        if (moveDir !== 'no-move') {
          nearestSlide =  slideBreakPoints.current.filter(slide => slide.slideNumber === moveToSlideNumber)[0];
  
          updateSlide(nearestSlide.slideNumber)
          setslideStatus("fixed")
          setsliderScrolled(true)
          setTimeout(() => {
            setsliderScrolled(false)
          }, 600);
          previousY.current = nearestSlide.position;
  
        }
        
      }
  
      scrollEnd.current = scrollStart.current;
      setIsScrolling(false);
      setIsDragging(false)
    }
    
    
  }

  const mobileScrolled = ({event, position}) => {
    let movingForward = false;
    // let difference = scrollStart.current - event.touches[0].pageY
    let nearestSlide = null;
    let  moveToSlideNumber


    if (isScrolling) {
      setIsDragging(true);
      scrollEnd.current = event.touches[0].pageX;
      scrollEndY.current = event.touches[0].pageY;
    }
   


    // if (!isScrolling) {
    //   return false;
    // }

    // // prevent anything other than horizontal scroll

 
    // // const scrollYMin = scrollStartY.current - 10;
    // // const scrollYMax = scrollStartY.current + 10;

    // const scrollYMin = scrollStartY.current - 10;
    // const scrollYMax = scrollStartY.current + 10;
    // if (event.touches[0].pageY < scrollYMin && event.touches[0].pageY > scrollYMax) { 
    //   return false;

    // }

    // moveDir = 'no-move';
    

    // if (position === 'rhs' || position === 'home') {
    //   if (event.touches[0].pageX < scrollStart.current) {
    //     // movingForward = !movingForward;
    //     moveDir = 'forward';

    //   }
    // } else {
    //   if (event.touches[0].pageX > scrollStart.current) {
    //     // movingForward = !movingForward;
    //     moveDir = 'back';

    //   }
    // }

    // setMoveDirection(moveDir)
    // if (position === 'home') { 
    //   setSimulateClick(true);
    //   if (movingForward) {
    //     setSimulateTarget('work')
    //   } else {
    //     setSimulateTarget('bio')
    //   }
    //   return false;

    // }

    // if (pageName === "" || sliderScrolled) {
    //   return null;
    // }
    
    // if (movingForward) {
    //   moveToSlideNumber = currentSlide + 1;

    //   if (moveToSlideNumber > slideBreakPoints.current.length) {
    //     moveToSlideNumber = currentSlide;
    //   }

    // } else {
    //   // moving back
    //   moveToSlideNumber = currentSlide - 1;

    //   if (moveToSlideNumber < 1) {
    //     moveToSlideNumber = currentSlide;
    //     setSimulateClick(true);
    //     setSimulateTarget('home')
    //     return false;

    //   }
    // }
    
    // nearestSlide =  slideBreakPoints.current.filter(slide => slide.slideNumber === moveToSlideNumber)[0];

    // updateSlide(nearestSlide.slideNumber)
    // setslideStatus("fixed")
    // setsliderScrolled(true)
    // setTimeout(() => {
    //   setsliderScrolled(false)
    // }, 600);
    // previousY.current = nearestSlide.position;
  };
  


  const simpleDesktopScroll = ({event}) => {
    let movingForward = false;
    let nearestSlide = null;
    let moveToSlideNumber;
    let newNum = previousY.current;


    newNum = newNum + event.deltaY

    // positionRef = newNum;

    if (nicePageName === ""  || sliderScrolled) {
      return false;
    }

    if (newNum >= previousY.current) {
      movingForward = !movingForward;
      // positionRef += windowWidth 

    }

    if (movingForward) {
      moveToSlideNumber = currentSlide + 1;
      if (moveToSlideNumber > slideBreakPoints.current.length) {
        moveToSlideNumber = currentSlide ;
      }

    } else {
      // moving back
      moveToSlideNumber = currentSlide - 1;
    
      if (moveToSlideNumber < 1) {
        moveToSlideNumber = currentSlide;
      }
    }

    nearestSlide = slideBreakPoints.current.filter(slide => slide.slideNumber === moveToSlideNumber)[0];


    updateSlide(nearestSlide.slideNumber)
    setslideStatus("fixed")
    setsliderScrolled(true)
    setTimeout(() => {
      setsliderScrolled(false)
    }, 600);

    previousY.current = nearestSlide.position;



  };
 

  
  // EVENT LISTNERS - RESIZE //
  // Used to reset the slide position (to 1st slide) on resize
  let doit;

  if (typeof window !== `undefined`){
    window.addEventListener('resize', (event) => {
      clearTimeout(doit);
      doit = setTimeout(simpleDesktopScroll({event}), 200);
    });
  }

  


  // CONTEXT PARAMS //
  // To use in other slices/components
  const objs = {
    updateSlide,
    updateSliderCount,
    updateSliderPosition,
    updateSliderOffset,
    currentSlide,
    nicePageName,
    sliderPosition,
    sliderCount,
    sliderOffset,
    slideBreakPoints,
    slideStatus,
    mainHeight
  }


  
  // INITIAL COMPONENT LOAD //
  useEffect(() => {
    const updateSlideBreakPoints = number => {

      // if (slideBreakPoints !== null) {
      //   return false;
      // }
      let arr = [];
      let sensitivity;
      switch (scrollSensitivity) {
        case 1:
          // high sens
          sensitivity = 6;
          break;
        case 2:
          sensitivity = 5;
        break;
        case 3:
          sensitivity = 4;
        break;
        case 4:
          // low sens
          sensitivity = 3;
        break;
        default:
          sensitivity = 3;
          break;
      }
  
      const range = windowWidth/sensitivity ;
  
      for (let index = 0; index < number; index++) {
        let baseI = index + 1;
        let right = windowWidth * baseI;
        let left = right - windowWidth;
        let limit = right + range;
        
        let obj = {
          slideNumber: baseI,
          position: left,
          activeRange: {
            start: left+range,
            end:  right-range,
            limit:  limit,
          }, 
        }
        arr.push(obj);
      }
      slideBreakPoints.current = arr
  
  
    }
    
    
    const updateScrollLimit = number => {
    scrollLimit.current = number * windowWidth
    }

  
    // let themeStyle = 'dark';
    setTheme('dark')

    switch (nicePageName) {
      case "work":
        if (body[0].items) {

          itemNum.current = body[0].items.length;
          setsliderCount(itemNum.current)
          setsliderPosition("rhs")
        }
      break;
      
      case "bio":
        itemNum.current = body.length;
        setsliderCount( itemNum.current)
        setsliderPosition("lhs")
      break;
      
      case "contact":
        // themeStyle = 'light';
        setTheme('light')
        // setFinalTheme(newObj)
      break;
      case "home":
        itemNum.current = 1;
       
      break;
      default:
        itemNum.current = 1;

      break;
      
    }

    // updateTheme({type: themeStyle, settings: settings_obj})

    updateScrollLimit(itemNum.current)
    updateSlideBreakPoints(itemNum.current)
  }, [body, scrollSensitivity, windowWidth, nicePageName ]);


  // theme dependent //
  useEffect(() => {

    const updateTheTheme = () => {
      if (theme === 'light') {
        setTheTheme(lightTheme)
      } else {
        setTheTheme(darkTheme)
      }
    }

    updateTheTheme()
  
  
  }, [theme, lightTheme, darkTheme]);

  useEffect(() => {

    let height = document.querySelector('main').offsetHeight + "px";
    setMainHeight(height)

  
  }, []);

  

  return (
    <ThemeProvider theme={finalTheme} >
      <GlobalStyles pageName={pageName} />
      
      <div
        className="page-wrapper"
        onWheel={(event) => simpleDesktopScroll({event})}
        onTouchMove={(event) => mobileScrolled({event: event, position: sliderPosition})}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >

        <Header
          isHomepage={isHomepage}
          styles={settings_obj}
          context={objs}
          headerVals={headerVals}
        />
        
        {children}

        <Main
          position={sliderPosition}
          context={objs}
          body={body}
        >
        </Main>

        <Footer
          theme={settings_obj}
          count={sliderCount}
          position={sliderPosition}
          currentSlide={currentSlide}
          context={objs}
        />
      </div>
        
    </ThemeProvider>
  )
}
