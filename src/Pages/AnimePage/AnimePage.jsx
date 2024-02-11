import { useDeferredValue, useEffect, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';
import useAnime from '../../Hooks/useAnime';
import AnimeCardContainer from '../../Components/AnimeCardContainer/AnimeCardContainer';



const AnimePage = () => {

  const [ input, setInput ] = useState( "" );
  const [ searchResults, setSearchResults ] = useState( null );



  const fetchTopAiring = async ( { controller } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/top-airing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        setSearchResults( body );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const fetchAnime = async ( { controller, query = input } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/search", {
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
        setSearchResults( body );
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

    if ( input.trim().length ) {

      fetchAnime( { controller } );

    } else {

      fetchTopAiring( { controller } );

    }

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
          { input.trim().length == 0 ? (
            <p className={ Styles[ "heading" ] }>Top picks for you</p>
          ) : (
            <p className={ Styles[ "heading" ] }>Search Results</p>
          ) }
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