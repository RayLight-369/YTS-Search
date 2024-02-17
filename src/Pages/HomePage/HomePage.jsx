import React, { memo, useEffect, useState } from "react";
import Styles from "./HomePage.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { SocialLionks } from "../../Constants";
import Loader from "../../Assets/Imgs/loader.gif";


const NumberTransition = ( { targetNumber, duration, className } ) => {
  const [ currentNumber, setCurrentNumber ] = useState( 0 );

  useEffect( () => {
    let startTimestamp;
    let requestId;

    const updateNumber = ( timestamp ) => {
      if ( !startTimestamp ) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const increment = ( targetNumber - currentNumber ) * ( progress / duration );
      const newNumber = currentNumber + increment;

      if ( progress < duration && newNumber < targetNumber ) {
        setCurrentNumber( newNumber );
        requestId = requestAnimationFrame( updateNumber );
      } else {
        setCurrentNumber( targetNumber );
      }
    };

    requestId = requestAnimationFrame( updateNumber );

    return () => {
      cancelAnimationFrame( requestId );
    };
  }, [ currentNumber, targetNumber, duration ] );

  return <p className={ className }>{ Math.round( currentNumber ) }</p>;
};

const HomePage = () => {
  const [ loaded, setLoaded ] = useState( false );
  const [ viewersCount, setViewersCount ] = useState( 0 );
  // const [ oneCycleComplete, setAnimation ] = useState( false );

  useEffect( () => {

    function setStateLoaded () {
      if ( document.readyState == "complete" ) {
        setLoaded( true );
      }
    }

    setStateLoaded();

    const handleStateChange = ( e ) => {
      setStateLoaded();
      fetch( "https://anime-api-liart.vercel.app/num-of-viewers" ).then( data => data.json() ).then( ( body ) => {
        setViewersCount( body.count );
      } );
    };

    document.addEventListener( "readystatechange", handleStateChange );

    return () => {
      document.removeEventListener( "readystatechange", handleStateChange );
    };
  }, [] );

  let variants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
  };

  let socialLinksVariants = {
    initial: {
      x: -10,
      // opacity: 0
    },
    animate: {
      x: 0,
      // opacity: 1,
    },
  };

  useEffect( () => {

    function getCookie ( cookieName ) {
      const cookie = document.cookie
        .split( ';' )
        .map( cookie => cookie.trim().split( '=' ) )
        .find( ( [ name ] ) => name === cookieName );

      return cookie ? cookie[ 1 ] : null;
    }

    if ( !viewersCount ) {

      if ( getCookie( "visitedCount" ) ) {
        setViewersCount( parseInt( getCookie( "visitedCount" ) ) );
        return;
      }

      fetch( "https://anime-api-liart.vercel.app/num-of-viewers" ).then( data => data.json() ).then( ( body ) => {
        setViewersCount( body.count );
      } );
    }
  }, [ viewersCount ] );

  return (
    // <AnimatePresence mode='wait'>
    <>
      <section className={ Styles[ "home-section" ] }>
        <div className={ Styles[ "overlay" ] }></div>
        <AnimatePresence mode="wait">
          { !loaded && (
            <motion.div
              className={ Styles[ "loader" ] }
              initial={ { opacity: 0 } }
              animate={ { opacity: 1 } }
              exit={ { opacity: 0 } }
            // onAnimationComplete={ () => setAnimation( true ) }
            >
              <img
                src={ Loader }
                width={ 200 }
                height={ 200 }
                className={ Styles.player_loader }
              />
            </motion.div>
          ) }
        </AnimatePresence>
        { loaded && (
          <>
            <motion.div
              className={ Styles[ "container" ] }
              variants={ variants }
              animate="animate"
              initial="initial"
              exit="exit"
              transition={ { duration: 0.7 } }
            >
              <motion.div
                className={ Styles[ "hero" ] }
                variants={ variants }
                transition={ { delay: 0.2, duration: 0.7 } }
              >
                <p className={ Styles[ "p1" ] }>Stooge Pictures</p>
                <motion.div
                  className={ Styles[ "d2" ] }
                  variants={ variants }
                  transition={ { delay: 0.45, duration: 0.7 } }
                >
                  <p className={ Styles[ "description" ] }>
                    Experience seamless entertainment where you can watch movies
                    and shows, and even download your favorites for offline
                    enjoyment.
                  </p>
                  <p className={ Styles[ "p2" ] }>Feel Free</p>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className={ Styles[ "links" ] }
              variants={ socialLinksVariants }
              animate="animate"
              initial="initial"
              transition={ { staggerChildren: 0.2, duration: 1 } }
            >
              { SocialLionks.map( ( social, index ) => (
                <motion.a
                  href={ social.link }
                  target="_blank"
                  className={ Styles[ "link" ] }
                  variants={ socialLinksVariants }
                  whileHover={ { scale: 1.4 } }
                  key={ index }
                >
                  <img src={ social.src } alt="" />
                </motion.a>
              ) ) }
            </motion.div>
            <motion.div
              className={ Styles[ "viewer-count" ] }
              variants={ socialLinksVariants }
              animate="animate"
              initial="initial"
              transition={ { staggerChildren: 0.2, duration: 1 } }
            >
              <p className={ Styles[ "title" ] }>Total Viewers: </p>
              <NumberTransition className={ Styles[ "count" ] } duration={ 700 } targetNumber={ viewersCount } />
            </motion.div>
          </>
        ) }
      </section>
    </>
    // </AnimatePresence>
  );
};

export default memo( HomePage );
