import { useEffect, useState, memo } from "react";
import Styles from "./SearchPage.module.css";
import { AnimatePresence, motion } from "framer-motion";
import MovieCardContainer from "../../Components/MovieCardContainer/MovieCardContainer";
import Modal from "../../Components/Modal/Modal";
import RequestForm from "../../Components/RequestForm/RequestForm";
import Footer from "../../Components/Footer/Footer";
// import torrentStream from "torrent-stream";
// import { pipeline } from "stream";
// import MG from "../../Assets/Imgs/magnifying_glass.svg";

const Inputs = memo(({ input, setInput, handleSearch = () => {} }) => {
  return (
    <div className={Styles.inputs} onKeyDown={handleSearch}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search Movies"
      />
      <motion.button
        whileHover={{ width: "70px" }}
        whileTap={{ scale: 0.8 }}
        type="button"
        onClick={() => handleSearch({ key: "Enter" })}
      />
    </div>
  );
});

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [pending, setPending] = useState(false);
  const [fetchMore, setFetchMore] = useState(false);
  const [trailer, setTrailer] = useState({ show: false, src: "" });
  const [showRequest, setShowRequest] = useState(false);
  const [showPlayer, setShowPlayer] = useState({
    show: false,
    hash: "",
    poster: "",
    imdb_id: undefined,
    lang: "",
  });

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
    script.async = true;
    script.type = "text/javascript";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (showPlayer.show) {
      window.webtor = window.webtor || [];
      let player = document.getElementById(Styles["videoplayer"]);
      let children = player.childNodes;

      const delChildren = () => {
        if (children.length > 1) {
          for (let i = 0; i < children.length - 1; i++) {
            if (children[i].nodeName == "BUTTON") {
              continue;
            }
            children[i].remove();
          }
        }
      };

      delChildren();

      window.webtor.push({
        id: Styles["videoplayer"],
        width: "100%",
        magnet:
          "magnet:?xt=urn:btih:" +
          showPlayer.hash +
          "&amp;tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&amp;tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce",
        on: function (e) {
          // player.style.alignItems = "center";
          // player.style.justifyContent = "Center";

          if (e.name == window.webtor.INITED) {
            //console.log('Torrent fetched!', e.data);
            let player = document.getElementById(Styles["videoplayer"]);
            player.style.display = "flex";
            let children = player.childNodes;
            delChildren();
            e.player.play();
          }
          if (e.name == window.webtor.TORRENT_ERROR) {
            console.log("Torrent error!");
          }
        },
        poster: showPlayer.poster,
        imdbId: showPlayer.imdb_id,
        lang: showPlayer.lang,
        userLang: "",
        i18n: {
          en: {
            common: {
              "prepare to play": "Preparing Video Stream... Please Wait...",
            },
            stat: {
              seeding: "Seeding",
              waiting: "Client initialization",
              "waiting for peers": "Waiting for peers",
              from: "from",
            },
          },
        },
      });
    } else {
      var div = document.getElementById(Styles["videoplayer"]);

      // Get all child elements of the div
      var children = div?.childNodes;

      // Loop through each child element
      if (children?.length) {
        for (var i = children.length - 1; i >= 0; i--) {
          // Check if the child element is not a button
          if (children[i].tagName !== "BUTTON") {
            // Remove the child element
            div.removeChild(children[i]);
          }
        }
      }
    }
  }, [showPlayer]);

  async function fetchMovies({ Controller }) {
    // if ( !input.trim().length ) {
    //   await fetch(
    //     `https://yts.mx/api/v2/list_movies.json?limit=6`,
    //     {
    //       signal: Controller?.signal,
    //     }
    //   );
    //   return;
    // }

    try {
      const reponse = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${input}`,
        {
          signal: Controller?.signal,
        }
      );

      const body = await reponse.json();

      if (reponse.ok) {
        if (body.data?.movie_count > 0) {
          setMovies(body.data.movies);
          setPending(body.data?.movie_count - 20 > 0 ? true : false);
        } else {
          setMovies([]);
        }
      }

      console.log(body);
    } catch (e) {
      if (!Controller?.signal.aborted) {
        console.log(e);
      }
    }
  }

  async function fetchPage({ page, Controller }) {
    if (!input.trim().length) {
      setMovies([]);
      return;
    }

    try {
      const reponse = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${input}${
          page ? `&page=${page}` : ""
        }`,
        {
          signal: Controller?.signal,
        }
      );

      const body = await reponse.json();

      if (reponse.ok) {
        if (body.data?.movie_count - movies.length > 0) {
          setMovies((prev) => [...prev, ...body.data.movies]);
          setPending(true);
        } else {
          setPending(false);
        }
      }

      console.log(body);
    } catch (e) {
      if (!Controller?.signal.aborted) {
        console.log(e);
      }
    } finally {
      setFetchMore(false);
    }
  }

  useEffect(() => {
    const Controller = new AbortController();

    fetchMovies({ Controller });

    return () => Controller.abort();
  }, [input]);

  useEffect(() => {
    const Controller = new AbortController();

    if (fetchMore && movies.length) {
      fetchPage({ Controller, page: movies.length / 20 + 1 });
    }

    return () => Controller.abort();
  }, [fetchMore]);

  const handleClose = () => setShowRequest(false);
  const handlePlayerClose = () => {
    setShowPlayer({ show: false, hash: "" });
    document.getElementById(Styles["videoplayer"]).style.display = "none";
  };

  return (
    // <AnimatePresence mode='popLayout'>
    <>
      <div className={Styles.overlay}></div>
      <AnimatePresence mode="wait">
        {trailer.show && (
          <Modal
            handleClose={() => setTrailer({ show: false, src: "" })}
            customClassName={Styles.modal}
          >
            <iframe
              src={trailer.src}
              width={640}
              height={360}
              style={{ border: "none" }}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className={Styles.container}>
        <div className={Styles.hero}>
          <p className={Styles.punchline}>HD Movies With Smallest Size</p>
          <Inputs
            input={input}
            setInput={setInput}
            handleSearch={(e) =>
              e.key == "Enter" && fetchMovies({ Controller: null })
            }
          />
          <p className={Styles.note}>
            Browse Movies in 720p, 1080p, 2K, 4K and 3D quality, All At Smallest
            file Size.
          </p>
          {/* SP Movies Torrents. */}
        </div>
        <div className={Styles.movies}>
          <MovieCardContainer
            setTrailer={setTrailer}
            movies={movies}
            showPlayer={showPlayer}
            setShowPlayer={setShowPlayer}
          />
          {pending && input.trim().length && (
            <motion.button
              whileHover={{ filter: "saturate(.7)", scale: 0.9 }}
              transition={{ type: "spring" }}
              type="button"
              className={Styles.load_more}
              onClick={() => {
                setFetchMore(true);
              }}
            >
              Load More
            </motion.button>
          )}
        </div>
      </div>
      <Footer handleRequest={() => setShowRequest(true)} />
      <AnimatePresence mode="wait">
        {showRequest && (
          <Modal handleClose={handleClose}>
            <RequestForm handleClose={handleClose} />
          </Modal>
        )}
        {/* { showPlayer.show && ( */}
        {/* <Modal handleClose={ handlePlayerClose }> */}
        <div className="webtor" id={Styles["videoplayer"]}>
          <button type="button" onClick={handlePlayerClose}>
            ✖
          </button>
        </div>
        {/* </Modal> */}
        {/* ) } */}
      </AnimatePresence>
    </>
    // </AnimatePresence>
  );
};

export default memo(SearchPage);
