import { memo } from 'react';
import Styles from "./MovieCard.module.css";
import { ReactComponent as Star } from '../../Assets/Imgs/Star.svg';
import { ReactComponent as Language } from '../../Assets/Imgs/language.svg';
// import { ReactComponent as Bookmark } from '../../Assets/Imgs/bookmark.svg';
import { ReactComponent as Play } from '../../Assets/Imgs/play.svg';


const MovieCard = ( { movie } ) => {
  return (
    <a href={ movie.url } className={ Styles.cover }>
      <div className={ Styles.card }>
        <div className={ Styles.image }>
          <img src={ movie[ "large_cover_image" ] } alt="" />
        </div>
        <div className={ Styles.content }>
          <div className={ Styles[ "title-rating-genre" ] }>
            <div className={ Styles[ "title-rating" ] }>
              <p className={ Styles[ "title" ] }>{ movie.title.slice( 0, 30 ) }</p>
              <div className={ Styles[ "rating" ] }>
                <Star className={ Styles[ 'star' ] } />
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
                <Language className={ Styles[ 'lang' ] } /> <span>{ movie.language }</span>
              </div>
            </div>
            <p className={ Styles[ "desc" ] }>{ movie.summary.slice( 0, 100 ) + "..." }</p>
          </div>
          <div className={ Styles[ "trailer-bookmark" ] }>
            <button type="button" className={ Styles.play }>
              <Play className={ Styles.play } />
              <span>Watch Trailer</span>
            </button>
            {/* <button type='button' className={ Styles.bm }>
              <Bookmark className={ Styles.bookmark } />
            </button> */}
          </div>
        </div>
      </div>
    </a>
  );
};

export default memo( MovieCard );