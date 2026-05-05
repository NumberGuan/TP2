

const TipCard = ({ tip, votes, onVote, onRandomTip }) => {
  return (
    <section className="tip-card">
      <div className="tip-badge">Tip #{tip.id}</div>
      <p className="tip-text">{tip.text}</p>
      
      <div className="tip-votes">
        <span className="vote-count">👍 {votes} votos</span>
      </div>

      <div className="buttons">
        <button onClick={onRandomTip} className="btn btn-primary">
          🎲 Nuevo Tip
        </button>
        <button onClick={onVote} className="btn btn-success">
          ⬆️ Votar Útil
        </button>
      </div>
    </section>
  );
};

export default TipCard;
