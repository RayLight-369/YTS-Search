import { lazy, memo, useMemo } from "react";
// import MovieCard from "../MovieCard/MovieCard";
import Styles from "./MovieCardContainer.module.css";
import { animate, motion } from "framer-motion";

const MovieCard = lazy(() => import("../MovieCard/MovieCard"));

const MovieCardContainer = ({ movies }) => {
  const variants = useMemo(
    () => ({
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
    }),
    []
  );

  const transition = useMemo(
    () => ({
      staggerChildren: 0.5,
      type: "spring",
      damping: 7,
    }),
    []
  );

  return (
    <motion.div
      className={Styles["movies-container"]}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={transition}
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

export default memo(MovieCardContainer);
