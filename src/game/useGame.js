import { useCallback, useEffect, useReducer, useState } from 'react'
import { buildDeck } from './deck.js'
import { LEVELS } from './config.js'

// Phases: 'setup' (choosing options) | 'playing' | 'won'
const initialState = {
  phase: 'setup',
  levelId: 'beginner',
  symbolSetId: 'digits',
  cards: [],
  flippedIds: [], // up to 2 unmatched, face-up cards
  moves: 0,
  matchedPairs: 0,
  locked: false, // input lock during mismatch flip-back
  startedAt: null, // ms timestamp of first flip
  endedAt: null, // ms timestamp of win
}

// Pure reducer: every transition is computed from the latest state, so there
// are no stale-closure races even under rapid clicks.
function reducer(state, action) {
  switch (action.type) {
    case 'SET_LEVEL':
      return { ...state, levelId: action.levelId }

    case 'SET_SYMBOL_SET':
      return { ...state, symbolSetId: action.symbolSetId }

    case 'START_GAME':
      return {
        ...initialState,
        levelId: action.levelId,
        symbolSetId: action.symbolSetId,
        cards: action.cards,
        phase: 'playing',
      }

    case 'GO_TO_SETUP':
      return { ...state, phase: 'setup', flippedIds: [], locked: false, startedAt: null, endedAt: null }

    case 'FLIP': {
      if (state.locked || state.phase !== 'playing') return state
      const card = state.cards.find((c) => c.id === action.cardId)
      if (!card || card.isFlipped || card.isMatched) return state
      if (state.flippedIds.includes(action.cardId) || state.flippedIds.length === 2) return state

      const startedAt = state.startedAt ?? Date.now()
      const cards = state.cards.map((c) =>
        c.id === action.cardId ? { ...c, isFlipped: true } : c,
      )
      const flippedIds = [...state.flippedIds, action.cardId]

      // First of a pair: just reveal it.
      if (flippedIds.length < 2) {
        return { ...state, cards, flippedIds, startedAt }
      }

      // Second of a pair: evaluate.
      const [aId, bId] = flippedIds
      const a = cards.find((c) => c.id === aId)
      const b = cards.find((c) => c.id === bId)
      const moves = state.moves + 1

      if (a.symbol === b.symbol) {
        const matchedCards = cards.map((c) =>
          c.id === aId || c.id === bId ? { ...c, isMatched: true } : c,
        )
        const matchedPairs = state.matchedPairs + 1
        const won = matchedPairs === LEVELS[state.levelId].pairs
        return {
          ...state,
          cards: matchedCards,
          flippedIds: [],
          moves,
          matchedPairs,
          startedAt,
          phase: won ? 'won' : 'playing',
          endedAt: won ? Date.now() : null,
        }
      }

      // Mismatch: keep both face-up and lock; a timer effect resolves the flip-back.
      return { ...state, cards, flippedIds, moves, startedAt, locked: true }
    }

    case 'RESOLVE_MISMATCH': {
      if (!state.locked) return state
      const [aId, bId] = state.flippedIds
      const cards = state.cards.map((c) =>
        c.id === aId || c.id === bId ? { ...c, isFlipped: false } : c,
      )
      return { ...state, cards, flippedIds: [], locked: false }
    }

    default:
      return state
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [elapsedMs, setElapsedMs] = useState(0)

  // Stable action creators (dispatch identity is stable) → memoized children
  // never re-render just because the timer ticked.
  const startGame = useCallback((levelId, symbolSetId) => {
    dispatch({ type: 'START_GAME', levelId, symbolSetId, cards: buildDeck(levelId, symbolSetId) })
  }, [])
  const goToSetup = useCallback(() => dispatch({ type: 'GO_TO_SETUP' }), [])
  const flipCard = useCallback((cardId) => dispatch({ type: 'FLIP', cardId }), [])
  const setLevelId = useCallback((levelId) => dispatch({ type: 'SET_LEVEL', levelId }), [])
  const setSymbolSetId = useCallback(
    (symbolSetId) => dispatch({ type: 'SET_SYMBOL_SET', symbolSetId }),
    [],
  )

  // Resolve a mismatch after a short delay. The cleanup cancels the pending
  // flip-back if the game is restarted/quit mid-lock, so a stale timeout can
  // never corrupt a fresh deck.
  useEffect(() => {
    if (!state.locked) return undefined
    const t = setTimeout(() => dispatch({ type: 'RESOLVE_MISMATCH' }), 900)
    return () => clearTimeout(t)
  }, [state.locked])

  // Timer: the display only needs seconds, so tick at 250ms instead of per-frame.
  useEffect(() => {
    if (state.phase !== 'playing' || state.startedAt == null) {
      if (state.startedAt == null) setElapsedMs(0)
      return undefined
    }
    setElapsedMs(Date.now() - state.startedAt)
    const id = setInterval(() => setElapsedMs(Date.now() - state.startedAt), 250)
    return () => clearInterval(id)
  }, [state.phase, state.startedAt])

  // Lock in the exact final time on win (interval could be up to 250ms stale).
  useEffect(() => {
    if (state.phase === 'won' && state.startedAt != null && state.endedAt != null) {
      setElapsedMs(state.endedAt - state.startedAt)
    }
  }, [state.phase, state.startedAt, state.endedAt])

  return {
    phase: state.phase,
    levelId: state.levelId,
    symbolSetId: state.symbolSetId,
    cards: state.cards,
    moves: state.moves,
    matchedPairs: state.matchedPairs,
    locked: state.locked,
    elapsedMs,
    setLevelId,
    setSymbolSetId,
    startGame,
    goToSetup,
    flipCard,
  }
}
