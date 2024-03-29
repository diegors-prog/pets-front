import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Feed from '../components/Feed/Feed';
import CreatePublication from '../components/CreatePublication/CreatePublication';
import Profile from '../components/Profile/Profile';
import styles from './Home.module.css';
import NotFound from '../components/NotFound/NotFound';
import GeoLocation from '../components/GeoLocation/GeoLocation';
import NotificationPermission from '../components/NotificationPermission/NotificationPermission';

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/location" element={<GeoLocation />} />
          <Route path="/notification-permission" element={<NotificationPermission />} />
          <Route path="/create-publication" element={<CreatePublication />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default Home;
