import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

const MovieCardContainer = ( { movies } ) => {
  return (
    <>
      { movies.length && (
        <MovieCard movie={ movies[ 0 ] } />
      ) }
    </>
  );
};

export default MovieCardContainer;