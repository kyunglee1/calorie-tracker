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
  // Save food-item entry to panes
  useEffect(() => {
    const isDuplicate = props.panes.find((pane) => pane.fdcId === props.fdcId);

    // Duplicates not allowed. Also, skip inital-render effect.
    if (isDuplicate || !props.fdcId) return;

    // Item that user has selected from search results
    const data = props.results.find((result) => result.fdcId === props.fdcId);
    // Item's calories per 100 g/mL portion
    const caloriesPer100 =
      data.foodNutrients.find((x) => x.nutrientId === 1008)?.value ?? 0;

    props.addPane({
      fdcId: props.fdcId,
      data,
      calorieCount: caloriesPer100, // Current calorie count
      portionSize: '100', // Current portion size (g/mL)
    });
  }, [props.clickedAdd]);

  // Indicate (blink) duplicate log-entry
  useEffect(() => {
    const duplicate = props.panes.find((pane) => pane.fdcId === props.fdcId);

    if (!duplicate) return;

    /* Add (type: 'duplicate') to pre-existing pane object, to
       be passed as a prop. */
    // send the fdcId.
    props.signalDuplicate(props.fdcId);

    // Remove type: 'duplicate' after at least 500ms delay
    setTimeout(() => props.endSignal(props.fdcId), 500);
  }, [props.clickedAdd]);

  const panesList = props.panes.map((pane) => (
    <CalorieLogPane
      key={pane.fdcId}
      id={pane.fdcId}
      // entry={pane.entryItem}
      // portionSize={pane.portionSize}
      // paneType={pane.type}
    />
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
  results: state.searchResults,
  panes: state.panes,
});

const mapDispatchToProps = (dispatch) => ({
  addPane: (pane) => dispatch(addPane(pane)),
  signalDuplicate: (id) => dispatch(signalDuplicate(id)),
  endSignal: (id) => dispatch(endSignal(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalorieLog);
