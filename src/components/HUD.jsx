function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000)
  const m = String(Math.floor(totalSec / 60)).padStart(2, '0')
  const s = String(totalSec % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function HUD({ moves, matchedPairs, totalPairs, elapsedMs, onRestart, onQuit }) {
  return (
    <div className="hud">
      <div className="hud-stats" role="status" aria-live="polite">
        <div className="stat">
          <span className="stat-value">{formatTime(elapsedMs)}</span>
          <span className="stat-label">Time</span>
        </div>
        <div className="stat">
          <span className="stat-value">{moves}</span>
          <span className="stat-label">Moves</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {matchedPairs}/{totalPairs}
          </span>
          <span className="stat-label">Pairs</span>
        </div>
      </div>
      <div className="hud-actions">
        <button type="button" className="btn btn-ghost" onClick={onRestart}>
          ↻ Restart
        </button>
        <button type="button" className="btn btn-ghost" onClick={onQuit}>
          ⚙ Change settings
        </button>
      </div>
    </div>
  )
}
