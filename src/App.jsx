import { lazy, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectRoute from './auth/ProtectRoute';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './Redux/features/darkTheme/darkThemeSlice';
import ChangePassword from './pages/ChangePassword';
import DeleteAccount from './pages/DeleteAccount';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
// ================ import pages =====================
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Testing = lazy(() => import('./Testing'));
const Signup = lazy(() => import('./pages/Signup'));

// let user = false;
function App() {
  const [auth, setAuth] = useState(null);
  const authUser = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('token');

    if (login) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [authUser]);

  return (
    <>
      <Routes>
        <Route element={<ProtectRoute user={!auth} redirect="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/delete_account" element={<DeleteAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testing" element={<Testing />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
