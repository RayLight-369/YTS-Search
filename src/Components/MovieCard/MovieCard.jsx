import { memo } from 'react';
import Styles from "./MovieCard.module.css";
import { ReactComponent as Star } from '../../Assets/Imgs/Star.svg';


const MovieCard = ( { movie } ) => {
  return (
    <a href={ movie.url }>
      <div className={ Styles.card }>
        <div className={ Styles.image }>
          <img src={ movie[ "large_cover_image" ] } alt="" />
        </div>
        <div className={ Styles.content }>
          <div className="title-rating-genre">
            <div className="title-rating">
              <p className="title">{ movie.title }</p>
              <div className="rating">
                <Star />
                <span>{ `${ movie.rating } / 10` }</span>
              </div>
            </div>
            <div className="year-genre">
              <p className="year">{ movie.year }</p>
              <p className="genre">{ movie.genres.join( ", " ) }</p>
            </div>
          </div>
          <div className="summary">
            <p className="heading">Summary</p>
            <p className="desc">{ }</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default memo( MovieCard );