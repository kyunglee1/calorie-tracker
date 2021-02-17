/* eslint-disable arrow-body-style */
import React from 'react';
import Provider from 'react-redux';
import store from '../../store';
import CalorieTracker from '../CalorieTracker/index';
import './index.css';

const App = () => (
  <Provider store={store}>
    <CalorieTracker />
  </Provider>
);

export default App;
