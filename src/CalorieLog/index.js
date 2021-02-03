/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CalorieLogPane from '../CalorieLogPane/index';
import './index.css';

const CalorieLog = ({ results, fdcId }) => {
  const [panes, setPanes] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleDeleteClick = (id, calories) => {
    setPanes((prevPanes) => [...prevPanes].filter((pane) => pane.id !== id));
    setTotalCalories((prev) => prev - calories);
  };

  // perhaps 2 separate useEffects
  useEffect(() => {
    if (!fdcId) return;

    const duplicate = panes.find((pane) => pane.id === fdcId);
    if (duplicate) return;

    const item = results.find((entry) => entry.fdcId === fdcId);
    const calories = item.foodNutrients.find((x) => x.nutrientId === 1008)
      ?.value;

    setTotalCalories((prev) => prev + calories);
    setPanes((prev) => [
      ...prev,
      {
        id: fdcId,
        pane: (
          <CalorieLogPane
            key={fdcId}
            data={item}
            onDeleteClick={handleDeleteClick}
          />
        ),
      },
    ]);
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
