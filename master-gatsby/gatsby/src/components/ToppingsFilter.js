import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';

const StyledToppings = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0 4rem 0;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);

    .count {
      background: white;
      padding: 2px 5px;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

const toppingsWithCounts = (pizzas) => {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // increment existing pizzas by 1
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      // otherwise create a new entry for a topping
      return acc;
    }, {});
  return Object.values(counts).sort((a, b) => b.count - a.count);
};

const ToppingsFilter = () => {
  // Get a list of all Pizzas with their toppings
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
            vegetarian
          }
        }
      }
    }
  `);

  // Count number of pizzas that contain each topping
  const toppings = toppingsWithCounts(pizzas.nodes);

  return (
    <>
      <h2>Filter by topping</h2>
      <StyledToppings>
        <Link to="/pizzas">
          <span className="name">All</span>
          <span className="count">{pizzas.nodes.length}</span>
        </Link>
        {/* // Loop over the list of toppings -> display toppings with pizza counts */}
        {toppings.map((topping) => (
          <Link key={topping.id} to={`/topping/${topping.name}`}>
            <span className="name">{topping.name}</span>
            <span className="count">{topping.count}</span>
          </Link>
        ))}
      </StyledToppings>
    </>
  );
};

export default ToppingsFilter;
