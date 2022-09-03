import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import useLogout from '../../hooks/useLogout';
import styles from './Navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [isMobile] = useState(true);

  const hamburgerToggle = () => setOpen(!open);

  const closeMobileMenu = () => setOpen(false);

  const handleClick = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1>Workout Buddy</h1>
      </Link>

      {/* menu */}
      <nav>
        <ul
          className={
            open ? `${styles.nav__menu} ${styles.active}` : styles.nav__menu
          }
        >
          <div>
            {user && (
              <div>
                <span
                  className={styles.userName}
                  onClick={isMobile && closeMobileMenu}
                >
                  Hi {user.userName}!
                </span>
                <span onClick={isMobile && closeMobileMenu}>
                  <button onClick={handleClick}>Logout</button>
                </span>
              </div>
            )}
            {!user && (
              <div className={styles.list__container}>
                <li>
                  <Link
                    className={styles.login}
                    to="/login"
                    onClick={isMobile && closeMobileMenu}
                  >
                    Log In
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.signup}
                    to="/signup"
                    onClick={isMobile && closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </div>
        </ul>

        {/* hamburger */}
        <div className={styles.hamburger} onClick={hamburgerToggle}>
          {open ? (
            <FaTimes size={20} style={{ color: '#000' }} />
          ) : (
            <FaBars size={20} style={{ color: '#000' }} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
