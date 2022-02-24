import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

export const TwitterCard = ({metaData}) => {

  if (metaData === null) return null

  const { description, title, image } = metaData;
  const url = window.location.href;
  
  return (
    <Helmet>
      <meta property="og:url"   content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      {title.text !== null && <meta name="twitter:title" content={title.text} />}
      {description.text !== null && <meta name="twitter:description" content={description.text} />}
      {image.url !== null && <meta name="twitter:image" content={image.url} />}
    </Helmet>
  )
}
export const query = graphql`
  fragment PageDataContentTwitterCard on PrismicPageDataContentTwitterCard {
    id
    primary {
      description {
        text
      }
      title {
        text
      }
      image {
        url
      }
    }
  }
`