export class Database {
  constructor(globalState, name) {
    this.globalState = globalState;
    this.name = name;
  }

  createDatabase() {
    return [
      {
        name: this.name,
        tables: []
      },
      ...this.globalState,
    ];
  }
  
  createTable(dbIndex) {
    
  }
}
