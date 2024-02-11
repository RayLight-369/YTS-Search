import { useDeferredValue, useEffect, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';
import useAnime from '../../Hooks/useAnime';
import AnimeCardContainer from '../../Components/AnimeCardContainer/AnimeCardContainer';



const AnimePage = () => {

  const [ input, setInput ] = useState( "" );
  const [ searchResults, setSearchResults ] = useState( null );


  const fetchAnime = async ( { controller, query = input } ) => {
    try {
      const response = await fetch( "http://localhost:5260/search", {
        method: "POST",
        body: JSON.stringify( {
          query
        } ),
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        console.log( { query, body } );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const handleSearch = ( e, searchBy ) => {
    if ( e.key == "Enter" && input.trim().length ) {
      fetchAnime( { controller: null } );
    }
  };



  useEffect( () => {
    const controller = new AbortController();

    fetchAnime( { controller } );

    return () => controller.abort();

  }, [ input ] );

  useEffect( () => {
    console.log( searchResults );
  }, [ searchResults ] );

  return (
    <>
      <img src={ require( "../../Assets/Imgs/bg-img.jpg" ) } className={ Styles[ 'bg-img' ] } alt="bg" />
      <div className={ Styles[ "bg" ] }>
        <div className={ Styles[ "hero" ] }>
          <p className={ Styles[ "punchline" ] }>Where every frame tells a story - Welcome to our Anime Haven.</p>
          <Search
            handleSearch={ handleSearch }
            input={ input }
            setInput={ setInput }
            className={ Styles[ "inputs" ] }
          />
        </div>
      </div>
      <div className={ Styles[ "anime-section" ] }>
        <div className={ Styles[ "top-picks" ] }>
          <p className={ Styles[ "heading" ] }>Top picks for you</p>
          { searchResults && searchResults.results.length && (
            <AnimeCardContainer animes={ searchResults.results } className={ Styles[ "anime-container" ] } />
          ) }
        </div>
        <div className={ Styles[ "recent-episodes" ] }></div>
      </div>
    </>
  );
};

export default AnimePage;