import { useState, useEffect, memo } from "react";
import Styles from "./RecentEpisodes.module.css";

const RecentEpisodes = ( { className } ) => {
  const [ recentEpisodes, setRecentEpisodes ] = useState( null );


  const fetchRecentEpisodes = async ( { controller } ) => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/recent-episodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        signal: controller?.signal
      } );

      if ( response.ok ) {
        const body = await response.json();
        setRecentEpisodes( body );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  useEffect( () => {

    fetchRecentEpisodes( { controller: null } );

  }, [] );

  return (
    <div className={ `${ Styles[ "recent-episodes" ] } ${ className }` }>
      <p className={ Styles[ "recent-episodes-heading" ] }>
        Recent Episodes
      </p>
      { recentEpisodes?.results.length && recentEpisodes.results.map( ( ep, id ) => (
        <a href={ `/anime/${ ep.id }/${ ep.episodeId }` } target='_blank' onClick={ e => e.stopPropagation() }>
          <div className={ Styles[ "episode-container" ] } key={ id }>
            <img src={ ep.image } alt="" />
            <div className={ Styles[ "content" ] }>
              <p className={ Styles[ "title" ] }>{ ep.title.length > 40 ? ep.title.slice( 0, 40 ) + " ..." : ep.title }</p>
              <p className={ Styles[ "number" ] }>Episode { ep.episodeNumber }</p>
            </div>
          </div>
        </a>
      ) )
      }
    </div>
  );
};

export default memo( RecentEpisodes );