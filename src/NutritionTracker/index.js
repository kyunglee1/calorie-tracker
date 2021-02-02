/* eslint-disable no-useless-return */
import React, { useState } from 'react';
import SearchBar from '../SearchBar/index';
import ResultsTable from '../ResultsTable/index';
import CalorieLog from '../CalorieLog/index';
import './index.css';

const NutritionTracker = () => {
  const [food, setFood] = useState('');
  const [clickedSearch, setClickedSearch] = useState(false);
  const [fdcId, setFdcId] = useState('');
  // useReducer

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFood(input);
    setClickedSearch(false);
  };

  const handleSearchClick = () => {
    const input = food.trim();
    if (input) {
      setClickedSearch(true);
    }
  };

  const handleAddClick = (id) => {
    setFdcId(id);
    setClickedSearch(false);
    setFood('');
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
          <ResultsTable item={food} onAddClick={handleAddClick} />
        )}
      </div>
      <div className="right-view">
        <CalorieLog fdcId={fdcId} />
      </div>
    </div>
  );
};

export default NutritionTracker;
