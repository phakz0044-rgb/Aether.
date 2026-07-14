import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Companies from '../pages/Companies/Companies';
import Chat from '../pages/Chat/Chat';

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/companies', element: <Companies /> },
  { path: '/chat', element: <Chat /> },
]);

export default router;
