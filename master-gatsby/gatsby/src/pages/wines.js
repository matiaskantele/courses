import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import SEO from '../components/SEO';

const WineGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleWine = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    font-size: 10px;
    object-fit: contain;
    display: grid;
    align-items: center;
  }
`;

export const query = graphql`
  query {
    allWine {
      nodes {
        id
        wine
        winery
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;

const Wines = ({
  data: {
    allWine: { nodes: wines },
  },
}) => (
  <>
    <SEO title={`Wines! We have ${wines.length} in stock`} />
    <h2>{`We have ${wines.length} Wines available. Dine in Only!`}</h2>
    <WineGrid>
      {wines.map((wine) => {
        const rating = Math.round(wine.rating.average);
        return (
          <SingleWine key={wine.id}>
            <img src={wine.image} alt={wine.wine} />
            <h3>{`${wine.winery} - ${wine.wine}`}</h3>
            <p title={`${rating} out of 5 stars`}>
              {`⭐`.repeat(rating)}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐`.repeat(5 - rating)}
              </span>
              <span>({wine.rating.reviews})</span>
            </p>
          </SingleWine>
        );
      })}
    </WineGrid>
  </>
);

export default Wines;
