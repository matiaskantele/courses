import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';

const StyledPizzaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const StyledPizza = styled.div`
  display: grid;
  /* Take your row sizing from the parent grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

const Pizza = ({ pizza }) => (
  <StyledPizza>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </StyledPizza>
);

const PizzaList = ({ pizzas }) => (
  <StyledPizzaGrid>
    {pizzas.map((pizza) => (
      <Pizza key={pizza.id} pizza={pizza} />
    ))}
  </StyledPizzaGrid>
);

export default PizzaList;
