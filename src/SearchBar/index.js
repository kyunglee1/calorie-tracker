/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

const SearchBar = ({ inputText, onInputChange, onSearchClick }) => (
  <div className="search-bar">
    <input
      className="search-input"
      type="text"
      value={inputText}
      onChange={onInputChange}
    />
    <button className="search-button" type="button" onClick={onSearchClick}>
      search
    </button>
  </div>
);

export default SearchBar;
