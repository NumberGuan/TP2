import { BorderBeam } from './ui/border-beam';
import { StackedTestimonialMarquee } from './ui/testimonial-marquee';

const MostVoted = ({ hasAnyVotes, mostVotedTip, maxVotes, top5, votes }) => {
  const marqueeItems = top5?.map((tip, index) => ({
    id: tip.id,
    originalIndex: index,
    text: tip.text,
    votes: votes[tip.id]
  })) || [];

  return (
    <section className="most-voted-section">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        Tip Más Valorado
      </h2>
      
      {hasAnyVotes ? (
        <>
          <div className="tip-card most-voted">
            <BorderBeam className="card-border-beam" duration={8} size={150} colorFrom="#eab308" colorTo="#fde047" />
            <div className="tip-badge winner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              ¡Ganador!
            </div>
            <p className="tip-text">{mostVotedTip.text}</p>
            <div className="tip-votes">
              <span className="vote-count winner-votes">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                {maxVotes} votos
              </span>
            </div>
          </div>
          
          {top5 && top5.length > 0 && (
            <div className="top5-list tip-card" style={{ padding: '24px', display: 'block', gap: 'initial' }}>
              <BorderBeam className="card-border-beam" duration={8} size={150} colorFrom="#38bdf8" colorTo="#9333ea" />
              <h3 style={{ marginBottom: '16px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Top 5 Tips
              </h3>
              <StackedTestimonialMarquee items={marqueeItems} />
            </div>
          )}
        </>
      ) : (
        <div className="no-votes tip-card" style={{ border: '1px dashed rgba(255, 255, 255, 0.15)' }}>
          <BorderBeam className="card-border-beam" duration={8} size={150} colorFrom="#9ca3af" colorTo="#d1d5db" />
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
          <p>Todavía no hay votos.</p>
          <p>¡Vota tus tips favoritos para ver cuál es el más valorado!</p>
        </div>
      )}
    </section>
  );
};

export default MostVoted;
