import React, { useState } from 'react';
import { CIcon } from '@coreui/icons-react';
import { cilStar } from '@coreui/icons';

const StarRating = ({ currentRating, onSubmitRating }) => {
  const [rating, setRating] = useState(currentRating); // Current visual rating
  const [hover, setHover] = useState(null); // Hover state for stars

  const handleClick = (value) => {
    setRating(value);
    onSubmitRating(value); // Trigger the submit function to update rating in backend
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <CIcon
          key={value}
          icon={cilStar}
          className={value <= (hover || rating) ? 'text-warning' : 'text-muted'}
          onClick={() => handleClick(value)}
          onMouseEnter={() => setHover(value)}
          onMouseLeave={() => setHover(null)}
          style={{ cursor: 'pointer', fontSize: '24px' }}
        />
      ))}
    </div>
  );
};

export default StarRating;
