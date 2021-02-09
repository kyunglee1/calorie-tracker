/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';

const SearchBar = ({ inputText, onInputChange, onSearchClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchClick();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={inputText}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" type="button" onClick={onSearchClick}>
        search
      </button>
    </div>
  );
};

export default SearchBar;
