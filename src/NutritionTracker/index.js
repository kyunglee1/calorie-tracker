/* eslint-disable no-useless-return */
import React, { useState } from 'react';
import SearchBar from '../SearchBar/index';
import ResultsTable from '../ResultsTable/index';
import CalorieLog from '../CalorieLog/index';
import getUrl from '../helper/getUrl';
import './index.css';

const NutritionTracker = () => {
  const [food, setFood] = useState('');
  const [clickedSearch, setClickedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [fdcId, setFdcId] = useState('');
  const [toggle, setToggle] = useState(false);
  // useReducer

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFood(input);
    setClickedSearch(false);
  };

  const handleSearchClick = () => {
    const input = food.trim();
    if (!input) {
      return;
    }

    setClickedSearch(true);

    fetch(getUrl(food))
      .then((res) => res.json())
      .then((data) => setSearchResults(data.foods));
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
