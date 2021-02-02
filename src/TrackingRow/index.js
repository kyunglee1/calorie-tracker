/* eslint-disable react/prop-types */
import React from 'react';

const TrackingRow = ({ data }) => {
  const { description } = data;
  const { servingSize } = data;
  const { servingSizeUnit } = data;
  const calories = data.foodNutrients.find((x) => x.nutrient.id === 1008)
    .amount;
  // Serving size can be undefined!
  return (
    <tr>
      <td>{description}</td>
      <td>{`Serving size: ${servingSize}${servingSizeUnit}`}</td>
      <td>{`${calories} kcal`}</td>
    </tr>
  );
};

export default TrackingRow;
