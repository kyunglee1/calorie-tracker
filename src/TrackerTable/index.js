/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import TrackingRow from '../TrackingRow/index';
import './index.css';

const TrackerTable = ({ fdcId }) => {
  const [trackedFoods, setTrackedFoods] = useState([]);

  useEffect(() => {
    if (!fdcId) {
      return;
    }

    fetch(
      `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=NRCvlMq3AYBkfsUzfjDzpqUD36qK5abJfLpaJfJy`
    )
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line no-console
        console.log(data);
        setTrackedFoods((prev) => [
          ...prev,
          <TrackingRow key={fdcId} data={data} />,
        ]);
      });
  }, [fdcId]);

  return (
    <table className="tracker-table">
      <thead>
        <tr>
          <td colSpan="2">Calorie Tracker</td>
        </tr>
      </thead>
      <tbody>{trackedFoods}</tbody>
    </table>
  );
};

export default TrackerTable;
