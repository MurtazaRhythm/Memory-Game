import { LEVELS, SYMBOL_SETS } from './config.js'

// Fisher–Yates shuffle (returns a new array).
function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a shuffled deck for the given level + symbol set.
// Each card: { id, symbol, isFlipped, isMatched }
export function buildDeck(levelId, symbolSetId) {
  const level = LEVELS[levelId]
  const set = SYMBOL_SETS[symbolSetId]

  if (level.pairs > set.symbols.length) {
    throw new Error(
      `Symbol set "${symbolSetId}" has ${set.symbols.length} symbols but level ` +
        `"${levelId}" needs ${level.pairs}. Add more symbols or lower the level's pairs.`,
    )
  }

  const chosen = set.symbols.slice(0, level.pairs)

  const cards = []
  chosen.forEach((symbol, pairIndex) => {
    for (let copy = 0; copy < 2; copy++) {
      cards.push({
        id: `${pairIndex}-${copy}`,
        symbol,
        isFlipped: false,
        isMatched: false,
      })
    }
  })

  return shuffle(cards)
}
