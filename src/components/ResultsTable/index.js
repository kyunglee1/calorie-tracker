/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import ResultRow from '../ResultRow/index';
import './index.css';

const ResultsTable = ({ results, onAddClick }) => {
  // Map each result to a table row
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

const mapStateToProps = (state) => ({
  results: state.searchResults,
});

export default connect(mapStateToProps)(ResultsTable);
