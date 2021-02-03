/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

const CalorieLogPane = ({ data }) => {
  const { description } = data;
  const { servingSize } = data;
  const { servingSizeUnit } = data;
  const calories = data.foodNutrients.find((x) => x.nutrient.id === 1008)
    ?.amount;
  // Serving size can be undefined!
  return (
    <div className="log-pane">
      <button className="remove-button" type="button">
        X
      </button>
      <span>{description}</span>
      <span>{`Serving Size: ${servingSize}${servingSizeUnit}`}</span>
      <span>{`${calories} kcal`}</span>
    </div>
  );
};

export default CalorieLogPane;
