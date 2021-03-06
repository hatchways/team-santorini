import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { FormikHelpers } from 'formik';

import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import AuthDemo from '../../components/AuthDemo/AuthDemo';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import Image from '../../Images/istock-1098364450.jpg';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    register(email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item sm={4} md={5}>
        <Box display={{ xs: 'none', sm: 'block' }}>
          <img src={Image} height="100%" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box className={classes.authWrapper}>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Box>
              <Typography className={classes.welcome} component="h1" variant="h5" align="center">
                Sign up to Kanban
              </Typography>
            </Box>
            <SignUpForm handleSubmit={handleSubmit} />
            <AuthDemo />
          </Box>
          <Divider />
          <AuthHeader linkTo="/login" asideText="Already have an account?" btnText="Login" />
        </Box>
      </Grid>
    </Grid>
  );
}
