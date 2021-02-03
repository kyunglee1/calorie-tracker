/* eslint-disable no-useless-return */
import React, { useState } from 'react';
import SearchBar from '../SearchBar/index';
import ResultsTable from '../ResultsTable/index';
import CalorieLog from '../CalorieLog/index';
import './index.css';

const NutritionTracker = () => {
  const [food, setFood] = useState('');
  const [clickedSearch, setClickedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [fdcId, setFdcId] = useState('');
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

    fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${food}&api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy&pageSize=3&pageNumber=1`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data.foods));
  };

  const handleAddClick = (id) => {
    setClickedSearch(false);
    setFood('');
    setFdcId(id);
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
        <CalorieLog results={searchResults} fdcId={fdcId} />
      </div>
    </div>
  );
};

export default NutritionTracker;
