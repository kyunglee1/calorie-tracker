/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ResultRow from '../ResultRow/index';
import './index.css';

const ResultsTable = ({ item, onAddClick }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${item}&api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy&pageSize=3&pageNumber=1`
    )
      .then((res) => res.json())
      .then((data) => {
        const results = [];
        data.foods.forEach((result) =>
          results.push(
            <ResultRow
              key={result.fdcId}
              data={result}
              onRowClick={onAddClick}
            />
          )
        );
        setRows(results);
      });
  }, [item]);

  return (
    <table className="results-table">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ResultsTable;
