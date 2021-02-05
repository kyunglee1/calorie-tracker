/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './index.css';

const CalorieLogPane = ({
  entry,
  caloriesPer100,
  calorieCount,
  onInputChange,
  onDeleteClick,
}) => {
  const [portionSize, setPortionSize] = useState(100);
  const [servingUnit, setServingUnit] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  const { description } = entry;

  useEffect(() => {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${entry.fdcId}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`
    )
      .then((res) => res.json())
      .then((data) => {
        setServingUnit(data.servingSizeUnit ?? 'g');
        setFoodCategory(
          data.brandedFoodCategory ?? data.foodCategory?.description
        );
      });
  }, [entry]);

  const handleClick = () => {
    onDeleteClick(entry.fdcId);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setPortionSize(input);

    const newCalorieCount = Math.ceil((input / 100) * caloriesPer100);
    onInputChange(entry.fdcId, newCalorieCount);
  };

  return (
    <div className="log-pane">
      <button className="remove-button" onClick={handleClick}>
        X
      </button>
      <span className="log-description">
        {description.toUpperCase().trim()}
        <br />
        <i>{foodCategory}</i>
      </span>
      <span className="serving-size">
        Serving Size:
        <input
          type="number"
          step="50"
          min="0"
          value={portionSize}
          onChange={handleChange}
        />
        {servingUnit}
      </span>
      <span>{`${calorieCount} kcal`}</span>
    </div>
  );
};

export default CalorieLogPane;
