import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataDisplayer } from './DataDisplayer';
import { AddRowModal } from './AddRowModal';

import pencil from '../pencil.png';
import { AddColumnModal } from './AddColumnModal';

export const DBTables = ({ dbIndex }) => {
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState(null);
  const [colData, setColData] = useState(null);

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

  const handleAddCol = (tableID, colIndex = -1, colObj = {}) => () => {
    setColData({
      ...colObj,
      tableID,
      dbIndex,
      colIndex
    });
  };

  const closeAddColModal = () => setColData(null);

  const closeModal = () => setModalData(null);

  const handleAddRow = (tableID) => () => dispatch({ type: 'ADD_ROW', tableID, dbIndex });

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
      {
        colData && (
          <AddColumnModal closeModal={closeAddColModal} {...colData} />
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
            <button
              disabled={!tableName}
              className="new"
              style={{ opacity: tableName ? 1 : 0.3 }}
              onClick={createTable}
            >
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
                  {table.columns?.map((colObj, colIndex) => (
                    <th key={`table-${table.id}-${tableIndex}-header-${colObj.name}`}>
                      <p className="bold">{colObj.name}
                        <button onClick={handleAddCol(table.id, colIndex, colObj)} style={{ margin: 5 }}>
                          <img src={pencil} height="10px" width="10px" alt="Edit" style={{ margin: 0 }}/>
                        </button>
                      </p>

                    </th>
                  ))}
                  {
                    !table.rows.length && (
                      <th>
                        <button className="new" onClick={handleAddCol(table.id)}>Add column</button>
                      </th>
                    )
                  }
                </tr>
                {
                  table.rows?.map((row, rowIndex) => (
                    <tr key={`table-${table.id}-${tableIndex}-row-${rowIndex}`}>
                      {
                        row.map((col, colIndex) => (
                          <td
                            key={`table-${table.id}-${colIndex}-cell-${row}-${col}`}
                            style={{ position: 'relative', paddingBottom: 40, minWidth: 120 }}
                          >
                            <DataDisplayer
                              data={col}
                              type={table.columns[colIndex].type}
                              handleFileOpen={handleFileOpen}
                            />
                            <button
                              className="edit-btn"
                              onClick={editCell({
                                data: col,
                                cellId: { dbIndex, tableID: table.id, rowIndex, colIndex },
                                type: table.columns[colIndex].type
                              })}
                            >
                              <img src={pencil} height="10px" width="10px" alt="Edit" style={{ margin: 5 }}/>
                            </button>
                          </td>
                        ))
                      }
                    </tr>
                  ))
                }
                {
                  !table.columns?.length || (
                    <tr>
                      <td colSpan={table.columns?.length}>
                        <button className="new" onClick={handleAddRow(table.id)}>Add row</button>
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
