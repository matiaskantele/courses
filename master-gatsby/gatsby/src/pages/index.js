import React from 'react';

import useLatestData from '../utils/useLatestData';

const HotSlices = ({ hotSlices }) => (
  <div>
    <p>HotSlices</p>
  </div>
);

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <p>CurrentlySlicing</p>
  </div>
);

const HomePage = () => {
  const { hotSlices, slicemasters } = useLatestData();
  console.log('RENDERING INDEX');

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11 to 23 Every Single Day</p>
      <div>
        <HotSlices hotSlices={hotSlices} />
        <CurrentlySlicing slicemasters={slicemasters} />
      </div>
    </div>
  );
};

export default HomePage;
