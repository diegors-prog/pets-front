import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Logo } from '../Assets/logoPetHelp.svg';
import { ReactComponent as Exit } from '../Assets/sair.svg';
import { UserContext } from '../UserContext';

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Pets - Home">
          <Logo />
        </Link>
        {data ? (
          <p className={styles.login}>
            {data.name.split(" ")[0]}

            <button className={styles.exit} onClick={userLogout}>
              <Exit />
            </button>
          </p>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
