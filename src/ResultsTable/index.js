/* eslint-disable react/prop-types */
import React from 'react';
import ResultRow from '../ResultRow/index';
import './index.css';

const ResultsTable = ({ results, onAddClick }) => {
  const rows = results.map((result) => (
    <ResultRow key={result.fdcId} data={result} onRowClick={onAddClick} />
  ));

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Brand</th>
          <th>Cal. per serving</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ResultsTable;
