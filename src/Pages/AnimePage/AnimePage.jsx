import { useDeferredValue, useEffect, useRef, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';
import useAnime from '../../Hooks/useAnime';
import AnimeCardContainer from '../../Components/AnimeCardContainer/AnimeCardContainer';
import { TYPES } from '../../Constants';
import useOnScreen from '../../Hooks/useOnScreen';
import RecentEpisodes from '../../Components/RecentEpisodes/RecentEpisodes';

const AnimePage = () => {

  const [ input, setInput ] = useState( "" );
  const [ searchResults, setSearchResults ] = useState( null );
  const [ currentPageType, setCurrentPageType ] = useState( TYPES.TOP_AIRING );
  const ref = useRef();
  const isVisible = useOnScreen( ref );
  const [ currentPage, setCurrentPage ] = useState( {
    type: TYPES.TOP_AIRING,
    hasNextPage: false,
    pageNum: 1
  } );

  useEffect( () => {
    const handleScroll = e => {
      const scrollY = document.documentElement.scrollTop;
    };
  }, [] );

  const fetchTopAiring = async ( { controller, page = 1 } ) => {
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
        // setCurrentPageType( TYPES.TOP_AIRING );
        setCurrentPage( {
          type: TYPES.TOP_AIRING,
          hasNextPage: !!body.hasNextPage,
          pageNum: 1
        } );

        if ( page == 1 ) setSearchResults( body );
        else setSearchResults( prev => ( {
          currentPage: body.currentPage,
          hasNextPage: body.hasNextPage,
          results: [
            ...prev.results,
            ...body.results
          ]
        } ) );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const fetchAnime = async ( { controller, query = input, page = 1 } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/search", {
        method: "POST",
        body: JSON.stringify( {
          query,
          page
        } ),
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        // setCurrentPageType( TYPES.SEARCH );
        setCurrentPage( {
          type: TYPES.SEARCH,
          hasNextPage: !!body.hasNextPage,
          pageNum: 1
        } );

        if ( page == 1 ) setSearchResults( body );
        else setSearchResults( prev => ( {
          currentPage: body.currentPage,
          hasNextPage: body.hasNextPage,
          results: [
            ...prev.results,
            ...body.results
          ]
        } ) );
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

      fetchTopAiring( { controller: null } );

    }

    return () => controller.abort();

  }, [ input ] );

  useEffect( () => {
    console.log( searchResults );
  }, [ searchResults ] );

  useEffect( () => {
    console.log( "ref: ", isVisible );
  }, [ isVisible ] );

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
            placeholder='Search Anime'
          />
        </div>
      </div>
      <div className={ Styles[ "anime-section" ] }>
        <div className={ Styles[ "top-picks" ] }>
          { input.trim().length == 0 ? (
            <p className={ Styles[ "heading" ] }>Top picks for you</p>
          ) : (
            <p className={ Styles[ "heading" ] } >Search Results</p>
          ) }
          { searchResults && searchResults.results.length && (
            <AnimeCardContainer animes={ searchResults.results } className={ Styles[ "anime-container" ] } />
          ) }
        </div>
        <RecentEpisodes />
      </div>
    </>
  );
};

export default AnimePage;