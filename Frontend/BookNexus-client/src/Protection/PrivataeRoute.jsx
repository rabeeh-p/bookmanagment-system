import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to nested routes if token exists
  return <Outlet />;
};

export default PrivateRoute;
