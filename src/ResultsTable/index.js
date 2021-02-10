/* eslint-disable react/prop-types */
import React from 'react';
import ResultRow from '../ResultRow/index';
import './index.css';

const ResultsTable = ({ results, onAddClick }) => {
  const rows = results.map((result) => (
    <ResultRow key={result.fdcId} data={result} onRowClick={onAddClick} />
  ));

  /* Results are empty if input does not 
     match any database item.
      e.g. 'abcd123' */
  if (results.length === 0) {
    rows.push(
      <tr id="no-results">
        <td colSpan="3">N/A</td>
      </tr>
    );
  }

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
