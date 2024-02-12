import { memo, useEffect, useState } from "react";
import Styles from "./AnimeCard.module.css";
import { ReactComponent as Star } from "../../Assets/Imgs/Star.svg";
import { ReactComponent as Language } from "../../Assets/Imgs/language.svg";
import { ReactComponent as Download } from "../../Assets/Imgs/download.svg";
import Options from "../../Assets/Imgs/options.svg";
// import { ReactComponent as Bookmark } from '../../Assets/Imgs/bookmark.svg';
import { ReactComponent as Play } from "../../Assets/Imgs/play.svg";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal/Modal";

const AnimeCard = ( {
  anime
} ) => {

  const [ showOptions, setShowOptions ] = useState( false );
  const [ animeInfo, setAnimeInfo ] = useState( null );
  const [ basicInfo, setBasicInfo ] = useState( null );

  const fetchAnimeInfo = async () => {
    try {
      const response = await fetch( "https://anime-api-liart.vercel.app/anime-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Set content type header
        },
        body: JSON.stringify( {
          id: anime.id
        } ),
      } );

      if ( response.ok ) {
        const body = await response.json();
        setAnimeInfo( body );
        setBasicInfo( {
          Type: body.type,
          Date: body.releaseDate,
          Episodes: body.totalEpisodes,
          Status: body.status
        } );
      }
    } catch ( e ) {
      if ( e.name != "AbortError" ) console.log( e );
    }
  };

  useEffect( () => {
    fetchAnimeInfo();
  }, [] );


  // const [ isMobile, setIsMobile ] = useState( true );

  // useState( () => {

  // })

  return (
    <>
      {/* <AnimatePresence mode="wait">
        { showTrailer && (
          <Modal handleClose={ () => setShowTrailer( false ) }>
            <iframe src={ `https://www.youtube.com/embed/${ movie[ "yt_trailer_code" ] }?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3` } width={ 500 } height={ 450 } />
          </Modal>
        ) }
      </AnimatePresence> */}
      <a
        href={ anime.url }
        target="_blank"
        className={ Styles.cover }
        onClick={ ( e ) => {
          // e.preventDefault();
          e.stopPropagation();
        } }
      >


        <div
          className={ Styles.card }
        // transition={ {
        //   delay: 0,
        //   // duration: 0.2,
        //   type: "spring",
        //   damping: 9,
        // } }
        // whileHover={ { scale: 1.04 } }
        >
          <div className={ Styles.image }>
            <img src={ anime.image } alt="" />
          </div>

          <div className={ Styles.content }>
            <div className={ Styles[ "title-rating-genre" ] }>
              <div className={ Styles[ "title-rating" ] }>
                <p className={ Styles[ "title" ] } title={ anime.title }>
                  { anime.title.length > 20 ? anime.title.slice( 0, 20 ) + "..." : anime.title }
                </p>
              </div>
              <div className={ Styles[ "type-genre" ] }>
                <p className={ Styles[ "genre" ] }>{ anime?.genres?.join( ", " ) || animeInfo?.genres?.join( ", " ) }</p>
              </div>
            </div>

          </div>
        </div>

        <div className={ Styles[ "hover-info" ] }>
          <div className={ Styles[ "info" ] }>
            {/* <img src={ animeInfo?.image } alt="poster" /> */ }
            <div className={ Styles[ "content" ] }>
              <p className={ Styles[ "title" ] }>{ animeInfo?.title }</p>
              <div className={ Styles[ "props" ] }>
                <div className={ Styles[ "genre" ] }>
                  <p className={ Styles[ "heading" ] }>Genre:</p>
                  <div className={ Styles[ "genres" ] }>
                    { animeInfo && animeInfo.genres.map( ( genre, key ) => (
                      <span className={ Styles[ "tag" ] } key={ key }>{ genre }</span>
                    ) ) }
                  </div>
                </div>
                { basicInfo && Object.entries( basicInfo ).map( ( [ key, val ] ) => (
                  <div className={ Styles[ "info" ] } key={ val }>
                    <p className={ Styles[ "info-heading" ] }>{ key }: </p>
                    <p className={ Styles[ "info-tag" ] }>{ val }</p>
                  </div>
                ) ) }
                <div className={ Styles[ "type" ] }>
                  <p className={ Styles[ "heading" ] }>Type:</p>
                  <p className={ Styles[ "tag" ] }>{ animeInfo?.releaseDate }</p>
                </div>
              </div>
            </div>
          </div>
          <p className={ Styles[ "description" ] }>{ animeInfo?.description }</p>
        </div>

      </a>

    </>
  );
};

export default memo( AnimeCard );
