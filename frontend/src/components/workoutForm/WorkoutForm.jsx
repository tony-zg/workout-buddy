import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import styles from './WorkoutForm.module.css';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
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
      setError('You must be logged in!');
      return;
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (res.ok) {
      setInputs({ title: '', load: '', sets: '', reps: '' });
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div>
      <form className={styles.create} onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Excercise Title:</label>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          value={title}
          className={
            user && emptyFields.includes('title') ? 'input__error' : ''
          }
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={handleChange}
          name="load"
          value={load}
          className={user && emptyFields.includes('load') ? 'input__error' : ''}
        />
        <label>Sets:</label>
        <input
          type="number"
          onChange={handleChange}
          name="sets"
          value={sets}
          className={user && emptyFields.includes('sets') ? 'input__error' : ''}
        />
        <label>Reps:</label>
        <input
          type="number"
          onChange={handleChange}
          name="reps"
          value={reps}
          className={user && emptyFields.includes('reps') ? 'input__error' : ''}
        />

        <button className="form__btn" type="submit">
          Add Workout
        </button>

        {error && <p className="form__error">{error}</p>}
      </form>
    </div>
  );
};

export default WorkoutForm;
