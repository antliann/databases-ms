import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { DBTables } from './components/DBTables';

const App = () => {
  const [dbIndex, setDbIndex] = useState(-1);

  const databases = useSelector((store) => store) || [];

  const chooseDb = (index) => () => setDbIndex(index);

  return (
    <>
      <h2>Database management system by Anton Liannoi</h2>
      <h3>Databases list:</h3>
      <div className="database new">+ Add new database</div>
      {databases.map((db, index) => (
        <div key={'db' + index} onClick={chooseDb(index)}
             className={"database" + (dbIndex === index ? " bold" : "")}>{db.name || 'Unnamed database'}</div>
      ))}
      <DBTables dbIndex={dbIndex}/>
    </>
  );
};

export default App;
