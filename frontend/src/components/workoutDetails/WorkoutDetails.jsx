import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import styles from './WorkoutDetails.module.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  // update workouts once logout
  useEffect(() => {
    !user && dispatch({ type: 'SET_WORKOUTS', payload: null });
  }, [dispatch, user]);

  const handleClick = async () => {
    if (!user) return;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/workouts/${workout._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className={styles.workout__details}>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className={styles.update__btn}>
        <Link to={`/workouts/${workout._id}`}>
          <AiOutlineEdit size={20} />
        </Link>
      </span>
      <span className={styles.delete__btn}>
        <div>
          <RiDeleteBin6Line onClick={handleClick} size={20} />
        </div>
      </span>
    </div>
  );
};

export default WorkoutDetails;
