import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Logo from './Logo';

const StyledNav = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: -6rem 0 0 0;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-of-type(1) {
      --rotate: 1deg;
    }
    &:nth-of-type(2) {
      --rotate: -2.5deg;
    }
    &:nth-of-type(4) {
      --rotate: 1.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
    &[aria-current='page'] {
      color: var(--red);
    }
  }
`;

const links = [
  { to: '/', name: 'Hot Now' },
  { to: '/pizzas', name: 'Pizza Menu' },
  { to: '/slicemasters', name: 'SliceMasters' },
  { to: '/order', name: 'Order Ahead!' },
];

const listItem = ({ to, name }) => (
  <li key={name}>
    <Link to={to}>{name}</Link>
  </li>
);

const Nav = () => (
  <StyledNav>
    <ul>
      {links.slice(0, 2).map((link) => listItem(link))}
      <li>
        <Logo />
      </li>
      {links.slice(2).map((link) => listItem(link))}
    </ul>
  </StyledNav>
);

export default Nav;
