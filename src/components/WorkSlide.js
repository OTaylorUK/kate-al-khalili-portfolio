import * as React from 'react'
import { PrismicRichText } from '@prismicio/react'
import { GatsbyImage } from "gatsby-plugin-image";
import { StyledDynamicContent } from "../styles/slices/DynamicContent.styled"
import { SectionContent } from './SectionContent'
import { NumberCounter } from "./NumberCounter";
import Svg from 'react-inlinesvg';

export const WorkSlide = ({ item, index, context, icon}) => {

  const { uid, data } = item.dynamic_data.document;

    const credits = data.credits.richText;
    const position = data.position.richText;
    const production_name = data.production_name.richText;
    const production_company = data.production_company.richText;
    const summary = data.summary.richText;

  const { link_text, url} = data.link[0];

  const { text: linkText } = link_text;
  const { url: linkURL, target: linkTarget } = url;

    // const end_date = data.end_date;
    // const start_date = data.start_date;
    const image = data.image.gatsbyImageData;

    const slideNum = index + 1;

    let classList = ["dynamic-section", "page-section", "reverse-mobile", uid];

    if (slideNum === context.currentSlide) {
      classList.push("active")
    }


    // const [isTooBig, setIsTooBig] = useState(false);

    // const containerSize = useRef(null);

    // useEffect(() => {

    //   const containerHeight = containerSize.current.offsetHeight;
    //   let height = 0;

    //   for (const [key, value] of Object.entries(containerSize.current.children)) {
    //     height += value.offsetHeight
    //   }

    //   if (height > containerHeight) {
    //     setIsTooBig(true);
    //   } else {
    //     setIsTooBig(false);
    //   }


    // }, [setIsTooBig]);

    // if (isTooBig) {
    //   classList.push("hide-on-mobile")
    // }



    const finalClass = classList.join(" ");

    return (
    <StyledDynamicContent
      key={uid}
      className={finalClass}
      slide-number={slideNum}
      // ref={containerSize}
    >
      <SectionContent limitWidth={false} contentType={'text'} >
        <div className="row production-name">
            <div className="content">
              <PrismicRichText field={production_name} />
            </div>
        </div>

        <div className="row row-wrapper column">
          <div className="row split-row">
            <span className="label">Position:</span>
            <div className="content">
              <PrismicRichText field={position} />
            </div>
          </div>

          <div className="row split-row">
            <span className="label">Credits:</span>
            <div className="content">
              <PrismicRichText field={credits} />
            </div>
          </div>

          <div className="row split-row">
            <span className="label">Production company:</span>
            <div className="content">
              <PrismicRichText field={production_company} />
            </div>
          </div>
        </div>
        <div className="row column hide-on-mobile">
          <div className="content">
            <PrismicRichText field={summary} />
          </div>
        </div>

          <div className="row column ">
          <div className="content">
            <a
              href={linkURL}
              target={linkTarget}
              className={`view-the-show ${position}`}
            >
              {linkText}
              <Svg className="icon" no-cors="true" src={icon} width="16px" height="16px" title="Menu" />
            </a>
          </div>
        </div>
      </SectionContent>

      <SectionContent limitWidth={false} contentType={'image'} >
        <div className="wrapper">
          <GatsbyImage image={image} alt="banner" />
        </div>
        <NumberCounter context={context} overrideNumber={slideNum}  />

      </SectionContent>

    </StyledDynamicContent>
    )
}
