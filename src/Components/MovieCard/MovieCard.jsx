import { memo } from "react";
import Styles from "./MovieCard.module.css";
import { ReactComponent as Star } from "../../Assets/Imgs/Star.svg";
import { ReactComponent as Language } from "../../Assets/Imgs/language.svg";
import { ReactComponent as Download } from "../../Assets/Imgs/download.svg";
// import { ReactComponent as Bookmark } from '../../Assets/Imgs/bookmark.svg';
import { ReactComponent as Play } from "../../Assets/Imgs/play.svg";
import { motion } from "framer-motion";

const MovieCard = ( { movie, variants } ) => {
  return (
    <motion.a
      href={ `https://www.imdb.com/title/${ movie.imdb_code }` }
      className={ Styles.cover }
      target="_blank"
      variants={ variants }
    >
      <motion.div
        className={ Styles.card }
        transition={ {
          delay: 0,
          duration: 0.2,
          type: "spring",
          damping: 9,
        } }
        whileHover={ { scale: 1.04 } }
      >
        <div className={ Styles.image }>
          <img src={ movie[ "large_cover_image" ] } alt="" />
          <div className={ Styles.torrents }>
            { movie?.torrents.map( ( torrent, index ) => (
              <a href={ torrent.url } target="_blank" className={ Styles.torrent }>
                <Download className={ Styles.download } />
                { torrent.quality }
              </a>
            ) ) }
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
          <div className={ Styles[ "trailer-bookmark" ] }>
            <a
              onClick={ ( e ) => e.stopPropagation() }
              target="_blank"
              href={ `https://www.youtube.com/embed/${ movie[ "yt_trailer_code" ] }?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3` }
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
  );
};

export default memo( MovieCard );
