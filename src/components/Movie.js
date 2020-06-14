import React from 'react';
const Movie = ({ movie }) => (
  <div>
    {movie.title} - {movie.genre}
  </div>
);

export default Movie;
