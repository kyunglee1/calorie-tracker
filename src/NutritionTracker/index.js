import React from 'react';
import SearchBar from '../SearchBar/index';
import Table from '../Table/index';
import './index.css';

const NutritionTracker = () => (
  <div className="container">
    <div className="left-view">
      <SearchBar />
      <Table type="results-table" />
    </div>
    <div className="right-view">
      <Table type="tracker-table" />
    </div>
  </div>
);

export default NutritionTracker;
