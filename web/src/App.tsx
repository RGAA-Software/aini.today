import { useEffect, useState } from 'react'

type ApiState = 'checking' | 'ready' | 'unavailable'

const shelves = [
  { level: 'Starter', note: 'First words and warm little moments', color: 'mint' },
  { level: 'Level 1', note: 'Simple adventures with familiar friends', color: 'leaf' },
  { level: 'Level 2', note: 'Longer stories for curious readers', color: 'forest' },
]

export function App() {
  const [apiState, setApiState] = useState<ApiState>('checking')

  useEffect(() => {
    fetch('/api/health')
      .then((response) => setApiState(response.ok ? 'ready' : 'unavailable'))
      .catch(() => setApiState('unavailable'))
  }, [])

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="AINI home">
          <span className="brand-mark">A</span>
          <span>AINI</span>
        </a>
        <div className="nav-links">
          <a href="#library">Library</a>
          <a href="#about">About</a>
          <button type="button">Sign in</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Graded English stories</p>
          <h1>Small stories.<br />Big discoveries.</h1>
          <p className="intro">
            Thoughtful adventures, friendly characters, and English that grows one page at a time.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#library">Explore stories</a>
            <a className="secondary" href="#about">How levels work</a>
          </div>
        </div>

        <div className="story-window" aria-label="A green field illustration">
          <div className="sun" />
          <div className="cloud cloud-one" />
          <div className="cloud cloud-two" />
          <div className="hill hill-back" />
          <div className="hill hill-front" />
          <div className="tree"><span /><span /><span /></div>
          <div className="path" />
          <div className="book-card">
            <span>New adventure</span>
            <strong>Mia &amp; Pip</strong>
            <small>The Winter Lantern</small>
          </div>
        </div>
      </section>

      <section className="library" id="library">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Find your next story</p>
            <h2>A shelf for every reader</h2>
          </div>
          <span className={`api-status ${apiState}`}>
            <i /> API {apiState === 'ready' ? 'connected' : apiState}
          </span>
        </div>

        <div className="shelves">
          {shelves.map((shelf, index) => (
            <article className={`shelf ${shelf.color}`} key={shelf.level}>
              <span className="shelf-number">0{index + 1}</span>
              <h3>{shelf.level}</h3>
              <p>{shelf.note}</p>
              <a href="/library">Browse level <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="promise" id="about">
        <p>Made for steady progress</p>
        <h2>Read. Listen. Wonder. Come back tomorrow.</h2>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} AINI</span>
        <span>English stories for growing minds.</span>
      </footer>
    </main>
  )
}
