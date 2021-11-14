import React from 'react';
import { useSelector } from 'react-redux';
import { DataDisplayer } from './DataDisplayer';

export const DBTables = ({ dbIndex }) => {
  const tables = useSelector((store) => store[dbIndex]?.tables) || [];

  return (
    <div className="tables">
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
                          <DataDisplayer data={col} type={table.columns[index].type}/>
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
    </div>
  );
};
