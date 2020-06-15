import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';
import movieService from './services/movies';
import loginService from './services/login';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    score: 0,
    userId: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    movieService.getAll().then((movies) => {
      setMovies(movies);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      movieService.setToken(user.token);
    }
  }, []);

  const addMovie = (e) => {
    e.preventDefault();
    const movie = {
      title: newMovie.title,
      genre: newMovie.genre,
      score: newMovie.score,
      userId: user.id,
    };

    movieService.create(movie).then((returnedMovie) => {
      setMovies(movies.concat(returnedMovie));
      alert(`${movie.title} has been added to backlog.`);
      setNewMovie({
        title: '',
        genre: '',
        score: 0,
        userId: '',
      });
    });
  };

  const handleNewMovies = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      movieService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (exception) {
      alert('Wrong username or password.');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Hello, {user.name}. Here is the family's current movie backlog:</h2>
      <form onSubmit={addMovie}>
        <div>
          Title:
          <input
            value={newMovie.title}
            name="title"
            onChange={handleNewMovies}
          />
        </div>
        <div>
          Genre:
          <input
            value={newMovie.genre}
            name="genre"
            onChange={handleNewMovies}
          />
        </div>
        <div>
          IMdB Rating:
          <input
            value={newMovie.score}
            name="score"
            onChange={handleNewMovies}
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
