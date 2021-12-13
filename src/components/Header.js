// Header.js file 

import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { PrismicLink } from '@prismicio/react'
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const Header = ({ isHomepage }) => {
  const queryData = useStaticQuery(graphql`
    {
      prismicNavigation {
        data {
          top_navigation {
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

  const navigation = queryData.prismicNavigation
  const topNav = navigation.data.top_navigation

  const homepageClass = isHomepage ? 'homepage-header' : ''

  return (
    <header className={`site-header ${homepageClass}`}>
      <PrismicLink href="/">
        <div className="logo">Example Site</div>
      </PrismicLink>
      <nav>
        <span>1</span>
        <ul>
          {topNav.map((navItem, index) => {
            return (
              <li key={`link-${index}`}>
                <PrismicLink href={navItem.link.url}>
                  {navItem.link_label.text}
                </PrismicLink>

                <AniLink cover direction="right" bg="#002451"  to={navItem.link.url}>
                  ani v - {navItem.link_label.text}
                </AniLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}