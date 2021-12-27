import { Database } from './Database';
import { Table } from './Table';

const DATABASES = [];

describe('The app', () => {
  test('should create database', () => {
    const db = new Database(DATABASES);
    db.createDatabase('Database 1');

    expect(DATABASES[0]).toEqual({
      name: 'Database 1',
      tables: []
    });
  });

  test('should create table', () => {
    const db = new Database(DATABASES, 0);
    db.createTable('Table 1');

    expect(DATABASES[0].tables[0]).toEqual({ id: 1, name: 'Table 1', columns: [], rows: [] });
  });

  test('should add columns', () => {
    const table = new Table();
    table.addCol('col 1', 'integer');

    expect(DATABASES[0].tables[0].columns).toEqual([{ name: 'col 1', type: 'integer' }]);
  });

  test('should add values to cells', () => {
    const table = new Table();
    table.addRow();
    table.saveCell(0, 0, { value: 12 });

    expect(DATABASES[0].tables[0].rows[0][0]).toEqual({ value: 12 });
  });
});


