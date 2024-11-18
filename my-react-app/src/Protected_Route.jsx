// ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from './Authcontext';

const ProtectedRoute = ({ element, accessibleToLoggedOut = false }) => {
  const { currentUser, loading } = useContext(AuthContext);

  // Show a loading state while authentication is initializing
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or your loading UI
  }

  // Restrict based on logged-in state
  if (!currentUser && !accessibleToLoggedOut) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser && accessibleToLoggedOut) {
    return <Navigate to="/mainpage" replace />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
  accessibleToLoggedOut: PropTypes.bool, // Optional prop for public routes
};

export default ProtectedRoute;
