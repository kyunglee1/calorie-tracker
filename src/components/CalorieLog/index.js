/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import addPane from '../../actions/addPane';
import signalDuplicate from '../../actions/signalDuplicate';
import endSignal from '../../actions/endSignal';
import CalorieLogPane from '../CalorieLogPane/index';
import './index.css';

const CalorieLog = (props) => {
  // Food-item entry's unique id
  const { fdcId } = props;

  // Save food-item entry
  useEffect(() => {
    const isDuplicate = props.panes.find((pane) => pane.fdcId === fdcId);

    // Duplicates not allowed. Also, skip inital-render effect.
    if (isDuplicate || !fdcId) return;

    // Result that user had selected
    const data = props.results.find((result) => result.fdcId === fdcId);
    // Item's calories per 100 g, or mL, portion
    const caloriesPer100 =
      data.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

    // Dispatch action to add pane to Redux store
    props.addPane({
      fdcId,
      data,
      calorieCount: caloriesPer100, // Current calorie count
      portionSize: '100', // Current portion size (g/mL)
    });
  }, [props.clickedAdd]);

  // Indicate (blink) duplicate log-entry
  useEffect(() => {
    const duplicate = props.panes.find((pane) => pane.fdcId === fdcId);

    if (!duplicate) return;

    // Dispatch action to store signaling duplicate entry
    props.signalDuplicate(fdcId);

    // Dispatch action to store signaling end of visual effect (blink)
    setTimeout(() => props.endSignal(fdcId), 500);
  }, [props.clickedAdd]);

  const panesList = props.panes.map((pane) => (
    <CalorieLogPane key={pane.fdcId} id={pane.fdcId} />
  ));

  const totalCalories = props.panes.reduce(
    (total, pane) => total + pane.calorieCount,
    0
  );

  return (
    <div className="log-container">
      <div id="log-header">CALORIE LOG</div>
      <div className="panes">{panesList}</div>
      {props.panes.length > 0 && (
        <div id="log-footer">
          <span>{`Total: ${totalCalories} kcal`}</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.results.searchResults,
  panes: state.calorieLog.panes,
});

const mapDispatchToProps = (dispatch) => ({
  addPane: (pane) => dispatch(addPane(pane)),
  signalDuplicate: (id) => dispatch(signalDuplicate(id)),
  endSignal: (id) => dispatch(endSignal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieLog);
