/* eslint-disable react/prop-types */
import React from 'react';

const ResultRow = ({ data, onRowClick }) => {
  // Food item description/name
  const { description } = data;

  /* Food item brand owner 
      e.g. 'Coca-Cola' */
  const { brandOwner } = data;

  // Calories per 100 g (or mL) serving
  const calorieCount = data.foodNutrients.find((x) => x.nutrientId === 1008)
    ?.value;

  const handleClick = () => {
    onRowClick(data.fdcId);
  };

  return (
    <tr onClick={handleClick}>
      <td>{description}</td>
      <td>{brandOwner || 'N/A'}</td>
      <td>{calorieCount || 'N/A'}</td>
    </tr>
  );
};

export default ResultRow;
