import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import styles from './Footer.module.css';
import { ReactComponent as Feed } from '../Assets/ionic-md-home.svg';
import { ReactComponent as Profile } from '../Assets/cassio.svg';
import { ReactComponent as CreatePublication } from '../Assets/material-add-to-photos.svg';

const Footer = () => {
  const { data, login } = React.useContext(UserContext);

  if (!login) return null;
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.nav} container`}>
        <Link style={{ padding: '0px 15px 0px 15px' }} to="/">
          <Feed />
        </Link>
        <Link style={{ padding: '0px 15px 0px 15px' }} to="/create-publication">
          <CreatePublication />
        </Link>
        <Link style={{ padding: '0px 15px 0px 15px' }} to="/profile">
          <div className={styles.profile}>
            <span>{data.name.substr(0, 1).toUpperCase()}</span>
          </div>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
