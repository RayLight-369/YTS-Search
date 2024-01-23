import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import Styles from "./MovieCardContainer.module.css";
import { animate, motion } from "framer-motion";

const MovieCardContainer = ({ movies }) => {
  const variants = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    hover: {
      scale: 1.08,
    },
  };

  return (
    <motion.div
      className={Styles["movies-container"]}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{
        staggerChildren: 0.5,
        type: "spring",
        damping: 7,
      }}
    >
      {movies?.length ? (
        movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} variants={variants} />
        ))
      ) : (
        <p>No Movies :(</p>
      )}
    </motion.div>
  );
};

export default MovieCardContainer;
