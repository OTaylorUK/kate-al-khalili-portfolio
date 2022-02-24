import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
// import { useState,useEffect } from 'react'



const PageTemplate = ({data, path}) => {
  
  if (!data) return null

  const page = data.prismicPage

  const { body, content, description, title } = page.data;

  const pageName =  path.split('/')[1].toLowerCase();
  let nicePageName = pageName;
  
  if (pageName === '') {
    nicePageName = 'home';
  } 

  return (
    <Layout isHomepage={false}  body={body} pageName={pageName} nicePageName={nicePageName}>
      <Seo metaData={content} description={description} title={title} pageName={pageName} />
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