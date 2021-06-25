import { FunctionComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  path: string;
  component: FunctionComponent;
}

const LoginRoute = ({ path, component }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? <Redirect to="/dashboard" /> : <Route exact path={path} component={component} />;
};

export default LoginRoute;
