import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import { StyledOrder, StyledMenuItem } from '../styles/OrderStyles';
import { formatMoney, calculatePizzaPrice } from '../utils/prices';

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const Order = ({
  data: {
    pizzas: { nodes: pizzas },
  },
}) => {
  const { values, updateValue } = useForm({ name: '', email: '' });

  return (
    <>
      <SEO title="Order a Pizza!" />
      <StyledOrder>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name" value={values.name} onChange={updateValue}>
            Name
          </label>
          <input type="text" name="name" />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={values.name}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <StyledMenuItem key={pizza.id}>
              <Img
                height="50"
                width="50"
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button key={size} type="button">
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </StyledMenuItem>
          ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
        </fieldset>
      </StyledOrder>
    </>
  );
};

export default Order;
