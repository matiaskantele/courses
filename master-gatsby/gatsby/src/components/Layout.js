import React from 'react';

import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;
