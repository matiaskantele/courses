import React from 'react';

import { HomePageGrid } from '../styles/Grids';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import useLatestData from '../utils/useLatestData';

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>Come on by, buy the slice!</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length > 0 && <p>Nothin' in the Case!</p>}
    {hotSlices?.length > 0 && <ItemGrid items={hotSlices} />}
  </div>
);

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters On</span>
    </h2>
    <p>Standing by, ready to do some slicing!</p>
    {!slicemasters && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length > 0 && (
      <p>No one is working right now!</p>
    )}
    {slicemasters?.length > 0 && <ItemGrid items={slicemasters} />}
  </div>
);

const HomePage = () => {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11 to 23 Every Single Day</p>
      <HomePageGrid>
        <HotSlices hotSlices={hotSlices} />
        <CurrentlySlicing slicemasters={slicemasters} />
      </HomePageGrid>
    </div>
  );
};

export default HomePage;
