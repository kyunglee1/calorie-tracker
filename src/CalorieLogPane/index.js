/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import getUrl from '../helper/getUrl';
import './index.css';

const CalorieLogPane = (props) => {
  const [servingUnit, setServingUnit] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  const { description } = props.entry;
  const caloriesPer100 =
    props.entry.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;
  const calorieCount = (props.portionSize / 100) * caloriesPer100;

  useEffect(() => {
    fetch(getUrl(props.entry.fdcId))
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
    const portionSize = e.target.value;
    const newCalorieCount = Math.ceil((portionSize / 100) * caloriesPer100);
    props.onInputChange(props.entry.fdcId, newCalorieCount, portionSize);
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
          value={props.portionSize}
          onChange={handleChange}
        />
        {servingUnit}
      </span>
      <span>{`${calorieCount} kcal`}</span>
    </div>
  );
};

export default CalorieLogPane;
