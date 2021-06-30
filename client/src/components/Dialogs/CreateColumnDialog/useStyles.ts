import { makeStyles } from '@material-ui/core/styles';

const marginComponent = 15;

const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: 0,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    borderRadius: 1,
    width: 1,
    height: 1,
    color: 'lightgrey',
  },
  title: {
    margin: marginComponent,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    margin: marginComponent,
  },
  textField: {
    width: 300,
    centerText: {
      textAlign: 'center',
    },
  },
  text: {
    align: 'center',
  },
  actions: {
    margin: marginComponent,
    justifyContent: 'center',
  },
  createButton: {
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#759CFC',
  },
}));

export default useStyles;
