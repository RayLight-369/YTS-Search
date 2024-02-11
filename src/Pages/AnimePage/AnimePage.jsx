import { useDeferredValue, useState } from 'react';
import Styles from "./AnimePage.module.css";
import Search from '../../Components/Search/Search';

const AnimePage = () => {

  const [ input, setInput ] = useState( "" );
  const defferedInput = useDeferredValue( input );

  const handleSearch = () => {

  };

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