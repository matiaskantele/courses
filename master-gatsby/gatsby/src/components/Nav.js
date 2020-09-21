import React from 'react';
import { Link } from 'gatsby';

const links = [
  { to: '/', name: 'Home' },
  { to: '/beers', name: 'Beers' },
  { to: '/order', name: 'Order' },
  { to: '/slicemasters', name: 'SliceMasters' },
  { to: '/pizzas', name: 'Pizzas' },
];

const listItem = ({ to, name }) => (
  <li>
    <Link to={to}>{name}</Link>
  </li>
);

const Nav = () => (
  <nav>
    <ul>{links.map((link) => listItem(link))}</ul>
  </nav>
);

export default Nav;
