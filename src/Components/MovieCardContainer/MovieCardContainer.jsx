import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Styles from "./MovieCardContainer.module.css";
import { animate, motion } from "framer-motion";

const MovieCardContainer = ( { movies } ) => {

  const variants = {
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div
      className={ Styles[ 'movies-container' ] }
      variants={ variants }
      initial="initial"
      animate="animate"
      transition={ {
        staggerChildren: .5,
        type: "spring",
        damping: 7
      } }
    >
      { movies?.length ? (
        movies.map( ( movie, index ) => (
          <MovieCard movie={ movie } key={ index + movie.title } variants={ variants } />
        ) )
      ) : (
        <p>No Movies :(</p>
      ) }
    </motion.div>
  );
};

export default MovieCardContainer;