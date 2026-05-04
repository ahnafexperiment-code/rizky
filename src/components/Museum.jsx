import { useReveal } from '../hooks/index.js';
import { museumGallery, museumHighlights } from '../data/content.js';

export default function Museum() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="museum" className="museum-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">Museum Singhasari</div>
          <h2 className="section-title">
            Ruang Baca <span className="gradient-text">Setelah Situs</span>
          </h2>
          <p className="section-desc">
            Museum Singhasari menutup rute dengan konteks: artefak, panel sejarah, dan detail yang tidak selalu terbaca langsung di lapangan.
          </p>
        </div>

        <div className="museum-highlights">
          {museumHighlights.map((item) => (
            <article key={item.id} className="museum-card">
              <img src={item.img} alt={item.title} loading="lazy" className="museum-card-image" />
              <div className="museum-card-body">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="museum-strip" aria-label="Museum Singhasari photo gallery">
          {museumGallery.map((img, index) => (
            <div key={img} className={`museum-strip-item${index === 0 ? ' featured' : ''}`}>
              <img src={img} alt={`Museum Singhasari ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
