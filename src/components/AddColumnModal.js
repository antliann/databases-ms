import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const dataTypes = ['integer', 'real', 'char', 'string', 'textfile', 'intInterval'];

export const AddColumnModal = ({ closeModal, tableID, name, type, dbIndex, colIndex }) => {
  const dispatch = useDispatch();

  const [colName, setColName] = useState(name || '');
  const [colType, setColType] = useState(type || '');

  const handleInputChange = (setter) => ({ target }) => {
    setter(target.value);
  };

  const saveValue = () => {
    if (name) {
      dispatch({ type: 'EDIT_COLUMN', tableID, dbIndex, colIndex, colName });
    } else {
      dispatch({ type: 'ADD_COLUMN', tableID, dbIndex, colName, colType });
    }
    closeModal();
  };

  const isEmpty = !(colName || colType);

  return (
    <div className="bg">
      <div className="modal">
        <h2>{name ? 'Edit' : 'Add'} column</h2>
        <input
          value={colName}
          onChange={handleInputChange(setColName)}
          placeholder="Enter column name"
        />
        <select disabled={!!name} onSelect={handleInputChange(setColType)}>
          <option disabled>Select data type...</option>
          {dataTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <div className="buttons">
          <button className="cancel" onClick={closeModal}>Cancel</button>
          <button className="new" onClick={saveValue} disabled={isEmpty} style={{ opacity: isEmpty ? 0.6 : 1 }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
