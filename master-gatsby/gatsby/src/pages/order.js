import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import { StyledOrder, StyledMenuItem } from '../styles/OrderStyles';
import {
  formatMoney,
  calculatePizzaPrice,
  calculateOrderTotal,
} from '../utils/prices';

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
  const {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  } = usePizza({ pizzas, values });
  return (
    <>
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <SEO title="Order a Pizza!" />
          <StyledOrder onSubmit={submitOrder}>
            <fieldset>
              <legend>Your Info</legend>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={updateValue}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={values.email}
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
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          addToOrder({
                            id: pizza.id,
                            size,
                          })
                        }
                      >
                        {size}{' '}
                        {formatMoney(calculatePizzaPrice(pizza.price, size))}
                      </button>
                    ))}
                  </div>
                </StyledMenuItem>
              ))}
            </fieldset>
            <fieldset className="order">
              <legend>Order</legend>
              <PizzaOrder
                order={order}
                pizzas={pizzas}
                removeFromOrder={removeFromOrder}
              />
            </fieldset>
            <fieldset>
              <h3>
                Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
              </h3>
              <div>{error && <p>Error: {error}</p>}</div>
              <button type="submit" disabled={loading}>
                {loading ? 'Placing Order...' : 'Order Ahead!'}
              </button>
            </fieldset>
          </StyledOrder>
        </>
      )}
    </>
  );
};

export default Order;
