export class Table {
  constructor(globalState, dbIndex, name) {
    this.globalState = globalState;
    this.dbIndex = dbIndex;
    this.name = name;
  }

  createTable() {
    const stateDeepCopy = JSON.parse(JSON.stringify(this.globalState));

    stateDeepCopy[this.dbIndex].tables.push({ name: this.name, columns: [], rows: [] });

    return stateDeepCopy;
  }
}
