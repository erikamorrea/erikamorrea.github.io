import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function RevealImage({ aspect = '4/5', src, label, parallax = true, position = 'center' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ['-8%', '8%'] : ['0%', '0%'])

  return (
    <div ref={ref} style={{ overflow: 'hidden', aspectRatio: aspect }}>
      <motion.div
        style={{
          width: '100%',
          height: parallax ? '120%' : '100%',
          y,
          position: 'relative',
        }}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: position,
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#444',
              fontSize: '12px',
              letterSpacing: '2px',
            }}
          >
            {label || 'PHOTO'}
          </div>
        )}
      </motion.div>
    </div>
  )
}
