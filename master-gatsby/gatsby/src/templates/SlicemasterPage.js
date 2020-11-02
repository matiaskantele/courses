import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

// Dynamic based on slug in context set in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

const SliceMasterPage = ({
  data: {
    person: { image, name, description },
  },
}) => (
  <>
    <SEO title={`${name}`} image={image?.asset?.fluid?.src} />
    <div className="center">
      <Img fluid={image.asset.fluid} />
      <h2>
        <span className="mark">{name}</span>
      </h2>
      <p>{description}</p>
    </div>
  </>
);

export default SliceMasterPage;
