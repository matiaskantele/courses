import React from 'react';
import Img from 'gatsby-image';

import { StyledMenuItem } from '../styles/OrderStyles';
import { formatMoney, calculatePizzaPrice } from '../utils/prices';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    {order.map((item, index) => {
      const pizza = pizzas.find((p) => p.id === item.id);
      return (
        <StyledMenuItem key={item.id + index}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{pizza.name}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, item.size))}
            <button
              type="button"
              className="remove"
              title={`Remove ${item.size} ${pizza.name} from Order`}
              onClick={() => removeFromOrder(index)}
            >
              &times;
            </button>
          </p>
        </StyledMenuItem>
      );
    })}
  </>
);

export default PizzaOrder;
