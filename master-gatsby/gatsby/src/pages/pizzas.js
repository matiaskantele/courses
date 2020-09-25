import React from 'react';
import { graphql } from 'gatsby';

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

const Pizzas = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <p>Hey! There are {pizzas.length} pizzas!</p>
    </>
  );
};

export default Pizzas;
