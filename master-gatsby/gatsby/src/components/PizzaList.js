import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const Pizza = ({ pizza }) => (
  <Link to={`/pizza/${pizza.slug.current}`}>
    <h2>
      <span className="mark">{pizza.name}</span>
    </h2>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </Link>
);

const PizzaList = ({ pizzas }) => (
  <>
    {pizzas.map((pizza) => (
      <Pizza key={pizza.id} pizza={pizza} />
    ))}
  </>
);

export default PizzaList;
