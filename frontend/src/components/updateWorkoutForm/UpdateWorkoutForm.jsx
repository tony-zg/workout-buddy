import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import styles from './UpdateWorkoutForm.module.css';

const UpdateWorkoutForm = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    load: '',
    sets: '',
    reps: ''
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { title, load, sets, reps } = inputs;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/workouts/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      }
    );

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (res.ok) {
      setInputs({ title: '', load: '', sets: '', reps: '' });
      setError(null);
      setEmptyFields([]);
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="form__outer__container">
      <form
        className={`${styles.update} form__container`}
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className={styles.title}> Update a Workout</h3>
          <label>Excercise Title:</label>
          <input
            type="text"
            onChange={handleChange}
            name="title"
            value={title}
            className={
              user && emptyFields.includes('title') ? 'input__error' : ''
            }
            autoFocus="autofocus"
          />
          <label>Load (in kg):</label>
          <input
            type="number"
            onChange={handleChange}
            name="load"
            value={load}
            className={
              user && emptyFields.includes('load') ? 'input__error' : ''
            }
          />
          <label>Sets:</label>
          <input
            type="number"
            onChange={handleChange}
            name="sets"
            value={sets}
            className={
              user && emptyFields.includes('sets') ? 'input__error' : ''
            }
          />
          <label>Reps:</label>
          <input
            type="number"
            onChange={handleChange}
            name="reps"
            value={reps}
            className={
              user && emptyFields.includes('reps') ? 'input__error' : ''
            }
          />
          <div className={styles.btn__container}>
            <button className="form__btn" type="submit">
              Update
            </button>
            <Link to="/">
              <button className="form__btn">Cancel</button>
            </Link>
          </div>
          {error && <p className="form__error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateWorkoutForm;
