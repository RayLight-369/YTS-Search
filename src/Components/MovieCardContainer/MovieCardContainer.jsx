import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Styles from "./MovieCardContainer.module.css";

const MovieCardContainer = ( { movies } ) => {
  return (
    <div className={ Styles[ 'movies-container' ] }>
      { movies.length && movies.map( ( movie, index ) => (
        <MovieCard movie={ movie } key={ index } />
      ) ) }
    </div>
  );
};

export default MovieCardContainer;