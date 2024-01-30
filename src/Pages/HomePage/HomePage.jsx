import React, { memo, useEffect, useState } from "react";
import Styles from "./HomePage.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { SocialLionks } from "../../Constants";

const HomePage = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleStateChange = (e) => {
      if (document.readyState == "complete") {
        setLoaded(true);
        console.log("loaded");
      }
    };

    document.addEventListener("readystatechange", handleStateChange);

    return () => {
      document.removeEventListener("readystatechange", handleStateChange);
    };
  }, []);

  let variants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
  };

  let socialLinksVariants = {
    initial: {
      x: -10,
      // opacity: 0
    },
    animate: {
      x: 0,
      // opacity: 1,
    },
  };

  return (
    // <AnimatePresence mode='wait'>
    <>
      <section className={Styles["home-section"]}>
        <div className={Styles["overlay"]}></div>
        {loaded && (
          <>
            <motion.div
              className={Styles["container"]}
              variants={variants}
              animate="animate"
              initial="initial"
              exit="exit"
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className={Styles["hero"]}
                variants={variants}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <p className={Styles["p1"]}>Stooge Pictures</p>
                <motion.div
                  className={Styles["d2"]}
                  variants={variants}
                  transition={{ delay: 0.45, duration: 0.7 }}
                >
                  <p className={Styles["description"]}>
                    Experience seamless entertainment where you can watch movies
                    and shows, and even download your favorites for offline
                    enjoyment.
                  </p>
                  <p className={Styles["p2"]}>Feel Free</p>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className={Styles["links"]}
              variants={socialLinksVariants}
              animate="animate"
              initial="initial"
              transition={{ staggerChildren: 0.2, duration: 1 }}
            >
              {SocialLionks.map((social, index) => (
                <motion.a
                  href={social.link}
                  target="_blank"
                  className={Styles["link"]}
                  variants={socialLinksVariants}
                  whileHover={{ scale: 1.4 }}
                  key={index}
                >
                  <img src={social.src} alt="" />
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </section>
    </>
    // </AnimatePresence>
  );
};

export default memo(HomePage);
