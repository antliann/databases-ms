import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export const regex = {
  integer: /^-?\d+$/,
  real: /^-?\d+\.\d+$/,
  char: /^.$/,
  string: /^.*$/,
};

export const AddRowModal = ({ type, initVal, closeModal, cellId }) => {
  const dispatch = useDispatch();

  const [currentValue, setValue] = useState(initVal?.value || '');

  const [firstVal, setFirstValue] = useState(initVal?.minValue || '');
  const [secondVal, setSecondVal] = useState(initVal?.maxValue || '');
  const [isError, setIsError] = useState(0);

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const renderInputs = () => {
    switch (type) {
      case 'textfile':
        return (
          <>
            <input id="file-input" type="file" name="Upload file" accept="text/plain" onChange={changeHandler}/>
            <label htmlFor="file-input" className="file-label">{initVal.filename || 'No file chosen'}</label>
          </>
        );
      case 'intInterval':
        return (
          <>
            <input
              value={firstVal}
              onChange={handleInputChange(setFirstValue)}
              placeholder={`Enter integer value`}
              className={[1, 3].includes(isError) ? 'error' : ''}
            />
            -
            <input
              value={secondVal}
              onChange={handleInputChange(setSecondVal)}
              placeholder={`Enter integer value`}
              className={[2, 3].includes(isError) ? 'error' : ''}
            />
          </>
        );
      default:
        return (
          <input
            value={currentValue}
            onChange={handleInputChange(setValue)}
            placeholder={`Enter ${type} value`}
            className={isError ? 'error' : ''}
          />
        );
    }
  };

  const saveValue = () => {
    switch (type) {
      case 'textfile':
        const reader = new FileReader();
        reader.onload = ({ target }) => {
          saveDataIntoCell({ filename: selectedFile.name, data: target.result });
        };
        reader.readAsText(selectedFile);
        closeModal();
        return;
      case 'intInterval':
        if ((!regex.integer.test(firstVal) && !regex.integer.test(secondVal)) || Number(firstVal) > Number(secondVal)) {
          setIsError(3);
          return;
        }
        if (!regex.integer.test(firstVal)) {
          setIsError(1);
          return;
        }
        if (!regex.integer.test(secondVal)) {
          setIsError(2);
          return;
        }
        saveDataIntoCell({ minValue: firstVal, maxValue: secondVal });
        closeModal();
        return;
      default:
        if (!regex[type].test(currentValue)) {
          setIsError(3);
          return;
        }
        saveDataIntoCell({ value: currentValue });
        closeModal();
    }
  };

  const handleInputChange = (setter) => ({ target }) => {
    setIsError(0);
    setter(target.value);
  };

  const saveDataIntoCell = (data) => {
    dispatch({ type: 'SAVE_CELL', cellId, data });
  };

  return (
    <div className="bg">
      <div className="modal">
        <h2>Edit value</h2>
        <h3>Value type: {type}</h3>
        {renderInputs()}
        <div className="buttons">
          <button className="cancel" onClick={closeModal}>Cancel</button>
          <button className="new" onClick={saveValue} disabled={isError} style={{ opacity: isError ? 0.6 : 1 }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
