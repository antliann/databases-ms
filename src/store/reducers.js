import initialState from '../DATABASES.json';

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_DB':
      return [
        {
          name: action.name,
          tables: []
        },
        ...state
      ];
    case 'CREATE_TABLE':
      const stateDeepCopy = JSON.parse(JSON.stringify(state));

      stateDeepCopy[action.dbIndex].tables.push({ name: action.name, columns: [], rows: [] });

      return stateDeepCopy;
    default:
      return state;
  }
};
