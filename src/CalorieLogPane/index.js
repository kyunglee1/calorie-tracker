/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

const CalorieLogPane = ({ data, onDeleteClick }) => {
  const { description } = data;
  const { servingSize } = data;
  const { servingSizeUnit } = data;
  const calories = data.foodNutrients.find((x) => x.nutrientId === 1008)?.value;

  const handleClick = () => {
    onDeleteClick(data.fdcId, calories);
  };
  // Serving size can be undefined!
  return (
    <div className="log-pane">
      <button className="remove-button" type="button" onClick={handleClick}>
        X
      </button>
      <span className="log-description">{description.toUpperCase()}</span>
      <span>{`Serving Size: ${servingSize}${servingSizeUnit}`}</span>
      <span>{`${calories} kcal`}</span>
    </div>
  );
};

export default CalorieLogPane;
