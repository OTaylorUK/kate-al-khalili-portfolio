import * as React from 'react'
import { graphql } from 'gatsby'
import {WorkSlide} from '../components/WorkSlide'

export const DynamicContent = ({slice, context}) => {

  const { items,primary } = slice;


  const { url : iconURL } = primary.link_icon
  return (
    <>
      {items.map((item, index) => {
        return (
          <WorkSlide key={index} item={item} index={index} context={context} icon={iconURL} />
          )
        })
      }
    </>
  )
}

export const query = graphql`
  fragment PageDataBodyDynamicContent on PrismicPageDataBodyDynamicContent {
    primary {
      link_icon {
        url
      }
    }
    items {
      dynamic_data {
        document {
          ... on PrismicWork {
            id
            uid
            data {
              credits {
                richText
              }
              end_date
              image {
                url
                gatsbyImageData(
                  layout: FULL_WIDTH
                  placeholder: BLURRED
                )
              }
              link {
                link_text {
                  text
                }
                url {
                  url
                  slug
                  target
                }
              }
              position {
                richText
              }
              production_company {
                richText
              }
              production_name {
                richText
              }
              start_date
              summary {
                richText
              }
            }
          }
        }
      }
    }
  }
`