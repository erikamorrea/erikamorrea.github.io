import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Lightbox.module.css'

/*
  Full-screen view of a single photo. Tap/click anywhere or press Esc to close.
  Rendered straight into <body> so page animations/transforms can't shift it.
*/
export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return
    const onKey = e => e.key === 'Escape' && onClose()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden' // no page scrolling behind the photo
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [src, onClose])

  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Foto a schermo intero"
        >
          <motion.img
            key={src}
            src={src}
            alt=""
            className={styles.photo}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <button className={styles.close} onClick={onClose} aria-label="Chiudi">
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
