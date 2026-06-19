import { memo } from 'react'

function Card({ card, onFlip, disabled }) {
  const faceUp = card.isFlipped || card.isMatched

  const handleClick = () => {
    if (disabled || faceUp) return
    onFlip(card.id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <button
      type="button"
      className={`card ${faceUp ? 'is-up' : ''} ${card.isMatched ? 'is-matched' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled && !faceUp}
      aria-label={faceUp ? `Card showing ${card.symbol}` : 'Face-down card'}
      aria-pressed={faceUp}
    >
      <span className="card-inner">
        <span className="card-face card-back" aria-hidden="true">
          ?
        </span>
        <span className="card-face card-front" aria-hidden={!faceUp}>
          {card.symbol}
        </span>
      </span>
    </button>
  )
}

// Memoized: with a stable onFlip the board's 24 cards skip re-render on timer ticks.
export default memo(Card)
