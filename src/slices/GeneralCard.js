import * as React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'


export const GeneralCard = ({metaData}) => {
  if (metaData === null) return null
  const { description, title, image } = metaData;

  return (
    <Helmet>
      <meta property="og:url"   content={process.env.GATSBY_PRISMIC_CAPTCHA_SECRET_KEY} />
      <meta property="og:type" content="website" />
      {title.text !== null && <meta property="og:title" content={title.text} />}
      {description.text !== null && <meta property="og:description" content={description.text} />}
      {image.url !== null && <meta property="og:image" content={image.url} />}
    </Helmet>

  )
}
export const query = graphql`
  fragment PageDataContentGeneralCard on PrismicPageDataContentGeneralCard {
    id
    primary {
      description {
        text
      }
      title {
        text
      }
      image {
        gatsbyImageData
      }
    }
  }
`