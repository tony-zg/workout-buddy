import { useAuthContext } from './useAuthContext';
// import { useWorkoutsContext } from './useWorkoutsContext';

const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch: workoutsDispatch } = useWorkoutsContext;

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

export default useLogout;
