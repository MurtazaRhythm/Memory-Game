import { LEVELS, LEVEL_ORDER, SYMBOL_SETS, SYMBOL_SET_ORDER } from '../game/config.js'

export default function SetupScreen({
  levelId,
  symbolSetId,
  onLevelChange,
  onSymbolSetChange,
  onStart,
}) {
  return (
    <section className="setup" aria-labelledby="setup-title">
      <header className="setup-header">
        <h1 className="title" id="setup-title">
          Mind Match
        </h1>
        <p className="tagline">Flip. Remember. Match.</p>
      </header>

      <div className="setup-group">
        <h2 className="group-label">Choose a level</h2>
        <div className="option-row" role="radiogroup" aria-label="Difficulty level">
          {LEVEL_ORDER.map((id) => {
            const lvl = LEVELS[id]
            const active = id === levelId
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`option-card ${active ? 'is-selected' : ''}`}
                onClick={() => onLevelChange(id)}
              >
                <span className="option-title">{lvl.label}</span>
                <span className="option-sub">
                  {lvl.cols}×{lvl.rows} · {lvl.pairs} pairs
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="setup-group">
        <h2 className="group-label">Choose card faces</h2>
        <div className="option-row" role="radiogroup" aria-label="Card face set">
          {SYMBOL_SET_ORDER.map((id) => {
            const set = SYMBOL_SETS[id]
            const active = id === symbolSetId
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`option-card ${active ? 'is-selected' : ''}`}
                onClick={() => onSymbolSetChange(id)}
              >
                <span className="option-preview" aria-hidden="true">
                  {set.symbols.slice(0, 3).join(' ')}
                </span>
                <span className="option-title">{set.label}</span>
                <span className="option-sub">{set.hint}</span>
              </button>
            )
          })}
        </div>
      </div>

      <button type="button" className="btn btn-primary btn-start" onClick={() => onStart()}>
        Start game →
      </button>
    </section>
  )
}
