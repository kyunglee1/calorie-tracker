/* eslint-disable react/prop-types */
/* eslint-disable no-useless-return */
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar/index';
import ResultsTable from '../ResultsTable/index';
import CalorieLog from '../CalorieLog/index';
import debounce from '../../helper/debounce';
import fetchData from '../../actions/fetchData';
import './index.css';

const CalorieTracker = (props) => {
  // Search-input value
  const [food, setFood] = useState('');

  // Boolean to display search results
  const [showResults, setShowResults] = useState(false);

  /* USDA fdcId for the user-selected result. Will be
     used to fetch data. */
  const [fdcId, setFdcId] = useState('');

  /* Toggled whenever user selects a result to be entered
     into calorie log. */
  const [toggle, setToggle] = useState(false);

  // Memoize and debounce fetchData action creator
  const debouncedFetch = useCallback(
    debounce((input) => {
      const foodItem = input.trim();
      if (!foodItem) return;

      props.fetchData(input);
      setShowResults(true);
    }, 1000),
    []
  );

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFood(input);

    // Hide results when input changes
    setShowResults(false);

    // Enqueue data-fetch for new input
    debouncedFetch(input);
  };

  /* Handler for when user selects a result.
     fdcId (id) of the result is passed in. */
  const handleAddClick = (id) => {
    setShowResults(false);
    // Clear the search-input value
    setFood('');
    setFdcId(id);
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="container">
      <div className="header">CALORIE * TRACKER</div>
      <div className="left-view">
        <SearchBar inputText={food} onInputChange={handleInputChange} />
        {showResults && <ResultsTable onAddClick={handleAddClick} />}
      </div>
      <div className="right-view">
        <CalorieLog fdcId={fdcId} clickedAdd={toggle} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: (input) => dispatch(fetchData(input)),
});

export default connect(null, mapDispatchToProps)(CalorieTracker);
