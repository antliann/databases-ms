import React, { useCallback, useState } from 'react';
import { dataTypes } from '../classes/dataTypes';
import { useDispatch } from 'react-redux';

export const AddRowModal = ({ type, isOpen, initVal, closeModal, cellId }) => {
  const dispatch = useDispatch();

  const [currentValue, setValue] = useState(initVal);
  const [isError, setIsError] = useState(false);

  const renderInputs = () => {
    switch (type) {
      case 'textfile':
        return;
      case 'intInterval':
        return (
          <input/>
        );
      default:
        return (
          <input
            value={currentValue}
            onChange={handleInputChange}
            placeholder={`${type} value`}
            className={isError ? 'error' : ''}
          />
        );
    }
  };

  const saveValue = useCallback(() => {
    switch (type) {
      case 'textFile':
        saveDataIntoCell({ filename: '', data: '' });
        return;
      case 'intInterval':
        saveDataIntoCell({ minValue: '', maxValue: '' });
        return;
      default:
        if (!isValid()) {
          setIsError(true);
          return;
        }
        saveDataIntoCell({ value: currentValue });
    }
  }, []);

  if (!!isOpen) return null;

  const handleInputChange = ({ target }) => {
    setIsError(false);
    setValue(target.value);
  };

  const saveDataIntoCell = (data) => {
    dispatch({ type: 'SAVE_CELL', cellId, data });
  };

  const isValid = (value) => dataTypes.find((el) => el.type === type)?.regex.test(value);

  return (
    <div className="bg">
      <div className="modal">
        <h2>Edit value</h2>
        <h3>Value type: {type}</h3>
        {renderInputs()}
        <div className="buttons">
          <button className="cancel" onClick={closeModal}>Cancel</button>
          <button className="new" onClick={saveValue} disabled={isError} style={{ opacity: isError ? 0.3 : 1 }}>Save
          </button>
        </div>
      </div>
    </div>
  );
};
