import React from 'react';

import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;

export const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);
