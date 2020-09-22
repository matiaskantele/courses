import React from 'react';

import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Typography />
    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;
