import initialState from '../DATABASES.json';
import { Database } from '../classes/Database';
import { Table } from '../classes/Table';

export const rootReducer = (state = initialState, action) => {
  let db, table;

  switch (action.type) {
    case 'CREATE_DB':
      db = new Database(state);

      return db.createDatabase();
    case 'CREATE_TABLE':
      db = new Database(state, action.dbIndex);

      return db.createTable(action.name);

    case 'SAVE_CELL':
      const { cellId, data } = action;

      table = new Table(state, cellId.dbIndex, cellId.tableID);

      return table.saveCell(cellId.rowIndex, cellId.colIndex, data);
    case 'ADD_COLUMN':
      const { dbIndex, tableID, colName, colType } = action;

      table = new Table(state, dbIndex, tableID);

      return table.addCol(colName, colType);

    default:
      return state;
  }
};
