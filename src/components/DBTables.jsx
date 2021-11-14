import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataDisplayer } from './DataDisplayer';

export const DBTables = ({ dbIndex }) => {
  const dispatch = useDispatch();

  const [isFileOpen, setIsFileOpen] = useState(false);
  const [file, setFile] = useState({});
  const [tableName, setTableName] = useState('');

  const tables = useSelector((store) => store[dbIndex]?.tables) || [];

  const handleFileOpen = (file) => () => {
    setFile(file);
    setIsFileOpen(true);
  };

  const handleFileClose = () => setIsFileOpen(false);

  const createTable = () => {
    dispatch({ type: 'CREATE_TABLE', name: tableName, dbIndex });
    setTableName('');
  };

  return (
    <div className="tables">
      {isFileOpen && (
        <div className="file">
          <button onClick={handleFileClose}>Close file</button>
          {file?.filename}
          {file?.data ? <pre><code style={{ margin: 0, lineHeight: 1.5 }}>{file?.data}</code></pre> :
            <div><i>The file is empty</i></div>}
        </div>
      )}
      {
        tables.map((table, index) => (
          <div key={`table-${table.name}-${index}`}>
            <h3>{table.name || 'Unnamed table'}</h3>
            <table>
              <tr>
                {table.columns?.map((colObj) => (
                  <th key={`table-${table.name}-${index}-header-${colObj.name}`}>
                    <div className="bold">{colObj.name}</div>
                  </th>
                ))}
              </tr>
              {
                table.rows?.map((row) => (
                  <tr key={`table-${table.name}-${index}-row-${row}`}>
                    {
                      row.map((col, index) => (
                        <td key={`table-${table.name}-${index}-cell-${row}-${col}`}>
                          <DataDisplayer data={col} type={table.columns[index].type} handleFileOpen={handleFileOpen}/>
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </table>
          </div>
        ))
      }
      <div className="database">
        <input value={tableName} onChange={({ target }) => setTableName(target.value)}/>
        <div style={{ margin: 5 }}>
          <button disabled={!tableName} className="new" style={{ opacity: tableName ? 1 : 0.3 }} onClick={createTable}>
            + Add new table
          </button>
        </div>
      </div>
    </div>
  );
};
