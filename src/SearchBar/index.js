/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

const SearchBar = ({ inputText, onInputChange }) => (
  <div className="search-bar">
    <input
      className="search-input"
      type="text"
      value={inputText}
      onChange={onInputChange}
      placeholder="Search for food.."
    />
  </div>
);

export default SearchBar;
