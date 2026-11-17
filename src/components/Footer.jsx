import RevealText from './RevealText'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <RevealText>
          <span className={styles.name}>Erika Morrea</span>
        </RevealText>
        <RevealText delay={0.1}>
          <span className={styles.location}>Anagni, FR</span>
        </RevealText>
      </div>
      <div className={styles.bottom}>
        <RevealText delay={0.2}>
          <a href="mailto:erikamorrea57@gmail.com" className={styles.link}>Email</a>
        </RevealText>
        <RevealText delay={0.3}>
          <a href="https://www.instagram.com/erika_morrea/" target="_blank" rel="noreferrer" className={styles.link}>Instagram</a>
        </RevealText>
      </div>
    </footer>
  )
}
