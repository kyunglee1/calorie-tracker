/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './index.css';

const CalorieLogPane = ({ entry, onDeleteClick }) => {
  const [servingSize, setServingSize] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const { description } = entry;
  const calories =
    entry.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 'N/A';

  useEffect(() => {
    fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${entry.fdcId}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`
    )
      .then((res) => res.json())
      .then((data) => {
        setServingSize(
          data.servingSize
            ? `${data.servingSize}${data.servingSizeUnit}`
            : '100g'
        );
        setFoodCategory(
          data.brandedFoodCategory ?? data.foodCategory?.description
        );
      });
  });

  const handleClick = () => {
    onDeleteClick(entry.fdcId, calories);
  };

  return (
    <div className="log-pane">
      <button className="remove-button" type="button" onClick={handleClick}>
        X
      </button>
      <span className="log-description">
        {description.toUpperCase().trim()}
        <br />
        <i>{foodCategory}</i>
      </span>
      <span>{`Serving Size: ${servingSize}`}</span>
      <span>{`${calories} kcal`}</span>
    </div>
  );
};

export default CalorieLogPane;
