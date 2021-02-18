/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import updatePane from '../../actions/updatePane';
import removePane from '../../actions/removePane';
import getUrl from '../../helper/getUrl';
import './index.css';

const CalorieLogPane = (props) => {
  // Food item's serving size unit - (g) or (mL)
  const [servingUnit, setServingUnit] = useState('');
  const [foodCategory, setFoodCategory] = useState('');

  // Find food-item among stored items
  const item = props.panes.find((pane) => pane.fdcId === props.id);

  // Food item's description/name
  const { description } = item.data;

  // Food item's calories per 100 g or mL
  const caloriesPer100 =
    item.data.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

  // Food item's calories respective to its current portion size
  const calorieCount = (item.portionSize / 100) * caloriesPer100;

  // Fetch and save serving size unit & food category
  useEffect(() => {
    fetch(getUrl(item.data.fdcId))
      .then((res) => res.json())
      .then((data) => {
        // Default unit = grams
        setServingUnit(data.servingSizeUnit ?? 'g');
        // Check the two properties below for food category
        setFoodCategory(
          data.brandedFoodCategory ?? data.foodCategory?.description
        );
      });
  }, [item.data.fdcId]);

  const handleClick = () => {
    // Dispatch action to store to remove pane
    props.removePane(item.data.fdcId);
  };

  /* Handler for 'serving-size' input change. Updates
     the portion size & total calories for this entry. */
  const handleChange = (e) => {
    const portionSize = e.target.value;
    const newCalorieCount = Math.ceil((portionSize / 100) * caloriesPer100);

    // Dispatch action to store to update pane
    props.updatePane(item.data.fdcId, newCalorieCount, portionSize);
  };

  return (
    <div className={`log-pane ${item.type}`}>
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
          value={item.portionSize}
          onChange={handleChange}
        />
        {servingUnit}
      </span>
      <span className="calorie-count">{`${calorieCount} kcal`}</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  panes: state.calorieLog.panes,
});

const mapDispatchToProps = (dispatch) => ({
  updatePane: (...args) => dispatch(updatePane(...args)),
  removePane: (id) => dispatch(removePane(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieLogPane);
