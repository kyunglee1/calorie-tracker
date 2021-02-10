/* eslint-disable no-useless-return */
import React, { useCallback, useState } from 'react';
import SearchBar from '../SearchBar/index';
import ResultsTable from '../ResultsTable/index';
import CalorieLog from '../CalorieLog/index';
import getUrl from '../helper/getUrl';
import debounce from '../helper/debounce';
import './index.css';

const NutritionTracker = () => {
  // Search-input value
  const [food, setFood] = useState('');

  // Boolean to display search results
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  /* USDA fdcId for the user-selected result. Will be
     used to fetch data. */
  const [fdcId, setFdcId] = useState('');

  /* Toggled whenever user selects a result to be entered
     into calorie log. */
  const [toggle, setToggle] = useState(false);

  // Fetch data given input food item
  const fetchData = (input) => {
    const foodItem = input.trim();
    if (!foodItem) return;

    fetch(getUrl(foodItem))
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.foods);
        setShowResults(true);
      });
  };

  // Memoize and debounce fetchData function
  const debouncedFetch = useCallback(
    debounce((input) => fetchData(input), 1500),
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
        {showResults && (
          <ResultsTable results={searchResults} onAddClick={handleAddClick} />
        )}
      </div>
      <div className="right-view">
        <CalorieLog results={searchResults} fdcId={fdcId} clickedAdd={toggle} />
      </div>
    </div>
  );
};

export default NutritionTracker;
