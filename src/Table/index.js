/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

const Table = ({ type }) => (
  <table className={type}>
    {type === 'tracker-table' && (
      <thead>
        <tr>
          <td colSpan="2">Calorie Tracker</td>
        </tr>
      </thead>
    )}
    <tbody>
      <tr>
        <td>Hello</td>
      </tr>
    </tbody>
  </table>
);

export default Table;
