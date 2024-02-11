import { ANIME } from '@consumet/extensions';
import { useEffect, useState } from 'react';     //lafafafa


/**
 * A custom React hook for fetching anime data.
 * @param {string} query - The query string to search for anime.
 * @param {Object} options - Additional options for fetching anime data.
 * @param {boolean} [options.search] - A boolean indicating whether to include search functionality.
 * @param {string|undefined} [options.genre] - The genre of anime to filter by, or undefined for no filtering.
 * @returns {Array|null} The fetched anime data or null if not fetched yet.
 */
const useAnime = ( query, options ) => {
  const [ data, setData ] = useState( null );
  const zoro = new ANIME.Zoro();

  useEffect( () => {

    if ( options.search && query.trim().length ) {
      zoro.search( query ).then( data => {
        setData( data );
      } ).catch( err => {
        console.log( err );
      } );
    }

    return [ data ];

  }, [ query, options ] );
};

export default useAnime;
