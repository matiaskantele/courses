import React from 'react';
import { graphql } from 'gatsby';

// Dynamic based on slug in context set in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

const PizzaPage = ({ data: { pizza } }) => <></>;

export default PizzaPage;
