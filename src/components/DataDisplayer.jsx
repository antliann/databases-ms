import React from 'react';

export const DataDisplayer = ({ data, type }) => {
  switch (type) {
    case 'textfile':
      return (
        <div>
          <div style={{ margin: 5 }}>{data?.filename}</div>
          <button style={{ margin: 5 }}>Open file</button>
        </div>
      );
    case 'intInterval':
      return (
        <div>{data.minValue} .. {data.maxValue}</div>);
    default:
      return <div>{data?.value}</div>;
  }
};