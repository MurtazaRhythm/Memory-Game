import { useGame } from './game/useGame.js'
import { LEVELS } from './game/config.js'
import SetupScreen from './components/SetupScreen.jsx'
import Board from './components/Board.jsx'
import HUD from './components/HUD.jsx'
import EndScreen from './components/EndScreen.jsx'

export default function App() {
  const game = useGame()
  const totalPairs = LEVELS[game.levelId].pairs

  return (
    <div className="app">
      <main className="stage">
        {game.phase === 'setup' && (
          <SetupScreen
            levelId={game.levelId}
            symbolSetId={game.symbolSetId}
            onLevelChange={game.setLevelId}
            onSymbolSetChange={game.setSymbolSetId}
            onStart={() => game.startGame(game.levelId, game.symbolSetId)}
          />
        )}

        {game.phase === 'playing' && (
          <div className="play">
            <HUD
              moves={game.moves}
              matchedPairs={game.matchedPairs}
              totalPairs={totalPairs}
              elapsedMs={game.elapsedMs}
              onRestart={() => game.startGame(game.levelId, game.symbolSetId)}
              onQuit={game.goToSetup}
            />
            <Board
              cards={game.cards}
              levelId={game.levelId}
              onFlip={game.flipCard}
              locked={game.locked}
            />
          </div>
        )}

        {game.phase === 'won' && (
          <EndScreen
            levelId={game.levelId}
            moves={game.moves}
            elapsedMs={game.elapsedMs}
            onPlayAgain={() => game.startGame(game.levelId, game.symbolSetId)}
            onChangeSettings={game.goToSetup}
          />
        )}
      </main>

      <footer className="footer">
        <span>Mind Match · SEG3125 Assignment 3</span>
      </footer>
    </div>
  )
}
