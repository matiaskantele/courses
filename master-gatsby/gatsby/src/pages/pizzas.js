import React from 'react';
import { graphql } from 'gatsby';

import ToppingsFilter from '../components/ToppingsFilter';
import PizzaList from '../components/PizzaList';

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
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
            # fixed(width: 200, height: 200) {
            #   ...GatsbySanityImageFixed
            # }
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
    <ToppingsFilter />
    <PizzaList pizzas={pizzas.nodes} />
  </>
);

export default Pizzas;
