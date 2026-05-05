import { useState, useEffect } from 'react'
import TipCard from './components/TipCard'
import MostVoted from './components/MostVoted'
import './App.css'

function App() {
  // Array de tips de productividad definido dentro del componente principal
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

  // Estado para el índice del tip actual
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Historial de los últimos tips para evitar que se repitan seguido
  const [history, setHistory] = useState([0])

  // Estado para los votos (objeto con id del tip como clave)
  const [votes, setVotes] = useState(() => {
    // Cargar desde localStorage al iniciar
    const saved = localStorage.getItem('productivityVotes')
    if (saved) {
      return JSON.parse(saved)
    }
    // Inicializar con 0 votos para cada tip
    const initialVotes = {}
    TIPS.forEach(tip => {
      initialVotes[tip.id] = 0
    })
    return initialVotes
  })

  // Guardar en localStorage cuando cambian los votos
  useEffect(() => {
    localStorage.setItem('productivityVotes', JSON.stringify(votes))
  }, [votes])

  // Función para mostrar un tip aleatorio (evita repetir los recientes)
  const showRandomTip = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * TIPS.length)
    } while (history.includes(newIndex) && TIPS.length > history.length)
    
    setCurrentIndex(newIndex)
    setHistory(prev => {
      const newHistory = [...prev, newIndex]
      // Recordar los últimos 4 tips (evita que se repitan en el corto plazo)
      if (newHistory.length > 4) newHistory.shift()
      return newHistory
    })
  }

  // Función para votar el tip actual
  const voteCurrentTip = () => {
    const tipId = TIPS[currentIndex].id
    // Crear copia del objeto de votos y actualizar
    setVotes(prevVotes => ({
      ...prevVotes,
      [tipId]: prevVotes[tipId] + 1
    }))
  }

  // Función para reiniciar todos los votos
  const resetVotes = () => {
    const resetVotes = {}
    TIPS.forEach(tip => {
      resetVotes[tip.id] = 0
    })
    setVotes(resetVotes)
  }

  // Encontrar el tip más votado
  const getMostVotedTip = () => {
    let maxVotes = -1
    let mostVoted = null

    TIPS.forEach(tip => {
      if (votes[tip.id] > maxVotes) {
        maxVotes = votes[tip.id]
        mostVoted = tip
      }
    })

    return { tip: mostVoted, votes: maxVotes }
  }

  const mostVoted = getMostVotedTip()
  const currentTip = TIPS[currentIndex]
  const currentVotes = votes[currentTip.id]
  const hasAnyVotes = Object.values(votes).some(v => v > 0)

  return (
    <div className="app">
      <header className="header">
        <h1>💡 Tips de Productividad</h1>
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
          mostVotedTip={mostVoted.tip}
          maxVotes={mostVoted.votes}
        />

        {/* Botón para reiniciar votos */}
        <button onClick={resetVotes} className="btn btn-danger reset-btn">
          🔄 Reiniciar Votos
        </button>
      </main>

      <footer className="footer">
        <p>Hecho con React + Vite</p>
      </footer>
    </div>
  )
}

export default App
