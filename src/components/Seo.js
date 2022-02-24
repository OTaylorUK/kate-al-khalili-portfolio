import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { GeneralCard } from '../slices/GeneralCard'
import { TwitterCard } from '../slices/TwitterCard'
import { useState, useEffect } from 'react'

export const Seo = ({ description, title, metaData }) => {
  


  const [generalData, updateGeneralData] = useState(null);
  const [twitterData, updateTwitterData] = useState(null);
  const [pageTitle, updatePageTitle] = useState('');
  const [pageDescription, updatePageDescription] = useState('');

  // INITIAL COMPONENT LOAD //
  useEffect(() => {

    Object.entries(metaData).forEach(([key, value]) => {
      switch (value.slice_type) {
        case "general_card":
        updateGeneralData(value.primary)
          break;
        case "twitter_card":
          updateTwitterData(value.primary)
          break;
          
        default:
          break;
      }
    });
     
    updatePageTitle(title)
    updatePageDescription(title)

   }, [metaData, title, description]);
 



  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />

      </Helmet>
      <GeneralCard metaData={generalData} />
      <TwitterCard metaData={twitterData} />
    </>

  )
}
