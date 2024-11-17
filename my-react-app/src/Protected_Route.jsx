import{ useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { AuthContext } from './Authcontext'; // Import the AuthContext

// ProtectedRoute component to restrict access to routes based on authentication status
const ProtectedRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext); // Access the currentUser from context

  // If the user is authenticated, render the protected element
  // If not authenticated, redirect the user to the login page
  return currentUser ? element : <Navigate to="/login" replace />;
};

// Add PropTypes validation for the `element` prop
ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired, // `element` must be a React node (JSX, components, etc.)
};

export default ProtectedRoute;
