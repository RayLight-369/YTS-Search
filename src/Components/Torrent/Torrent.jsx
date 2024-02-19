import { useEffect } from 'react';
import { ReactComponent as Download } from "../../Assets/Imgs/download.svg";
import Styles from "./Torrent.module.css";


const Torrent = ( { torrent } ) => {
  return (
    <a className={ Styles[ "torrent" ] } href={ torrent.link }>
      <p className={ Styles[ "title" ] }>{ torrent.title }</p>
      <div className={ Styles[ "size-download" ] }>
        <p className={ Styles[ "size" ] }>{ torrent.size }</p>
        <a href={ torrent.link }><Download className={ Styles[ 'icon' ] } /></a>
      </div>
    </a>
  );
};

export default Torrent;