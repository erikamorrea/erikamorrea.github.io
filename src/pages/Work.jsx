import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Footer from '../components/Footer'
import Lightbox from '../components/Lightbox'
import styles from './Work.module.css'

// Site address prefix (e.g. /erikamorreaphotography/ on GitHub Pages), so images load from any address
const BASE = import.meta.env.BASE_URL

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const reduceMotion = useReducedMotion()

  // Start the intro only once the photo has loaded, so it never reveals an empty frame
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const show = loaded || reduceMotion

  return (
    <section ref={ref} className={styles.hero}>
      {/* Intro: after a short pause the photo simply fades in */}
      <div className={styles.heroReveal}>
        <motion.div
          className={styles.heroZoom}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        >
          <picture className={styles.heroPicture}>
            {/* On phones show the original vertical photo instead of the landscape crop */}
            <source media="(max-width: 768px)" srcSet={`${BASE}images/hero-mobile.jpg`} />
            <motion.img
              ref={imgRef}
              src={`${BASE}images/hero.jpg`}
              alt=""
              className={styles.heroImg}
              style={{ scale, opacity }}
              onLoad={() => setLoaded(true)}
            />
          </picture>
        </motion.div>
      </div>
    </section>
  )
}

// Grid photos in order. `pos` = which part stays visible in the square crop, so subjects aren't cut off.
// `ar` = width / height of the original, used to show the whole photo on hover.
const gridPhotos = [
  { src: BASE + 'images/grid/grid-01.jpg', pos: 'center 45%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-02.jpg', pos: '45% center', ar: 1.501 },
  { src: BASE + 'images/grid/grid-03.jpg', pos: 'center 50%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-04.jpg', pos: 'center 85%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-05.jpg', pos: '55% center', ar: 1.501 },
  { src: BASE + 'images/grid/grid-06.jpg', pos: 'center 55%', ar: 0.666 },
  { src: BASE + 'images/grid/grid-07.jpg', pos: 'center', ar: 1.498 },
  { src: BASE + 'images/grid/grid-08.jpg', pos: 'center 65%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-09.jpg', pos: 'center 45%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-10.jpg', pos: 'center 70%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-11.jpg', pos: 'center 90%', ar: 0.669 },
  { src: BASE + 'images/grid/grid-12.jpg', pos: 'center 40%', ar: 0.665 },
  { src: BASE + 'images/grid/grid-13.jpg', pos: 'center 35%', ar: 0.666 },
  { src: BASE + 'images/grid/grid-14.jpg', pos: '45% center', ar: 1.501 },
  { src: BASE + 'images/grid/grid-15.jpg', pos: 'center 70%', ar: 0.666 },
  { src: BASE + 'images/grid/grid-16.jpg', pos: 'center', ar: 1.501 },
  { src: BASE + 'images/grid/grid-17.jpg', pos: 'center 95%', ar: 0.666 },
  { src: BASE + 'images/grid/grid-18.jpg', pos: 'center 64%', ar: 0.557 },
  { src: BASE + 'images/grid/grid-19.jpg', pos: 'center 55%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-20.jpg', pos: 'center 62%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-21.jpg', pos: 'center 80%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-22.jpg', pos: 'center 70%', ar: 0.667 },
  { src: BASE + 'images/grid/grid-23.jpg', pos: 'center 45%', ar: 0.666 },
]

function GridItem({ index, photo, onEnter, onLeave, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={styles.gridItem}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 8) * 0.05,
      }}
      onMouseEnter={() => onEnter(index, ref.current)}
      onMouseLeave={onLeave}
      // full-screen view uses the larger version in images/grid/full/
      onClick={() => onOpen({ full: photo.src.replace('/grid/', '/grid/full/'), thumb: photo.src })}
    >
      <img
        src={photo.src}
        alt=""
        loading="lazy"
        className={styles.gridImg}
        style={{ objectPosition: photo.pos }}
      />
    </motion.div>
  )
}

// Longest side of the enlarged photo, in tiles
const ZOOM = 2

/*
  Enlarged, uncropped photo shown on hover. It is a single layer drawn after the whole grid
  (not inside the tile), so it always sits on top of the other photos in every browser.
  It ignores the mouse, so moving onto another tile simply switches to that photo.
*/
function HoverPreview({ preview }) {
  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          key={preview.src}
          className={styles.preview}
          initial={preview.from}
          animate={{ ...preview.to, opacity: 1 }}
          exit={{ ...preview.from, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={preview.src} alt="" className={styles.previewImg} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Work() {
  const gridRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [openSrc, setOpenSrc] = useState(null) // photo shown full screen

  const openPhoto = photo => {
    setPreview(null)
    setOpenSrc(photo)
  }

  const showPreview = (index, el) => {
    // touch screens have no real hover
    if (!window.matchMedia('(hover: hover)').matches || !el || !gridRef.current) return
    const photo = gridPhotos[index]
    const t = el.offsetWidth
    const left = el.offsetLeft
    const top = el.offsetTop
    const w = photo.ar >= 1 ? t * ZOOM : t * ZOOM * photo.ar
    const h = photo.ar >= 1 ? (t * ZOOM) / photo.ar : t * ZOOM
    // centred on the tile, but kept within the grid margins so edge photos don't leave the page
    const cs = getComputedStyle(gridRef.current)
    const minX = parseFloat(cs.paddingLeft)
    const maxX = gridRef.current.clientWidth - parseFloat(cs.paddingRight) - w
    const x = Math.min(Math.max(left + t / 2 - w / 2, minX), maxX)
    const y = top + t / 2 - h / 2
    setPreview({
      src: photo.src,
      from: { left, top, width: t, height: t, opacity: 0.6 },
      to: { left: x, top: y, width: w, height: h },
    })
  }

  return (
    <PageTransition>
      <Hero />

      <motion.p
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Portraits and Street Photography
      </motion.p>

      <div className={styles.grid} ref={gridRef}>
        {gridPhotos.map((photo, i) => (
          <GridItem
            key={photo.src}
            index={i}
            photo={photo}
            onEnter={showPreview}
            onLeave={() => setPreview(null)}
            onOpen={openPhoto}
          />
        ))}
        <HoverPreview preview={preview} />
      </div>

      <Lightbox photo={openSrc} onClose={() => setOpenSrc(null)} />

      <Footer />
    </PageTransition>
  )
}
