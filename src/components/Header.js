// Header.js file 

import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { StyledHeader } from "../styles/components/Header.styled";
import { useState,useEffect,useMemo } from 'react'


export const Header = ({ isHomepage, styles, pageName, context}) => {
  const queryData = useStaticQuery(graphql`
    {
      prismicNavigation {
        data {
          main_navigation {
            link {
              url
            }
            link_label {
              text
            }
          }
          secondary_navigation {
            link {
              url
            }
            link_label {
              text
            }
          }
        }
      }
    }
  `)



  const { main_navigation, secondary_navigation } = queryData.prismicNavigation.data;

  let bgColour = styles.colour_palette.primary;

  const mergedList = main_navigation.map(obj => ({ ...obj, type: 'primary' })).concat(secondary_navigation.map(obj => ({ ...obj, type: 'secondary' })));

  const [toggleActive, setToggleActive] = useState(false);
  const [toggleReversing, setToggleReversing] = useState(false);
  const [compClass, setCompClass] = useState(null);

  const arraytest = useMemo(() => ['site-header'], []);
  toggleActive && arraytest.push('menu-active')
  toggleReversing && arraytest.push('toggle-reversing')
  


   // INITIAL COMPONENT LOAD //
  useEffect(() => {
     
    arraytest.push('loaded')
    const compClass = arraytest.join(' ')
    setCompClass(compClass)
     
   }, [arraytest]);
  

  
  let directionAnimations = [];

  mergedList.forEach(function (item) {
    const { link } = item;
    let linkName = link.url.slice(1); // remove slash

    if (linkName === "") {
      linkName = "home";
    }

    let res = {
      "home": "",
      "work": "",
      "bio": "",
      "contact": "down",
    };

    switch (linkName) {
      case "home":
        res.work = "left";
        res.bio = "right";
        break;
      case "bio":
        res.home = "left";
        res.work = "left";
        break;
      case "work":
        res.home = "right";
        res.bio = "right";
        break;

      case "contact":
        res.home = "up";
        res.bio = "up";
        res.work = "up";
        break;
      default:
        break;
    }

    directionAnimations[linkName] = res;
    // item.directions = res;
  });

  const menuToggle = () => {

    if (toggleActive) {
      setToggleReversing(true)

      setTimeout(() => {
        setToggleReversing(false)
      }, 800);
    }
    setToggleActive(!toggleActive);
  }





  return (
    <StyledHeader className={compClass} context={context} >
      <div className="bg"></div>
      <nav className="mobile_top_nav">
        <ul className="navigation">
          <li className="nav-item" key={`link-${context.nicePageName}`}>
            <span>{context.nicePageName}</span>
          </li>
        </ul>
        <button className={`close-icon ${toggleActive ? 'toggle-active' : ''} ${toggleReversing ? 'toggle-reversing'  : ''}`} onClick={menuToggle}>
          <div className="menu-icon">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </button>
      </nav>

      <nav className={`main_nav ${toggleActive ? 'menu-active' : ''}`}>
        <ul className="navigation">
          {mergedList.map((item, index) => {
            const { link, link_label, type } = item;

            let classList = ["primary-nav-item", type, ];
            let linkClass = ["nav-link"];

            let pathName = link.url.slice(1); // remove slash

            if (pathName === "") {
              pathName = "home";
            }

            // if (pathName === "contact") {
            //   bgColour = styles.colour_palette.white;

            //   console.log('bgColour', bgColour);
            // }

            if (pathName === context.nicePageName) {
              classList.push("active-page")
              linkClass.push("active-page")
            }

            let direction = '';

            if (directionAnimations[context.nicePageName] !== undefined){
               direction = directionAnimations[context.nicePageName][pathName];
            }
            
            const finalClass = classList.join(" ");
            const finalNavClass = linkClass.join(" ");
          

            return (
              <li key={`link-${index}`} className={finalClass} >
                <AniLink className={finalNavClass} cover direction={direction} bg={bgColour}  to={link.url}>
                  {link_label.text}
                </AniLink>
              </li>
            )
          })}
          
        </ul>

      </nav>
    </StyledHeader>
  )
}
