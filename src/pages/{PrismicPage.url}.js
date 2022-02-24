import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'



const PageTemplate = ({ data }) => {
  
  if (!data) return null

  const page = data.prismicPage

  const { body, document_display_name, content, description, title } = page.data;
 

  return (
    <Layout isHomepage={false}  body={body} >
      <Seo title={document_display_name.text} metaData={content} description={description} title={title}/>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($id: String) {
    prismicPage(id: { eq: $id }) {
      _previewable
      data {
        document_display_name {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...PageDataBodyTextAndImage
          ...PageDataBodyTextHome
          ...PageDataBodyTextAndGrid
          ...PageDataBodyDynamicContent
          ...PageDataBodyTextAndEmbed
        }
        content {
          ... on PrismicSliceType {
            slice_type
          }
          ...PageDataContentGeneralCard
          ...PageDataContentTwitterCard
        }
        description
        title
      }
    }
  
  }
`

export default withPrismicPreview(PageTemplate)