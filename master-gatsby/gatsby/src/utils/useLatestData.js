import { useEffect, useState } from 'react';

// Fake out gql for VS Code syntax highlighting
const gql = String.raw;

const details = `
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

const query = {
  query: gql`
    query {
      StoreSettings(id: "downtown") {
        name
        hotSlices {
          ${details}
        }
        slicemaster {
          ${details}
        }
      }
    }
  `,
};

const useLatestData = () => {
  const [data, setData] = useState({ hotSlices: null, slicemasters: null });

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
