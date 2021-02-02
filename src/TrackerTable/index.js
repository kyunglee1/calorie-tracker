/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import TrackingRow from '../TrackingRow/index';
import './index.css';

const TrackerTable = ({ fdcId }) => {
  const [calorieLog, setCalorieLog] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

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
        const calories = data.foodNutrients.find((x) => x.nutrient.id === 1008)
          .amount;
        setTotalCalories((prev) => prev + calories);
        setCalorieLog((prev) => [
          ...prev,
          <TrackingRow key={fdcId} data={data} />,
        ]);
      });
  }, [fdcId]);

  return (
    <table className="tracker-table">
      <thead>
        <tr>
          <td colSpan="2">Calorie Log</td>
        </tr>
      </thead>
      <tbody>{calorieLog}</tbody>
      {calorieLog.length > 0 && (
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{`${totalCalories} kcal`}</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default TrackerTable;
