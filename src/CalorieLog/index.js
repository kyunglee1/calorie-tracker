/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CalorieLogPane from '../CalorieLogPane/index';
import './index.css';

const CalorieLog = ({ fdcId }) => {
  const [panes, setPanes] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleDeleteClick = (id, calories) => {
    setPanes((prevPanes) => [...prevPanes].filter((pane) => pane.id !== id));
    setTotalCalories((prev) => prev - calories);
  };

  useEffect(() => {
    if (!fdcId) {
      return;
    }

    fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`
    )
      .then((res) => res.json())
      .then((data) => {
        const calories = data.foodNutrients.find((x) => x.nutrient.id === 1008)
          ?.amount;
        setTotalCalories((prev) => prev + calories);
        setPanes((prev) => [
          ...prev,
          {
            id: fdcId,
            pane: (
              <CalorieLogPane
                key={fdcId}
                id={fdcId}
                data={data}
                onDeleteClick={handleDeleteClick}
              />
            ),
          },
        ]);
      });
  }, [fdcId]);

  return (
    <div className="log-container">
      <div id="log-header">Calorie Log</div>
      <div className="panes">{panes.map((x) => x.pane)}</div>
      {panes.length > 0 && (
        <div id="log-footer">
          <span>{`Total: ${totalCalories} kcal`}</span>
        </div>
      )}
    </div>
  );
};

export default CalorieLog;
