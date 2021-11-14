import React from 'react';
import { useSelector } from 'react-redux';

export const DBTables = ({ dbIndex }) => {
  const database = useSelector((store) => store[dbIndex]) || [];

  return (
    <div className="tables">

    </div>
  )
}