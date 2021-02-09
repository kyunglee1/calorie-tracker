/* eslint-disable no-useless-return */
import React, { useCallback, useState } from 'react';
import SearchBar from '../SearchBar/index';
import ResultsTable from '../ResultsTable/index';
import CalorieLog from '../CalorieLog/index';
import getUrl from '../helper/getUrl';
import debounce from '../helper/debounce';
import './index.css';

const NutritionTracker = () => {
  const [food, setFood] = useState('');
  const [clickedSearch, setClickedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [fdcId, setFdcId] = useState('');
  const [toggle, setToggle] = useState(false);
  // useReducer

  const handleSearchClick = () => {
    const input = food.trim();
    if (!input) return;

    setClickedSearch(true);

    fetch(getUrl(food))
      .then((res) => res.json())
      .then((data) => setSearchResults(data.foods));
  };

  const fetchData = (input) => {
    const foodItem = input.trim();
    if (!foodItem) return;

    fetch(getUrl(foodItem))
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.foods);
        setClickedSearch(true);
      });
  };

  const debouncedFetch = useCallback(
    debounce((input) => fetchData(input), 1500),
    []
  );

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFood(input);
    setClickedSearch(false);

    // Debounce
    debouncedFetch(input);
  };

  const handleAddClick = (id) => {
    setClickedSearch(false);
    setFood('');
    setFdcId(id);
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <div className="container">
      <div className="left-view">
        <SearchBar
          inputText={food}
          onInputChange={handleInputChange}
          onSearchClick={handleSearchClick}
        />
        {clickedSearch && (
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
