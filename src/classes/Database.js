export class Database {
  constructor(globalState, dbIndex = -1) {
    this.databases = JSON.parse(JSON.stringify(globalState));
    this.dbIndex = dbIndex;
  }

  createDatabase(name) {
    return [
      {
        name,
        tables: []
      },
      ...this.databases,
    ];
  }

  createTable(name) {
    const dbTables = this.databases[this.dbIndex].tables;
    const nextID = (+dbTables[dbTables.length - 1].id || 1) + 1;

    this.databases[this.dbIndex].tables.push({ id: nextID, name, columns: [], rows: [] });

    return this.databases;
  }
}
