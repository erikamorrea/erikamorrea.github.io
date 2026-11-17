import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 })

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const addHover = () => setHovered(true)
    const removeHover = () => setHovered(false)

    window.addEventListener('mousemove', move)

    const watch = () => {
      document.querySelectorAll('a, button, .cursor-hover').forEach((el) => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }

    watch()
    const observer = new MutationObserver(watch)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [visible])

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        zIndex: 9999,
        pointerEvents: 'none',
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          width: hovered ? 48 : 12,
          height: hovered ? 48 : 12,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          borderRadius: '50%',
          border: '1.5px solid #111',
          background: hovered ? 'rgba(17,17,17,0.08)' : 'rgba(17,17,17,0.6)',
          mixBlendMode: 'difference',
        }}
      />
    </motion.div>
  )
}
