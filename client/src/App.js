import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import MovieList from "./Movies/MovieList";
import SavedList from "./Movies/SavedList";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const getMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  };

  const removeMovie = id => {
    setMovies(movies.filter(movie => movie.id != id));
  };

  // const updateMovie = updatedMovie => {
  //   setMovies(movies.map(movie => (
  //     movie.id === updatedMovie.id ? updatedMovie: movie
  //   )));
  // };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route
        exact
        path="/"
        render={props => <MovieList {...props} movies={movies} />}
      />

      <Route
        path="/movies/:id"
        render={props => {
          const movie = movies.find(movie => movie.id == props.match.params.id);
          if (!movie) {
            return <div>Loading movie details...</div>;
          }
          return (
            <Movie
              {...props}
              movie={movie}
              addToSavedList={addToSavedList}
              removeMovie={removeMovie}
            />
          );
        }}
      />

      <Route
        path="/update-movie/:id/"
        render={props => (
          <MovieForm {...props} movies={movies} updateMovies={setMovies} />
        )}
      />
    </>
  );
};

export default App;
