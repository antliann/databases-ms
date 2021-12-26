import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { DBTables } from './components/DBTables';

const App = () => {
  const dispatch = useDispatch();

  const [dbIndex, setDbIndex] = useState(-1);
  const [dbName, setDbName] = useState('');

  const databases = useSelector((store) => store) || [];

  const chooseDb = (index) => () => setDbIndex(index);

  const createDatabase = () => {
    dispatch({ type: 'CREATE_DB', name: dbName });
    setDbName('');
  };

  return (
    <>
      <h2>Database management system by Anton Liannoi (variant 19)</h2>
      <h3 style={{ margin: '45px 20px 30px 20px' }}>Databases list:</h3>
      <div className="database">
        <input value={dbName} onChange={({ target }) => setDbName(target.value)}/>
        <div style={{ margin: 5 }}>
          <button disabled={!dbName} className="new" style={{ opacity: dbName ? 1 : 0.3 }} onClick={createDatabase}>
            + Add new database
          </button>
        </div>
      </div>
      {databases?.map((db, index) => (
        <div
          key={`db-${index}-${db.name}`}
          onClick={chooseDb(index)}
          className={"database" + (dbIndex === index ? " bold" : "")}
        >
          {db.name || 'Unnamed database'}
        </div>
      ))}
      <DBTables dbIndex={dbIndex + 1}/>
    </>
  );
};

export default App;
