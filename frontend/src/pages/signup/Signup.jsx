import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import styles from './Signup.module.css';

const Signup = () => {
  const [inputs, setInputs] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signup, error, isLoading } = useSignup();

  const { userName, email, password, confirmPassword } = inputs;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(userName, email, password, confirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="form__outer__container">
      <form
        className={`${styles.signup} form__container`}
        onSubmit={handleSubmit}
      >
        <h2 className={styles.title}>Create account</h2>

        <label>Username:</label>
        <input
          type="text"
          onChange={handleChange}
          name="userName"
          value={userName}
          autoFocus="autofocus"
          autoComplete="off"
        />

        <label>Email:</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          autoComplete="off"
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          autoComplete="off"
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          autoComplete="off"
        />

        <button className="form__btn" type="submit" disabled={isLoading}>
          Sign up
        </button>
        {error && <div className="form__error">{error}</div>}
        <p className={styles.text}>
          Already have an account? Login
          <Link to="/login" className={styles.link}>
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
