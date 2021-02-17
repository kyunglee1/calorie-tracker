/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import getUrl from '../../helper/getUrl';
import './index.css';

const CalorieLogPane = (props) => {
  // Food item's serving size unit (g/mL)
  const [servingUnit, setServingUnit] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  // Food item's description/name
  const { description } = props.entry;

  // Food item's calories per 100 g or mL
  const caloriesPer100 =
    props.entry.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

  // Food item's calories respective to its  current portion size
  const calorieCount = (props.portionSize / 100) * caloriesPer100;

  // Fetch serving size unit & food category
  useEffect(() => {
    fetch(getUrl(props.entry.fdcId))
      .then((res) => res.json())
      .then((data) => {
        // Default unit = grams
        setServingUnit(data.servingSizeUnit ?? 'g');
        // Check the two properties below for food category
        setFoodCategory(
          data.brandedFoodCategory ?? data.foodCategory?.description
        );
      });
  }, [props.entry]);

  const handleClick = () => {
    props.onDeleteClick(props.entry.fdcId);
  };

  /* Handler for 'serving-size' input change. Updates
     the portion size & total calories for this entry. */
  const handleChange = (e) => {
    const portionSize = e.target.value;
    const newCalorieCount = Math.ceil((portionSize / 100) * caloriesPer100);

    props.onInputChange(props.entry.fdcId, newCalorieCount, portionSize);
  };

  return (
    <div className={`log-pane ${props.paneType}`}>
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
          value={props.portionSize}
          onChange={handleChange}
        />
        {servingUnit}
      </span>
      <span className="calorie-count">{`${calorieCount} kcal`}</span>
    </div>
  );
};

export default CalorieLogPane;
