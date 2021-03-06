import { makeStyles } from '@material-ui/core/styles';

const cardContainerStyling = {
  fontWeight: 'bold',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '8px',
};

const useStyles = makeStyles(() => ({
  boardContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '8px',
    borderRadius: '10px',
    width: '220px',
    backgroundColor: '#f4f6ff',
  },
  columnTitle: {
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '10px 20px 0px 20px',
  },
  cardList: {
    padding: '8px',
    flexGrow: 1,
    backgroundColor: '#f4f6ff',
    minHeight: '100px',
  },
  cardListDraggingOver: {
    padding: '8px',
    flexGrow: 1,
    backgroundColor: 'skyblue',
    minHeight: '100px',
  },
  cardContainer: {
    ...cardContainerStyling,
    backgroundColor: 'white',
  },
  cardContainerDrag: {
    ...cardContainerStyling,
    backgroundColor: 'lightgreen',
  },
  addCardField: {
    width: '100%',
    padding: '8px',
    '& .Mui-focused': {
      ...cardContainerStyling,
      backgroundColor: 'white',
    },
  },
}));

export default useStyles;
