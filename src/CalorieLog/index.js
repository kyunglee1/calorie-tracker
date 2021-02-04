/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CalorieLogPane from '../CalorieLogPane/index';
import './index.css';

const CalorieLog = ({ results, fdcId }) => {
  const [panes, setPanes] = useState([]);

  const handleDeleteClick = (id) => {
    setPanes((prev) => [...prev].filter((pane) => pane.id !== id));
  };

  const handleInputChange = (id, calorieCount) => {
    setPanes((prev) => {
      const newPanes = [...prev];
      const index = newPanes.findIndex((pane) => pane.id === id);
      newPanes[index] = { ...newPanes[index], calories: calorieCount };
      return newPanes;
    });
  };

  useEffect(() => {
    if (!fdcId) return;

    const item = results.find((entry) => entry.fdcId === fdcId);
    const calorieCount =
      item.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

    setPanes((prev) => [
      ...prev,
      {
        id: fdcId,
        calories: calorieCount,
        pane: (
          <CalorieLogPane
            key={fdcId}
            entry={item}
            calories={calorieCount}
            onInputChange={handleInputChange}
            onDeleteClick={handleDeleteClick}
          />
        ),
      },
    ]);
  }, [fdcId]);

  const totalCalories = panes.reduce((total, pane) => total + pane.calories, 0);

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
