import { LEVELS } from '../game/config.js'

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000)
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0')
  const s = String(totalSec % 60).padStart(2, '0')
  return `${m}:${s}`
}

// Simple star rating: fewer moves relative to perfect play = more stars.
function getStars(moves, pairs) {
  const ratio = moves / pairs // 1.0 = perfect
  if (ratio <= 1.4) return 3
  if (ratio <= 2.0) return 2
  return 1
}

export default function EndScreen({ levelId, moves, elapsedMs, onPlayAgain, onChangeSettings }) {
  const pairs = LEVELS[levelId].pairs
  const stars = getStars(moves, pairs)

  return (
    <section className="end" aria-labelledby="end-title">
      <div className="end-card">
        <p className="end-eyebrow">{LEVELS[levelId].label} complete</p>
        <h1 className="end-title" id="end-title">
          You matched them all! 🎉
        </h1>

        <div className="stars" aria-label={`${stars} out of 3 stars`}>
          {[1, 2, 3].map((n) => (
            <span key={n} className={`star ${n <= stars ? 'filled' : ''}`} aria-hidden="true">
              ★
            </span>
          ))}
        </div>

        <div className="end-stats">
          <div className="stat">
            <span className="stat-value">{formatTime(elapsedMs)}</span>
            <span className="stat-label">Time</span>
          </div>
          <div className="stat">
            <span className="stat-value">{moves}</span>
            <span className="stat-label">Moves</span>
          </div>
          <div className="stat">
            <span className="stat-value">{pairs}</span>
            <span className="stat-label">Pairs</span>
          </div>
        </div>

        <div className="end-actions">
          <button type="button" className="btn btn-primary" onClick={onPlayAgain}>
            Play again
          </button>
          <button type="button" className="btn btn-ghost" onClick={onChangeSettings}>
            Change settings
          </button>
        </div>
      </div>
    </section>
  )
}
