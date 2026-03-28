import styles from "./HeroLiquidGlass.module.css"

export default function HeroLiquidGlass() {
  return (
    <section className={styles.heroRoot} aria-labelledby="hero-title">
      <div className={styles.bgVignette} aria-hidden />

      {/* ── Hero content ── */}
      <div className={styles.contentWrap}>
        <div className={styles.roleTag} aria-label="Specialty">
          <span className={styles.roleBar} aria-hidden />
          <span className={styles.roleText}>Mid-Level Backend Engineer</span>
          <span className={styles.roleBar} aria-hidden />
        </div>

        <h1 id="hero-title" className={styles.title}>
          Steven Mendez
        </h1>

        <p className={styles.stackLine} aria-label="Core tech stack">
          Python · FastAPI · AWS · Gen AI
        </p>

        <p className={styles.subtitle}>
          Building scalable APIs, cloud infrastructure, and AI-driven applications
          with a focus on clean architecture.
        </p>

        <div className={styles.ctaGroup} role="group" aria-label="Primary actions">
          <a className={styles.ctaPrimary} href="#experience">
            View Experience
            <svg
              className={styles.ctaArrow}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 7h10M7.5 2.5l4.5 4.5-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a className={styles.ctaSecondary} href="#contact">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  )
}
