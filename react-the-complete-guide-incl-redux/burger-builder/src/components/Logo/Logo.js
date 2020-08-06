import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import styles from './Logo.module.css';

const logo = () => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="BurgerMe!" />
  </div>
);

export default logo;
