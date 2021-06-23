import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import BoardUI from './components/BoardUI/BoardUI';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import BoardProvider from './mocks/mockUseBoardContext';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <BoardProvider>
            <AuthProvider>
              <SocketProvider>
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route exact path="/board-ui" component={BoardUI} />
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
              </SocketProvider>
            </AuthProvider>
          </BoardProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
