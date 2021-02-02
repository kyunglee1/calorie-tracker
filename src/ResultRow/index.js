/* eslint-disable react/prop-types */
import React from 'react';

const ResultRow = ({ data, onRowClick }) => {
  const { description } = data;
  const { brandOwner } = data;
  const { fdcId } = data;
  let calories;

  data.foodNutrients.forEach((object) => {
    if (object.nutrientId === 1008) {
      calories = `Cal: ${object.value}`;
    }
    // if (object.nutrientId === 1005) {
    //   carbs = `Carbs: ${object.value} ${object.unitName}`;
    // }
    // if (object.nutrientId === 1004) {
    //   fat = `Fat: ${object.value} ${object.unitName}`;
    // }
    // if (object.nutrientId === 1003) {
    //   protein = `Protein: ${object.value} ${object.unitName}`;
    // }
  });

  const handleClick = () => {
    onRowClick(fdcId);
  };

  return (
    // eslint-disable-next-line no-alert
    <tr onClick={handleClick}>
      <td>{description}</td>
      <td>{brandOwner}</td>
      <td>{`${calories} per serving`}</td>
    </tr>
  );
};

export default ResultRow;
