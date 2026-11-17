import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Footer from '../components/Footer'
import styles from './Contact.module.css'

const letterVariants = {
  initial: { y: 80, opacity: 0, rotateX: 90 },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3 + i * 0.04,
    },
  }),
}

const title = 'Get in Touch'

export default function Contact() {
  return (
    <PageTransition>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              initial="initial"
              animate="enter"
              custom={i}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className={styles.info}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        >
          <p><a href="mailto:erikamorrea57@gmail.com">erikamorrea57@gmail.com</a></p>
          <p><a href="https://www.instagram.com/erika_morrea/" target="_blank" rel="noreferrer">Instagram</a></p>
          <p>Anagni, FR</p>
        </motion.div>

        <motion.div
          className={styles.line}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        />
      </div>

      <Footer />
    </PageTransition>
  )
}
