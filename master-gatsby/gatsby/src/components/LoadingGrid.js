import { ItemsGrid, StyledItem } from '../styles/Grids';

const LoadingGrid = ({ count }) => (
  <ItemsGrid>
    {[...Array(count)].map((_, i) => (
      <StyledItem key={i}>
        <p>
          <span className="mark">Loading...</span>
        </p>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
          className="loading"
          alt="Loading"
          width="500"
          height="400"
        />
      </StyledItem>
    ))}
  </ItemsGrid>
);

export default LoadingGrid;
