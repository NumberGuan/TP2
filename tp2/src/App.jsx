import { useState, useEffect } from 'react'
import './App.css'

// Array de tips de productividad
const TIPS = [
  { id: 1, text: 'Usa la técnica Pomodoro: 25 minutos de trabajo, 5 minutos de descanso.' },
  { id: 2, text: 'Haz la tarea más difícil primero (regla de la rana).' },
  { id: 3, text: 'Desactiva las notificaciones mientras trabajas.' },
  { id: 4, text: 'Planifica tu día la noche anterior.' },
  { id: 5, text: 'Usa la regla de los 2 minutos: si algo toma menos de 2 minutos, hazlo ahora.' },
  { id: 6, text: 'Mantén tu escritorio limpio y organizado.' },
  { id: 7, text: 'Toma descansos cada 90 minutos para mantener la concentración.' },
  { id: 8, text: 'Grupo tareas similares y hazlas en bloques (batching).' },
  { id: 9, text: 'Establece límites de tiempo para cada tarea.' },
  { id: 10, text: 'Duerme bien: el descanso es fundamental para la productividad.' },
]

function App() {
  // Estado para el índice del tip actual
  const [currentIndex, setCurrentIndex] = useState(0)
  
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

  // Función para mostrar un tip aleatorio (evita repetir el mismo)
  const showRandomTip = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * TIPS.length)
    } while (newIndex === currentIndex && TIPS.length > 1)
    
    setCurrentIndex(newIndex)
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
        {/* Sección del tip actual */}
        <section className="tip-card">
          <div className="tip-badge">Tip #{currentTip.id}</div>
          <p className="tip-text">{currentTip.text}</p>
          
          <div className="tip-votes">
            <span className="vote-count">👍 {currentVotes} votos</span>
          </div>

          <div className="buttons">
            <button onClick={showRandomTip} className="btn btn-primary">
              🎲 Nuevo Tip
            </button>
            <button onClick={voteCurrentTip} className="btn btn-success">
              ⬆️ Votar Útil
            </button>
          </div>
        </section>

        {/* Sección del tip más votado */}
        <section className="most-voted-section">
          <h2>🏆 Tip Más Valorado</h2>
          
          {hasAnyVotes ? (
            <div className="tip-card most-voted">
              <div className="tip-badge winner">¡Ganador!</div>
              <p className="tip-text">{mostVoted.tip.text}</p>
              <div className="tip-votes">
                <span className="vote-count winner-votes">
                  ⭐ {mostVoted.votes} votos
                </span>
              </div>
            </div>
          ) : (
            <div className="no-votes">
              <p>📝 Todavía no hay votos.</p>
              <p>¡Vota tus tips favoritos para ver cuál es el más valorado!</p>
            </div>
          )}
        </section>

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
