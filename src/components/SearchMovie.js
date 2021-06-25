import React, { useState } from 'react';
import MovieCard from '../components/Card';

export default function SearchMovie() {
  //states - input query, movies
  const [query, setQuery] = useState('');

  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const searchMovie = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=8f882c9bcf06cf300c9055ec482c60e2&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className='form' onSubmit={searchMovie}>
        <label htmlFor='query' className='label'>
          Movie Name
        </label>
        <input
          className='input'
          type='text'
          name='query'
          placeholder='i.e. Tenet'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit' value='Submit' className='button'>
          Search
        </button>
      </form>
      <div className='card-list'>
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
