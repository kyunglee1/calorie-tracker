/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CalorieLogPane from '../CalorieLogPane/index';
import './index.css';

const CalorieLog = ({ fdcId }) => {
  const [panes, setPanes] = useState([]);
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
        const calories = data.foodNutrients.find((x) => x.nutrient.id === 1008)
          ?.amount;
        setTotalCalories((prev) => prev + calories);
        setPanes((prev) => [
          ...prev,
          <CalorieLogPane key={fdcId} data={data} />,
        ]);
      });
  }, [fdcId]);

  return (
    <div className="log-container">
      <div id="log-header">Calorie Log</div>
      <div className="panes">{panes}</div>
      {panes.length > 0 && (
        <div id="log-footer">
          <span>{`Total: ${totalCalories} kcal`}</span>
        </div>
      )}
    </div>
  );

  // return (
  //   <table className="tracker-table">
  //     <thead>
  //       <tr>
  //         <td colSpan="3">Calorie Log</td>
  //       </tr>
  //     </thead>
  //     <tbody>{panes}</tbody>
  //     {panes.length > 0 && (
  //       <tfoot>
  //         <tr>
  //           <td colSpan="2">Total</td>
  //           <td>{`${totalCalories} kcal`}</td>
  //         </tr>
  //       </tfoot>
  //     )}
  //   </table>
  // );
};

export default CalorieLog;
