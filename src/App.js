import React, { useState, useEffect } from 'react';
import movieService from './services/movies';
import loginService from './services/login';
import Movie from './components/Movie';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import MovieForm from './components/MovieForm';
import Greeting from './components/Greeting';
import Button from './components/Button';

const App = () => {
  const [movies, setMovies] = useState([]);
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

  const addMovie = (movie) => {
    movieService.create(movie).then((returnedMovie) => {
      setMovies((movies) => [...movies, returnedMovie]);
    });
  };

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

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
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
      />
    );
  }

  return (
    <div>
      <div>
        <Greeting name={user.name} />
      </div>
      <div>
        <Togglable buttonLabel="New Movie">
          <MovieForm createMovie={addMovie} user={user.id} />
        </Togglable>
      </div>
      <ul>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
      <div>
        <Button handleClick={handleLogout} buttonLabel="Logout" />
      </div>
    </div>
  );
};

export default App;
