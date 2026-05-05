

const MostVoted = ({ hasAnyVotes, mostVotedTip, maxVotes }) => {
  return (
    <section className="most-voted-section">
      <h2>🏆 Tip Más Valorado</h2>
      
      {hasAnyVotes ? (
        <div className="tip-card most-voted">
          <div className="tip-badge winner">¡Ganador!</div>
          <p className="tip-text">{mostVotedTip.text}</p>
          <div className="tip-votes">
            <span className="vote-count winner-votes">
              ⭐ {maxVotes} votos
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
  );
};

export default MostVoted;
