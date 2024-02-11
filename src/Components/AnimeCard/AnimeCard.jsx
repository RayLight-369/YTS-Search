import { memo, useState } from "react";
import Styles from "./AnimeCard.module.css";
import { ReactComponent as Star } from "../../Assets/Imgs/Star.svg";
import { ReactComponent as Language } from "../../Assets/Imgs/language.svg";
import { ReactComponent as Download } from "../../Assets/Imgs/download.svg";
import Options from "../../Assets/Imgs/options.svg";
// import { ReactComponent as Bookmark } from '../../Assets/Imgs/bookmark.svg';
import { ReactComponent as Play } from "../../Assets/Imgs/play.svg";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal/Modal";

const OptionsElement = memo( ( { torrents, showOptions } ) => {
  const variants2 = {
    initial: {
      y: -50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 20,
      opacity: 0,
    },
  };

  return (
    <motion.div
      className={ Styles.options }
      initial="initial"
      animate="animate"
      exit="exit"
      variants={ variants2 }
    >
      <AnimatePresence mode="wait">
        { showOptions &&
          torrents.map( ( torrent, index ) => (
            <motion.a
              variants={ variants2 }
              initial="initial"
              animate="animate"
              exit="exit"
              transition={ { delay: index * 0.1, duration: 0.1 } }
              href={ torrent.url }
              key={ index }
              target="_blank"
              className={ Styles.torrent }
            >
              <Download className={ Styles.download } />
              { `${ torrent.quality } ${ torrent.type } ${ torrent.size }` }
            </motion.a>
          ) ) }
      </AnimatePresence>
    </motion.div>
  );
} );

const AnimeCard = ( {
  anime
} ) => {
  const [ showOptions, setShowOptions ] = useState( false );

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
        // href={ `https://www.imdb.com/title/${ movie.imdb_code }` }
        // target="_blank"
        className={ Styles.cover }
        onClick={ ( e ) => {
          e.preventDefault();
          e.stopPropagation();
        } }
      >
        <motion.div
          className={ Styles.card }
          transition={ {
            delay: 0,
            // duration: 0.2,
            type: "spring",
            damping: 9,
          } }
          whileHover={ { scale: 1.04 } }
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
                <p className={ Styles[ "type" ] }>{ anime.type }.</p>
                {/* <p className={ Styles[ "genre" ] }>{ anime.genres.join( ", " ) }</p> */ }
              </div>
            </div>

          </div>
        </motion.div>
      </a>
    </>
  );
};

export default memo( AnimeCard );
