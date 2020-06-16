import React from 'react';
const Movie = ({ movie, handleRemove }) => (
  <div>
    {movie.title} - {movie.genre}
    <button onClick={() => handleRemove(movie.id)}>remove</button>
  </div>
);

export default Movie;
