import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';

// css modules
import styles from './styles/App.module.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import UpdateWorkoutForm from './components/updateWorkoutForm/UpdateWorkoutForm';

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className={styles.pages}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/workouts/:id"
              element={user ? <UpdateWorkoutForm /> : <Navigate to="/signup" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
