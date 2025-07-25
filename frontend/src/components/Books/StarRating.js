import React from 'react';
const StarRating = ({ rating = 0, outOf = 5 }) => {
  const stars = [];
  for (let i = 1; i <= outOf; i++) {
    stars.push(
      <span key={i} style={{ color: '#FFD700', fontSize: '1.2em' }}>
        {i <= Math.round(rating) ? '\u2605' : '\u2606'}
      </span>
    );
  }
  return <span>{stars}</span>;
};
export default StarRating; 