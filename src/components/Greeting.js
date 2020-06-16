import React from 'react';

const Greeting = ({ name, movies }) => {
  if (movies.length === 0) {
    return <h2>Hello, {name}. There's currently no movies in your backlog.</h2>;
  } else
    return <h2>Hello, {name}. Here is the family's current movie backlog:</h2>;
};

export default Greeting;
