import { useState, useEffect } from 'react'
import TipCard from './components/TipCard'
import MostVoted from './components/MostVoted'
import './App.css'

function App() {
  const TIPS = [
    { id: 1, text: 'Los 3 metodos de hashing: inserción, eliminación, validación.' },
    { id: 2, text: 'El monje sabe por viejo y el sabio sabe por que lo hace o algo asi decia el dicho no me acuerdo' },
    { id: 3, text: 'No se que poner en esta linea.' },
    { id: 4, text: 'El reloj suizo, el auto aleman, la mujer paraguaya.' },
    { id: 5, text: 'La vida sin problemas es matar el tiempo a lo bobo.' },
    { id: 6, text: 'Una de carne, dos de choclo, dos de pollo, 1 de carne, 2 de carne, 3 de choclo.' },
    { id: 7, text: 'Toma descansos cada 90 minutos para mantener la concentración.' },
    { id: 8, text: 'Grupo tareas similares y hazlas en bloques (batching).' },
    { id: 9, text: 'Establece límites de tiempo para cada tarea.' },
    { id: 10, text: 'Duerme bien: el descanso es fundamental para la productividad.' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [history, setHistory] = useState([0])

  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem('productivityVotes')
    if (saved) {
      return JSON.parse(saved)
    }
    const initialVotes = {}
    TIPS.forEach(tip => {
      initialVotes[tip.id] = 0
    })
    return initialVotes
  })

  useEffect(() => {
    localStorage.setItem('productivityVotes', JSON.stringify(votes))
  }, [votes])

  const showRandomTip = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * TIPS.length)
    } while (history.includes(newIndex) && TIPS.length > history.length)

    setCurrentIndex(newIndex)
    setHistory(prev => {
      const newHistory = [...prev, newIndex]
      if (newHistory.length > 4) newHistory.shift()
      return newHistory
    })
  }

  const voteCurrentTip = () => {
    const tipId = TIPS[currentIndex].id
    setVotes(prevVotes => ({
      ...prevVotes,
      [tipId]: prevVotes[tipId] + 1
    }))
  }

  const resetVotes = () => {
    const resetVotes = {}
    TIPS.forEach(tip => {
      resetVotes[tip.id] = 0
    })
    setVotes(resetVotes)
  }

  const getTopTips = () => {
    const sortedTips = [...TIPS].sort((a, b) => votes[b.id] - votes[a.id])
    const top3 = sortedTips.filter(tip => votes[tip.id] > 0).slice(0, 3)
    const mostVoted = top3.length > 0 ? top3[0] : null
    const maxVotes = mostVoted ? votes[mostVoted.id] : 0
    return { mostVoted, maxVotes, top3 }
  }

  const { mostVoted, maxVotes, top3 } = getTopTips()
  const currentTip = TIPS[currentIndex]
  const currentVotes = votes[currentTip.id]
  const hasAnyVotes = top3.length > 0

  return (
    <div className="app">
      <header className="header">
        <div className="header-title-wrapper">
          <svg className="header-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
          <h1>Tips de Productividad</h1>
        </div>
        <p>Descubre consejos para mejorar tu productividad</p>
      </header>

      <main className="main">
        {/* Componente del tip actual */}
        <TipCard
          tip={currentTip}
          votes={currentVotes}
          onVote={voteCurrentTip}
          onRandomTip={showRandomTip}
        />

        {/* Componente del tip más votado */}
        <MostVoted
          hasAnyVotes={hasAnyVotes}
          mostVotedTip={mostVoted}
          maxVotes={maxVotes}
          top3={top3}
          votes={votes}
        />

        {/* Botón para reiniciar votos */}
        <button onClick={resetVotes} className="btn btn-danger reset-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          Reiniciar Votos
        </button>
      </main>

      <footer className="footer">
        <p>Hecho con React + Vite</p>
      </footer>
    </div>
  )
}

export default App
