import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import PageTransition from '../components/PageTransition'
import RevealImage from '../components/RevealImage'
import RevealText from '../components/RevealText'
import Footer from '../components/Footer'
import styles from './Home.module.css'

function HeroTitle() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div ref={ref} className={styles.title} style={{ y, opacity }}>
      <motion.h1
        initial={{ opacity: 0, y: 40, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      >
        Erika Morrea
      </motion.h1>
    </motion.div>
  )
}

const photos = [
  { side: 'right', aspect: '2/3', src: '/images/home-01.jpg', caption: 'Damiano, Portrait' },
  { side: 'left', aspect: '2/3', src: '/images/home-02.jpg' },
  { side: 'right', aspect: '3/2', src: '/images/home-03.jpg' },
  { side: 'left', aspect: '2/3', src: '/images/home-04.jpg', caption: 'Kids playing, Street Photography' },
  { side: 'right', aspect: '2/3', src: '/images/home-05.jpg' },
  { side: 'full', aspect: '21/9', src: '/images/home-06.jpg', caption: 'A woman, Street Photography' },
  { side: 'left', aspect: '2/3', src: '/images/home-07.jpg', caption: 'Marika, Portrait & Street Photography' },
  { side: 'right', aspect: '2/3', src: '/images/home-08.jpg' },
  { side: 'left', aspect: '2/3', src: '/images/home-09.jpg', caption: 'People in Nemi, Street Photography' },
  { side: 'right', aspect: '2/3', src: '/images/home-10.jpg' },
  { side: 'left', aspect: '2/3', src: '/images/home-11.jpg' },
]

function Photo({ p }) {
  return (
    <div className={`cursor-hover ${styles.photo}`}>
      <RevealImage aspect={p.aspect} src={p.src} position={p.position} parallax={p.side === 'full'} />
    </div>
  )
}

function PhotoNumber({ num }) {
  return (
    <RevealText delay={0.1} className={styles.numWrap}>
      <span className={styles.number}>{num}</span>
    </RevealText>
  )
}

function Caption({ text, className = '' }) {
  return (
    <RevealText delay={0.05} className={`${styles.captionWrap} ${className}`}>
      <span className={styles.caption}>{text}</span>
    </RevealText>
  )
}

/* Empty column next to a photo: group caption at the top, photo number at the bottom */
function Side({ p, num, align }) {
  return (
    <div className={`${styles.side} ${align === 'left' ? styles.sideLeft : styles.sideRight}`}>
      {p.caption && <Caption text={p.caption} />}
      <PhotoNumber num={num} />
    </div>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <HeroTitle />

      <section className={styles.projects}>
        {photos.map((p, i) => {
          const num = String(i + 1).padStart(2, '0')

          if (p.side === 'full') {
            return (
              <div className={styles.fullRow} key={num}>
                {p.caption && <Caption text={p.caption} className={styles.captionFull} />}
                <Photo p={p} />
                <div className={styles.numFull}>
                  <PhotoNumber num={num} />
                </div>
              </div>
            )
          }

          return (
            <div className={`${styles.row} ${p.caption && i > 0 ? styles.groupStart : ''}`} key={num}>
              {p.side === 'left' ? (
                <>
                  <Photo p={p} />
                  <Side p={p} num={num} align="right" />
                </>
              ) : (
                <>
                  <Side p={p} num={num} align="left" />
                  <Photo p={p} />
                </>
              )}
            </div>
          )
        })}
      </section>

      <Footer />
    </PageTransition>
  )
}
