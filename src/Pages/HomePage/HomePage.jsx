import React, { memo } from 'react';
import Styles from "./HomePage.module.css";
import { AnimatePresence, motion } from 'framer-motion';
import { SocialLionks } from '../../Constants';

const HomePage = () => {

  let variants = {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 }
  };



  let socialLinksVariants = {
    initial: {
      x: -10,
      // opacity: 0
    },
    animate: {
      x: 0,
      // opacity: 1,
    }
  };

  return (
    <AnimatePresence mode='wait'>
      <section className={ Styles[ "home-section" ] }>
        <div className={ Styles[ "overlay" ] }></div>
        <motion.div className={ Styles[ "container" ] } variants={ variants } animate="animate" initial="initial" exit="exit" transition={ { duration: .7 } }>
          <motion.div className={ Styles[ "hero" ] } variants={ variants } transition={ { delay: .2, duration: .7 } }>
            <p className={ Styles[ "p1" ] }>Stooge Pictures</p>
            <motion.div className={ Styles[ "d2" ] } variants={ variants } transition={ { delay: .45, duration: .7 } }>
              <p className={ Styles[ 'description' ] }>
                Experience seamless entertainment
                where you can watch movies and shows, and even download your favorites for offline enjoyment.
              </p>
              <p className={ Styles[ "p2" ] }>Feel Free</p>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className={ Styles[ "links" ] } variants={ socialLinksVariants } animate="animate" initial="initial" transition={ { staggerChildren: .2, duration: 1 } }>
          { SocialLionks.map( ( social, index ) => (
            <motion.a href={ social.link } target='_blank' className={ Styles[ 'link' ] } variants={ socialLinksVariants } whileHover={ { scale: 1.4 } }>
              <img src={ social.src } alt="" />
            </motion.a>
          ) ) }
        </motion.div>
      </section>
    </AnimatePresence>
  );
};

export default memo( HomePage );