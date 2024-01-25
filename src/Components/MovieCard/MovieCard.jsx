import { memo, useState } from "react";
import Styles from "./MovieCard.module.css";
import { ReactComponent as Star } from "../../Assets/Imgs/Star.svg";
import { ReactComponent as Language } from "../../Assets/Imgs/language.svg";
import { ReactComponent as Download } from "../../Assets/Imgs/download.svg";
import Options from "../../Assets/Imgs/options.svg";
// import { ReactComponent as Bookmark } from '../../Assets/Imgs/bookmark.svg';
import { ReactComponent as Play } from "../../Assets/Imgs/play.svg";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal/Modal";

const MovieCard = ( { movie, variants, setTrailer } ) => {

  const [ showOptions, setShowOptions ] = useState( false );

  const variants2 = {
    initial: {
      y: -50,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 20,
      opacity: 0
    }
  };

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
      <motion.a
        href={ `https://www.imdb.com/title/${ movie.imdb_code }` }
        className={ Styles.cover }
        target="_blank"
        variants={ variants }
        onClick={ e => e.stopPropagation() }
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
            <img src={ movie[ "large_cover_image" ] } alt="" />
            <div className={ Styles.torrents }>
              <img src={ Options } className={ Styles.menu } onClick={ ( e ) => {
                e.stopPropagation();
                e.preventDefault();
                setShowOptions( prev => !prev );
              } } />
              <motion.div className={ Styles.options } initial="initial" animate="animate" exit="exit" variants={ variants2 }>
                <AnimatePresence mode="wait">
                  { showOptions && movie?.torrents.map( ( torrent, index ) => (
                    <motion.a variants={ variants2 } initial="initial" animate="animate" exit="exit" transition={ { delay: index * .1, duration: .1 } } href={ torrent.url } key={ index } target="_blank" className={ Styles.torrent }>
                      <Download className={ Styles.download } />
                      { `${ torrent.quality } ${ torrent.type } ${ torrent.size }` }
                    </motion.a>
                  ) ) }
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
          <div className={ Styles.content }>
            <div className={ Styles[ "title-rating-genre" ] }>
              <div className={ Styles[ "title-rating" ] }>
                <p className={ Styles[ "title" ] }>{ movie.title.slice( 0, 20 ) }...</p>
                <div className={ Styles[ "rating" ] }>
                  <Star className={ Styles[ "star" ] } />
                  <span>{ `${ movie.rating } / 10` }</span>
                </div>
              </div>
              <div className={ Styles[ "year-genre" ] }>
                <p className={ Styles[ "year" ] }>{ movie.year }.</p>
                <p className={ Styles[ "genre" ] }>{ movie.genres.join( ", " ) }</p>
              </div>
            </div>
            <div className={ Styles[ "summary-lang" ] }>
              <div className={ Styles[ "headings" ] }>
                <p className={ Styles[ "heading" ] }>Summary</p>
                <div className={ Styles[ "lang" ] }>
                  <Language className={ Styles[ "lang" ] } />{ " " }
                  <span>{ movie.language }</span>
                </div>
              </div>
              <p className={ Styles[ "desc" ] }>
                { movie.summary.slice( 0, 100 ) + "..." }
              </p>
            </div>
            <div className={ Styles[ "trailer-bookmark" ] } onClick={ e => e.stopPropagation() }>
              <a
                onClick={ ( e ) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setTrailer( {
                    show: true,
                    src: `https://www.youtube.com/embed/${ movie[ "yt_trailer_code" ] }?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`
                  } );
                  return;
                } }
                // target="_blank"
                // href={ `https://www.youtube.com/embed/${ movie[ "yt_trailer_code" ] }?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3` }
                className={ Styles.play }
              >
                <Play className={ Styles.play } />
                <span>Watch Trailer</span>
              </a>
              {/* <button type='button' className={ Styles.bm }>
              <Bookmark className={ Styles.bookmark } />
            </button> */}
            </div>
          </div>
        </motion.div>
      </motion.a>
    </>
  );
};

export default memo( MovieCard );
