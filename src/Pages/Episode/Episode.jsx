import React, { useEffect, useRef, useState } from 'react';
import Styles from "./Episode.module.css";
import { useParams } from 'react-router-dom';

const Episode = () => {

  const [ servers, setServers ] = useState( null );
  const { epID, animeID } = useParams();
  const ref = useRef();

  useEffect( () => {

    const fetchServers = async () => {
      try {

        const response = await fetch( "https://anime-api-liart.vercel.app/episode-servers", {
          method: "POST",
          body: JSON.stringify( {
            epId: epID
          } ),
          headers: {
            "Content-Type": "application/json"
          }
        } );

        if ( response.ok ) {
          const body = await response.json();
          setServers( body );
        }


      } catch ( e ) {
        console.log( e );
      }
    };

    fetchServers();

  }, [ epID, animeID ] );

  useEffect( () => {
    const iframe = document.querySelector( "iframe." + Styles[ "episode-frame" ] );
    console.log( iframe );

    const handleEvent = () => {
      iframe?.scrollIntoView( {
        behavior: "smooth"
      } );
    };

    handleEvent();

  }, [ ref, ref.current ] );

  return (
    <>
      { servers && (
        <iframe ref={ ref } className={ Styles[ "episode-frame" ] } src={ servers[ 0 ].url } allowFullScreen frameborder="0"></iframe>
      ) }
    </>
  );
};

export default Episode;