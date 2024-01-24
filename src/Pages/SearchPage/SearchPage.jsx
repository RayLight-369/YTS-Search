import { useEffect, useState, memo } from "react";
import Styles from "./SearchPage.module.css";
import { AnimatePresence, motion } from "framer-motion";
import MovieCardContainer from "../../Components/MovieCardContainer/MovieCardContainer";
// import MG from "../../Assets/Imgs/magnifying_glass.svg";

const Inputs = memo( ( { input, setInput, handleSearch = () => { } } ) => {
  return (
    <div className={ Styles.inputs } onKeyDown={ handleSearch }>
      <input
        type="text"
        value={ input }
        onChange={ ( e ) => setInput( e.target.value ) }
        placeholder="Search Movies"
      />
      <motion.button
        whileHover={ { width: "70px" } }
        whileTap={ { scale: 0.8 } }
        type="button"
        onClick={ () => handleSearch( { key: "Enter" } ) }
      />
    </div>
  );
} );

const SearchPage = () => {
  const [ input, setInput ] = useState( "" );
  const [ movies, setMovies ] = useState( [] );
  const [ pending, setPending ] = useState( false );
  const [ fetchMore, setFetchMore ] = useState( false );

  async function fetchMovies ( { Controller } ) {
    if ( !input.trim().length ) {
      setMovies( [] );
      return;
    }

    try {
      const reponse = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${ input }`,
        {
          signal: Controller?.signal,
        }
      );

      const body = await reponse.json();

      if ( reponse.ok ) {
        if ( body.data?.movie_count > 0 ) {
          setMovies( body.data.movies );
          setPending( body.data?.movie_count - 20 > 0 ? true : false );
        } else {
          setMovies( [] );
        }
      }

      console.log( body );
    } catch ( e ) {
      if ( !Controller?.signal.aborted ) {
        console.log( e );
      }
    }
  }

  async function fetchPage ( { page, Controller } ) {
    if ( !input.trim().length ) {
      setMovies( [] );
      return;
    }

    try {
      const reponse = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${ input }${ page ? `&page=${ page }` : ""
        }`,
        {
          signal: Controller?.signal,
        }
      );

      const body = await reponse.json();

      if ( reponse.ok ) {
        if ( body.data?.movie_count - movies.length > 0 ) {
          setMovies( ( prev ) => [ ...prev, ...body.data.movies ] );
          setPending( true );
        } else {
          setPending( false );
        }
      }

      console.log( body );
    } catch ( e ) {
      if ( !Controller?.signal.aborted ) {
        console.log( e );
      }
    } finally {
      setFetchMore( false );
    }
  }

  useEffect( () => {
    const Controller = new AbortController();

    fetchMovies( { Controller } );

    return () => Controller.abort();
  }, [ input ] );

  useEffect( () => {
    const Controller = new AbortController();

    if ( fetchMore && movies.length ) {
      fetchPage( { Controller, page: movies.length / 20 + 1 } );
    }

    return () => Controller.abort();
  }, [ fetchMore ] );

  return (
    // <AnimatePresence mode='popLayout'>
    <>
      <div className={ Styles.overlay }></div>
      <div className={ Styles.container }>
        <div className={ Styles.hero }>
          <p className={ Styles.punchline }>Download Movies: HD smallest size</p>
          <Inputs
            input={ input }
            setInput={ setInput }
            handleSearch={ ( e ) =>
              e.key == "Enter" && fetchMovies( { Controller: null } )
            }
          />
          <p className={ Styles.note }>
            Here you can browse and download movies in excellent 720p, 1080p,
            2160p 4K and 3D quality, all at the smallest file size.
          </p>
          {/* YTS Movies Torrents. */ }
        </div>
        <div className={ Styles.movies }>
          <MovieCardContainer movies={ movies } />
          { pending && input.trim().length && (
            <motion.button
              whileHover={ { filter: "saturate(.7)", scale: 0.9 } }
              transition={ { type: "spring" } }
              type="button"
              className={ Styles.load_more }
              onClick={ () => {
                setFetchMore( true );
              } }
            >
              Load More
            </motion.button>
          ) }
        </div>
      </div>
    </>
    // </AnimatePresence>
  );
};

export default memo( SearchPage );
