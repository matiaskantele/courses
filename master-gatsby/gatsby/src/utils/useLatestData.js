import { useEffect, useState } from 'react';

const query = {
  query: `
    query{
      StoreSettings(id: "downtown") {
        name
        hotSlices {
          name
        }
        slicemaster{
          name
        }
      }
    }
  `,
};

const useLatestData = () => {
  const [slicemasters, setSlicemasters] = useState();
  const [hotSlices, setHotSlices] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.GATSBY_SANITY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      const {
        data: {
          StoreSettings: { hotSlices: slices, slicemaster },
        },
      } = await response.json();
      setHotSlices(slices);
      setSlicemasters(slicemaster);
    };
    fetchData();
  }, []);

  return [hotSlices, slicemasters];
};

export default useLatestData;
