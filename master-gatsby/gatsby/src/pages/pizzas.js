import React from 'react';
import { graphql } from 'gatsby';

import PizzaList from '../components/PizzaList';

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        price
      }
    }
    allSanityPerson {
      nodes {
        name
      }
    }
  }
`;

const Pizzas = ({ data: { pizzas } }) => (
  <>
    <PizzaList pizzas={pizzas.nodes} />
  </>
);

export default Pizzas;
