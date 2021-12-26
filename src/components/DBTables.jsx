import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataDisplayer } from './DataDisplayer';
import { AddRowModal } from './AddRowModal';

export const DBTables = ({ dbIndex }) => {
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState(null);

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

  const editCell = (data) => () => setModalData(data);

  const closeModal = () => setModalData(null);

  return (
    <>
      {
        modalData && (
          <AddRowModal
            cellId={modalData?.cellId}
            initVal={modalData?.data}
            type={modalData?.type}
            closeModal={closeModal}
          />
        )
      }
      <div className="tables">
        {isFileOpen && (
          <div className="file">
            <button onClick={handleFileClose}>Close file</button>
            {file?.filename}
            {file?.data ? <pre><code style={{ margin: 0, lineHeight: 1.5 }}>{file?.data}</code></pre> :
              <div><i>The file is empty</i></div>}
          </div>
        )}
        <div className="database">
          <input value={tableName} onChange={({ target }) => setTableName(target.value)}/>
          <div style={{ margin: 5 }}>
            <button disabled={!tableName} className="new" style={{ opacity: tableName ? 1 : 0.3 }}
                    onClick={createTable}>
              + Add new table
            </button>
          </div>
        </div>
        {
          tables.map((table, tableIndex) => (
            <div key={`table-${table.name}-${tableIndex}`}>
              <h3>{table.name || 'Unnamed table'}</h3>
              <table>
                <tr>
                  {table.columns?.map((colObj) => (
                    <th key={`table-${table.id}-${tableIndex}-header-${colObj.name}`}>
                      <div className="bold">{colObj.name}</div>
                    </th>
                  ))}
                  <th>
                    <button className="new">Add column</button>
                  </th>
                </tr>
                {
                  table.rows?.map((row, rowIndex) => (
                    <tr key={`table-${table.id}-${tableIndex}-row-${row}`}>
                      {
                        row.map((col, colIndex) => (
                          <td key={`table-${table.id}-${colIndex}-cell-${row}-${col}`}>
                            <DataDisplayer
                              data={col}
                              type={table.columns[colIndex].type}
                              handleFileOpen={handleFileOpen}
                            />
                            <button
                              onClick={editCell({
                                data: col,
                                cellId: { dbIndex, tableIndex, rowIndex, colIndex },
                                type: table.columns[colIndex].type
                              })}
                            >
                              Edit value
                            </button>
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
                {
                  !table.rows?.length || (
                    <tr>
                      {table.columns?.map((colObj) => (
                        <td key={`table-${table.name}-${tableIndex}-footer-${colObj.name}`}>
                          <button>Add value</button>
                        </td>
                      ))}
                      <td>
                        <button className="new">Save row</button>
                      </td>
                    </tr>
                  )
                }
                {
                  !table.columns?.length || (
                    <tr>
                      <td colSpan={table.columns?.length}>
                        <button className="new">Add row</button>
                      </td>
                    </tr>
                  )
                }
              </table>
            </div>
          ))
        }
      </div>
    </>
  );
};
