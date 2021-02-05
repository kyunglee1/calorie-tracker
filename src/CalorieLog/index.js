/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import CalorieLogPane from '../CalorieLogPane/index';
import useLocalStorage from '../hooks/useLocalStorage';
import './index.css';

const CalorieLog = ({ results, fdcId, clickedAdd }) => {
  const [panes, setPanes] = useLocalStorage();

  useEffect(() => {
    const isDuplicate = panes.find((pane) => pane.id === fdcId);

    if (isDuplicate || !fdcId) return;

    // Item that user selected
    const entryItem = results.find((result) => result.fdcId === fdcId);
    // Item's calories per 100 g/mL portion
    const caloriesPer100 =
      entryItem.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

    setPanes((prevPanes) => [
      ...prevPanes,
      {
        id: fdcId,
        entryItem,
        calorieCount: caloriesPer100, // Current calorie count
        portionSize: '100', // Current portion size (g/mL)
      },
    ]);
  }, [clickedAdd]);

  // Handler to remove entry by id
  const handleDeleteClick = (id) => {
    setPanes((prevPanes) => [...prevPanes].filter((pane) => pane.id !== id));
  };

  /* Handler to update an entry's calorieCount
     on portion-size change */
  const handleInputChange = (id, calorieCount, portionSize) => {
    setPanes((prevPanes) => {
      const newPanes = [...prevPanes];
      const index = newPanes.findIndex((pane) => pane.id === id);
      newPanes[index] = { ...newPanes[index], calorieCount, portionSize };
      return newPanes;
    });
  };

  const panesList = panes.map((pane) => (
    <CalorieLogPane
      key={pane.id}
      entry={pane.entryItem}
      portionSize={pane.portionSize}
      onInputChange={handleInputChange}
      onDeleteClick={handleDeleteClick}
    />
  ));

  const totalCalories = panes.reduce(
    (total, pane) => total + pane.calorieCount,
    0
  );

  return (
    <div className="log-container">
      <div id="log-header">Calorie Log</div>
      <div className="panes">{panesList}</div>
      {panes.length > 0 && (
        <div id="log-footer">
          <span>{`Total: ${totalCalories} kcal`}</span>
        </div>
      )}
    </div>
  );
};

export default CalorieLog;
