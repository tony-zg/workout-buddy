import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="form__outer__container">
      <form
        className={`${styles.login} form__container`}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.title}>Welcome back</h2>

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoFocus="autofocus"
          autoComplete="off"
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
        />

        <button className="form__btn" type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <div className="form__error">{error}</div>}
        <p className={styles.text}>
          Not a member? Signup
          <Link to="/signup" className={styles.link}>
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
