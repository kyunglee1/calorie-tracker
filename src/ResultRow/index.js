/* eslint-disable react/prop-types */
import React from 'react';

const ResultRow = ({ data, onRowClick }) => {
  const { description } = data;
  const { brandOwner } = data;
  const { fdcId } = data;
  const calories = data.foodNutrients.find((x) => x.nutrientId === 1008)?.value;

  const handleClick = () => {
    onRowClick(fdcId);
  };

  return (
    <tr onClick={handleClick}>
      <td>{description}</td>
      <td>{brandOwner}</td>
      <td>{`Cal: ${calories} per serving`}</td>
    </tr>
  );
};

export default ResultRow;
