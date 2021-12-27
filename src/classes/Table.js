export class Table {
  constructor(globalState, dbIndex, tableID = -1) {
    this.databases = JSON.parse(JSON.stringify(globalState));
    this.dbIndex = dbIndex;
    this.table = this.databases[this.dbIndex].tables.find((table) => table.id === tableID);
  }

  addCol(name, type) {
    this.table.columns.push({ name, type });

    return this.databases;
  }

  editCol(newColName, colIndex) {
    this.table.columns[colIndex].name = newColName;

    return this.databases;
  }

  saveCell(row, col, data) {
    this.table.rows[row][col] = data;

    return this.databases;
  }

  addRow() {
    this.table.rows.push(Array(this.table.columns.length).fill({}));

    return this.databases;
  }
}
