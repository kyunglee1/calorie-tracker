/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CalorieLogPane from '../CalorieLogPane/index';
import useLocalStorage from '../../hooks/useLocalStorage';
import './index.css';

const CalorieLog = ({ results, fdcId, clickedAdd }) => {
  const [panes, setPanes] = useLocalStorage();

  // Save food-item entry to panes
  useEffect(() => {
    const isDuplicate = panes.find((pane) => pane.fdcId === fdcId);

    // Duplicates not allowed. Also, skip inital-render effect.
    if (isDuplicate || !fdcId) return;

    // Item that user has selected from search results
    const entryItem = results.find((result) => result.fdcId === fdcId);
    // Item's calories per 100 g/mL portion
    const caloriesPer100 =
      entryItem.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

    setPanes((prevPanes) => [
      ...prevPanes,
      {
        fdcId,
        entryItem,
        calorieCount: caloriesPer100, // Current calorie count
        portionSize: '100', // Current portion size (g/mL)
      },
    ]);
  }, [clickedAdd]);

  // Indicate (blink) duplicate log-entry
  useEffect(() => {
    const duplicate = panes.find((pane) => pane.fdcId === fdcId);

    if (!duplicate) return;

    /* Add (type: 'duplicate') to pre-existing pane object, to
       be passed as a prop. */
    setPanes((prevPanes) => {
      const newPanes = [...prevPanes];
      const index = newPanes.indexOf(duplicate);
      newPanes[index] = { ...newPanes[index], type: 'duplicate' };
      return newPanes;
    });

    // Remove type: 'duplicate' after at least 500ms delay
    setTimeout(() => {
      setPanes((prevPanes) => {
        const newPanes = [...prevPanes];
        const index = newPanes.findIndex((pane) => pane.fdcId === fdcId);
        newPanes[index] = { ...newPanes[index], type: '' };
        return newPanes;
      });
    }, 500);
  }, [clickedAdd]);

  // Handler to remove entry by fdcId (id)
  const handleDeleteClick = (id) => {
    setPanes((prevPanes) => [...prevPanes].filter((pane) => pane.fdcId !== id));
  };

  /* Handler to update an entry's calorieCount
     on portion-size change. */
  const handleInputChange = (id, calorieCount, portionSize) => {
    setPanes((prevPanes) => {
      const newPanes = [...prevPanes];
      const index = newPanes.findIndex((pane) => pane.fdcId === id);
      newPanes[index] = { ...newPanes[index], calorieCount, portionSize };
      return newPanes;
    });
  };

  const panesList = panes.map((pane) => (
    <CalorieLogPane
      key={pane.fdcId}
      entry={pane.entryItem}
      portionSize={pane.portionSize}
      onInputChange={handleInputChange}
      onDeleteClick={handleDeleteClick}
      paneType={pane.type}
    />
  ));

  const totalCalories = panes.reduce(
    (total, pane) => total + pane.calorieCount,
    0
  );

  return (
    <div className="log-container">
      <div id="log-header">CALORIE LOG</div>
      <div className="panes">{panesList}</div>
      {panes.length > 0 && (
        <div id="log-footer">
          <span>{`Total: ${totalCalories} kcal`}</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.searchResults,
});

export default connect(mapStateToProps)(CalorieLog);
