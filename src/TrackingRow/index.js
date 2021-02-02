/* eslint-disable react/prop-types */
import React from 'react';

const TrackingRow = ({ data }) => {
  const { description } = data;
  const { servingSize } = data;
  const { servingSizeUnit } = data;

  return (
    <tr>
      <td>{description}</td>
      <td>{`Serving size: ${servingSize}${servingSizeUnit}`}</td>
    </tr>
  );
};

export default TrackingRow;
