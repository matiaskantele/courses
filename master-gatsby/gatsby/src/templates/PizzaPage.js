import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

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

const PizzaInfo = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const PizzaPage = ({ data: { pizza } }) => (
  <PizzaInfo>
    <Img fluid={pizza.image.asset.fluid} />
    <div>
      <h2 className="mark">{pizza.name}</h2>
      <ul>
        {pizza.toppings.map((topping) => (
          <li key={topping.id}>{topping.name}</li>
        ))}
      </ul>
    </div>
  </PizzaInfo>
);

export default PizzaPage;
