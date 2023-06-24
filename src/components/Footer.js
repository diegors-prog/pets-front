import React from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import styles from './Footer.module.css';
import { ReactComponent as Feed } from '../Assets/ionic-md-home.svg';
import { ReactComponent as Profile } from '../Assets/cassio.svg';
import { ReactComponent as CreatePublication } from '../Assets/material-add-to-photos.svg';

const Footer = () => {
  const { data, login, latitude, longitude, notificationPermission } = React.useContext(UserContext);

  if (!login) return null;
  else if (login && !latitude && !longitude) return null;
  else if (login && latitude && longitude && !notificationPermission) return null;
  else {
    return (
      <footer className={styles.footer}>
        <nav className={`${styles.nav} container`}>
          <Link style={{ padding: '0px 15px 0px 15px' }} to="/feed">
            <Feed />
          </Link>
          <Link style={{ padding: '0px 15px 0px 15px' }} to="/feed/create-publication">
            <CreatePublication />
          </Link>
          <Link style={{ padding: '0px 15px 0px 15px' }} to="/feed/profile">
            <div className={styles.profile}>
              <span>{data.name.substr(0, 1).toUpperCase()}</span>
            </div>
          </Link>
        </nav>
      </footer>
    );
  }
};

export default Footer;
