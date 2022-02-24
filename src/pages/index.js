import * as React from 'react'
import { graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { SliceZone } from '@prismicio/react'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { components } from '../slices'


const HomeTemplate = ({ data }) => {
  if (!data) return null
  // const doc = data.prismicHomepage.data
  // const colour_palette = settings.colour_palette;
  const page = data.prismicPage

  const settings = data.prismicGlobalSettings.data;
 

  return (
    <Layout isHomepage={true} settings={settings}>
      <Seo title="Home" />
     
      <SliceZone slices={page.data.body} components={components} />
    </Layout>
  )
}


export default withPrismicPreview(HomeTemplate)

export const query = graphql`

  query MyQuery {
    prismicPage(data: {}, uid: {eq: "home"}) {
      _previewable
      id
      data {
        document_display_name {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...PageDataBodyTextAndImage
          ...PageDataBodyTextAndGrid
        }
      }
    }
    prismicGlobalSettings {
      data {
        typography {
          font
          name {
            text
          }
          weights
        }
        colour_palette {
          name {
            text
          }
          colour
        }
      }
    }
  },
`