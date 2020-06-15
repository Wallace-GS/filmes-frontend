import React, { useState } from 'react';

const MovieForm = ({ createMovie, user }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    score: 0,
    userId: '',
  });

  const addMovie = (e) => {
    e.preventDefault();
    createMovie({
      title: newMovie.title,
      genre: newMovie.genre,
      score: newMovie.score,
      userId: user,
    });

    setNewMovie({
      title: '',
      genre: '',
      score: 0,
      userId: '',
    });
  };

  const handleNewMovies = ({ target }) => {
    setNewMovie({ ...newMovie, [target.name]: target.value });
  };

  return (
    <form onSubmit={addMovie}>
      <div>
        Title:
        <input value={newMovie.title} name="title" onChange={handleNewMovies} />
      </div>
      <div>
        Genre:
        <input value={newMovie.genre} name="genre" onChange={handleNewMovies} />
      </div>
      <div>
        IMdB Rating:
        <input value={newMovie.score} name="score" onChange={handleNewMovies} />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
