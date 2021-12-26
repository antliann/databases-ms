import React from 'react';

const NoData = () => (
  <div style={{ opacity: 0.4 }}>No data</div>
);

export const DataDisplayer = ({ data, type, handleFileOpen }) => {
  switch (type) {
    case 'textfile':
      if (!data.filename) {
        return <NoData/>;
      }
      return (
        <div>
          <div style={{ margin: 5 }}>{data.filename}</div>
          <button style={{ margin: 5 }} onClick={handleFileOpen(data)}>Open file</button>
        </div>
      );
    case 'intInterval':
      if (!data.minValue) {
        return <NoData/>;
      }
      return (
        <div>{data.minValue}..{data.maxValue}</div>
      );
    default:
      if (!data.value) {
        return <NoData/>;
      }
      return <div>{data.value}</div>;
  }
};
