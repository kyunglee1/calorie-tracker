import React, { useState } from 'react';
import SearchBar from '../SearchBar/index';
import Table from '../Table/index';
import './index.css';

const NutritionTracker = () => {
  const [food, setFood] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    setFood(input);
  };

  return (
    <div className="container">
      <div className="left-view">
        <SearchBar inputText={food} onInputChange={handleInputChange} />
        <Table type="results-table" />
      </div>
      <div className="right-view">
        <Table type="tracker-table" />
      </div>
    </div>
  );
};
export default NutritionTracker;
