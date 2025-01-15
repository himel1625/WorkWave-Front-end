import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import useAuth from '../Hooks/useAuth';
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (user) return children;
  return <Navigate to='/login' state={location.pathname} />;
};
export default PrivateRoute;
