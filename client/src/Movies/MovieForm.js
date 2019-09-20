import axios from "axios";
import React, { useEffect, useState } from "react";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: ""
};

const MovieForm = props => {
  console.log(props);
  const [movie, setMovie] = useState(initialMovie);

  const { match, movies } = props;

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "rating") value = Number(value);

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    const id = match.params.id;
    const movieToUpdate = movies.find(movie => movie.id == id);

    if (movieToUpdate) {
      console.log("Is it this?", movieToUpdate);
      setMovie(movieToUpdate);
    }
  }, [match, movies]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push(`/movies/${movie.id}`);
        props.setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <form className="updateForm" onSubmit={handleSubmit}>
        <input
          className="inputBox"
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Movie name..."
        />
        <input
          className="inputBox"
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Movie director..."
        />
        <input
          className="inputBox"
          type="number"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
          placeholder="Movie metascore..."
        />
        <button className="updateMovieButton" type="submit">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
