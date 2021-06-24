import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';

// eslint-disable-next-line
const ProtectedRoute = ({ component, ...rest }) => {
  const Component = component;
  const { loggedInUser } = useAuth();

  if (loggedInUser === undefined) return <CircularProgress />;

  return loggedInUser ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
