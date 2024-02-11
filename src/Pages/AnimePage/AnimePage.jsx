import { useDeferredValue, useEffect, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';
import useAnime from '../../Hooks/useAnime';



const AnimePage = () => {

  const [ input, setInput ] = useState( "" );
  const defferedInput = useDeferredValue( input );
  const [ searchResults, setSearchResults ] = useState( [] );

  const handleSearch = ( e, searchBy ) => { };

  useEffect( () => {

    const controller = new AbortController();

    fetch( "https://anime-api-liart.vercel.app/search", {
      method: "POST",
      body: JSON.stringify( {
        input
      } ),
      signal: controller.signal
    } )
      .then( res => res.json() )
      .then( body => setSearchResults( body ) )
      .catch( ( err ) => {
        if ( err.name !== 'AbortError' ) console.log( err );
      } );

    return () => controller.abort();

  }, [ defferedInput ] );

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
    </>
  );
};

export default AnimePage;