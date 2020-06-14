import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';
import movieService from './services/movies';
import loginService from './services/login';

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
      console.log('Wrong credentials');
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
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
