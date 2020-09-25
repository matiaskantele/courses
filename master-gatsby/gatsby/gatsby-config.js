import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'zexpafm8',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `Best pizzas in Espoo`,
  },
};
