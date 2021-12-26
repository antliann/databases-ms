import initialState from '../DATABASES.json';
import { Database } from '../classes/Database';
import { Table } from '../classes/Table';

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_DB':
      const db = new Database(state, action.name);
      const newState = db.createDatabase();

      return newState;
    case 'CREATE_TABLE':
      const table = new Table(state, action.dbIndex, action.name);
      return table.createTable();
    case 'SAVE_CELL':
      const { cellId } = action;
    default:
      return state;
  }
};
