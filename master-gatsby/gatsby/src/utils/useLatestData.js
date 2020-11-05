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
  const [data, setData] = useState({ hotSlices: [], slicemasters: [] });

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
          StoreSettings: { hotSlices, slicemaster },
        },
      } = await response.json();
      setData({ hotSlices, slicemasters: slicemaster });
    };
    fetchData();
  }, []);

  return data;
};

export default useLatestData;
