import React from 'react';

const Button = ({ handleClick, buttonLabel }) => {
  return <button onClick={handleClick}>{buttonLabel}</button>;
};

export default Button;
