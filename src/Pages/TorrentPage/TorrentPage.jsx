import { useState, useEffect, useMemo } from 'react';
import Styles from "./TorrentPage.module.css";
import Search from '../../Components/Search/Search';
import { TYPES, API_URLS } from '../../Constants';
import Torrent from '../../Components/Torrent/Torrent';

const TorrentPage = () => {

  const [ input, setInput ] = useState( "" );
  const [ searchResults, setSearchResults ] = useState( null );
  const [ Filter, setFilter ] = useState( "All" );
  const Filters = useMemo( () => [ 'All', 'Movies', 'TV', 'Music', 'Apps', 'Books' ], [] );

  const fetchTorrents = async ( { controller, query = input, category = Filter } ) => {

    try {
      const response = await fetch( API_URLS.TORRENT_SEARCH, {
        method: "POST",
        body: JSON.stringify( {
          query,
          category
        } ),
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        setSearchResults( body?.torrents );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  const handleSearch = ( e, searchBy ) => {
    if ( e.key == "Enter" && input.trim().length ) {
      fetchTorrents( { controller: null } );
    }
  };

  const handleFilterClick = ( category ) => {
    setFilter( category );
  };


  useEffect( () => {
    const controller = new AbortController();

    if ( input.trim().length ) {

      fetchTorrents( { controller } );

    } else {
      fetchTorrents( { controller: null, query: "a" } );
    }

    return () => controller.abort();

  }, [ input, Filter ] );


  return (
    <>
      <img src={ require( "../../Assets/Imgs/bg-10-op.png" ) } className={ Styles[ 'bg-img' ] } alt="bg" />
      <div className={ Styles[ "bg" ] }>
        <div className={ Styles[ "hero" ] }>
          <p className={ Styles[ "punchline" ] }>Experience the power of torrents - fast, secure, and limitless.</p>
          <Search
            handleSearch={ handleSearch }
            input={ input }
            setInput={ setInput }
            className={ Styles[ "inputs" ] }
            placeholder='Search Anime'
          />
        </div>
      </div>
      <div className={ Styles[ "torrent-section" ] }>
        <div className={ Styles[ "filters" ] }>
          { Filters.map( ( filter, key ) => (
            <button type='button' key={ key } onClick={ () => handleFilterClick( filter ) } className={ `${ Styles[ 'filter-btn' ] } ${ filter === Filter && Styles[ "active" ] }` }>{ filter }</button>
          ) ) }
        </div>
        <div className={ Styles[ "torrents-container" ] }>
          { searchResults?.length && searchResults?.map( ( torrent, key ) => (
            <Torrent torrent={ torrent } key={ key } />
          ) ) }
        </div>
      </div>
    </>
  );
};

export default TorrentPage;