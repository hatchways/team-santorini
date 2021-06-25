const initialData = {
  cards: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      cardIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      cardIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      cardIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;
