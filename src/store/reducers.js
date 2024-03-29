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

    case 'DELETE_TABLE':
      db = new Database(state, action.dbIndex);
      return db.deleteTable(action.tableID);

    case 'SAVE_CELL':
      const { cellId, data } = action;
      table = new Table(state, cellId.dbIndex, cellId.tableID);

      return table.saveCell(cellId.rowIndex, cellId.colIndex, data);

    case 'ADD_COLUMN':
      const { dbIndex: dbIndexCol, tableID: tableIDCol, colName, colType } = action;
      table = new Table(state, dbIndexCol, tableIDCol);

      return table.addCol(colName, colType);
    case 'EDIT_COLUMN':
      const { dbIndex: dbIndexColEd, tableID: tableIDColEd, colName: colNameEd, colIndex } = action;
      table = new Table(state, dbIndexColEd, tableIDColEd);

      return table.editCol(colNameEd, colIndex);

    case 'ADD_ROW':
      const { dbIndex: dbIndexRow, tableID: tableIDRow } = action;
      table = new Table(state, dbIndexRow, tableIDRow);

      return table.addRow();

    default:
      return state;
  }
};
