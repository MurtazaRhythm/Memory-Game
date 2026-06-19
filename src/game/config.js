// Central game configuration: levels and card-face symbol sets.

// Difficulty levels. `cols`/`rows` define the grid; `pairs` is derived.
export const LEVELS = {
  beginner: { id: 'beginner', label: 'Beginner', cols: 4, rows: 3, pairs: 6 },
  intermediate: { id: 'intermediate', label: 'Intermediate', cols: 4, rows: 4, pairs: 8 },
  advanced: { id: 'advanced', label: 'Advanced', cols: 6, rows: 4, pairs: 12 },
}

export const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced']

// Card-face symbol sets (the required "configuration" choice).
// Each set must contain at least 12 distinct symbols (enough for Advanced = 12 pairs).
export const SYMBOL_SETS = {
  digits: {
    id: 'digits',
    label: 'Digits',
    hint: '0–9 and more',
    symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '42'],
  },
  shapes: {
    id: 'shapes',
    label: 'Shapes',
    hint: 'geometric icons',
    symbols: ['●', '▲', '■', '◆', '★', '♥', '♦', '♣', '♠', '⬟', '⬢', '✦'],
  },
  math: {
    id: 'math',
    label: 'Math symbols',
    hint: '+ − × ÷ …',
    symbols: ['+', '−', '×', '÷', '=', '≠', 'π', '√', '∞', '∑', '≈', '%'],
  },
}

export const SYMBOL_SET_ORDER = ['digits', 'shapes', 'math']
