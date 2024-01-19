import { useEffect, useState } from 'react';
import Styles from "./MainPage.module.css";
import { motion } from "framer-motion";
import MovieCardContainer from '../../Components/MovieCardContainer/MovieCardContainer';
// import MG from "../../Assets/Imgs/magnifying_glass.svg";

const MainPage = () => {
  const [ input, setInput ] = useState( "" );
  const [ movies, setMovies ] = useState( [] );

  useEffect( () => {

    const Controller = new AbortController();

    async function fetchMovies () {

      if ( !input.trim().length ) {
        setMovies( [] );
        return;
      };

      try {

        const reponse = await fetch( `https://yts.mx/api/v2/list_movies.json?query_term=${ input }`, {
          signal: Controller.signal
        } );

        const body = await reponse.json();

        if ( reponse.ok ) {
          setMovies( body.data.movies );
        }

        console.log( body );

      } catch ( e ) {
        if ( !Controller.signal.aborted ) {
          console.log( e );
        }
      }
    };

    fetchMovies();

    return () => Controller.abort();

  }, [ input ] );

  return (
    <>
      <div className={ Styles.overlay }></div>
      <div className={ Styles.container }>
        <div className={ Styles.hero }>
          <p className={ Styles.punchline }>Download YTS YIFY Movies: HD smallest size</p>
          <div className={ Styles.inputs }>
            <input type="text" value={ input } onChange={ ( e ) => setInput( e.target.value ) } placeholder='Search Movies' />
            <motion.button whileHover={ { width: "70px" } } type="button" />
          </div>
          <p className={ Styles.note }>Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.</p>
        </div>
        <div className={ Styles.movies }>
          <MovieCardContainer movies={ movies } />
        </div>
      </div>
    </>
  );
};

export default MainPage;