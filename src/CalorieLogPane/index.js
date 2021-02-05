/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './index.css';

const CalorieLogPane = (props) => {
  // Figure out if we need the portion / 100.
  const [portionSize, setPortionSize] = useState(props.portionSize);
  const [servingUnit, setServingUnit] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  const { description } = props.entry;
  const caloriesPer100 =
    props.entry.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;
  const calorieCount = (props.portionSize / 100) * caloriesPer100;

  useEffect(() => {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${props.entry.fdcId}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`
    )
      .then((res) => res.json())
      .then((data) => {
        setServingUnit(data.servingSizeUnit ?? 'g');
        setFoodCategory(
          data.brandedFoodCategory ?? data.foodCategory?.description
        );
      });
  }, [props.entry]);

  const handleClick = () => {
    props.onDeleteClick(props.entry.fdcId);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setPortionSize(input);

    const newCalorieCount = Math.ceil((input / 100) * caloriesPer100);
    props.onInputChange(props.entry.fdcId, newCalorieCount, input);
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
