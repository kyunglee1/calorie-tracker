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
    />
    <button className="search-button" type="button">
      search
    </button>
  </div>
);

export default SearchBar;
