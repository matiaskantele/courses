import React from 'react';
import { ItemsGrid, StyledItem } from '../styles/Grids';

const ItemGrid = ({ items }) => {
  console.log(items);
  return (
    <ItemsGrid>
      {items.map((i) => (
        <StyledItem key={i.name}>
          <p>
            <span className="mark">{i.name}</span>
          </p>
          <img
            src={`${i.image.asset.url}?w=500&h=400&fit=crop`}
            alt={i.name}
            width="500"
            height="400"
            style={{
              background: `url(${i.image.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          />
        </StyledItem>
      ))}
    </ItemsGrid>
  );
};

export default ItemGrid;
