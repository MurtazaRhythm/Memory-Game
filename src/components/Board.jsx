import Card from './Card.jsx'
import { LEVELS } from '../game/config.js'

export default function Board({ cards, levelId, onFlip, locked }) {
  const cols = LEVELS[levelId].cols

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      role="group"
      aria-label="Memory game board"
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onFlip={onFlip} disabled={locked} />
      ))}
    </div>
  )
}
