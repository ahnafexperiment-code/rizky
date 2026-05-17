export default function SitePage({ site }) {
  if (!site) return null;

  return (
    <main className="site-page">
      <section className="site-page-hero">
        <div className="container">
          <a href="#/" className="btn btn-ghost btn-sm">Kembali ke Beranda</a>
          <div className="site-page-head">
            <h1>{site.name}</h1>
            <p>{site.longStory}</p>
            {site.storyBlocks?.map((paragraph) => (
              <p key={paragraph} className="site-page-story-block">{paragraph}</p>
            ))}
          </div>
          <img src={site.image} alt={site.name} className="site-page-main-image" />
        </div>
      </section>

      <section className="site-page-section">
        <div className="container">
          <h2 className="subsection-title">Artefak dan Sorotan</h2>
          <div className="site-page-artifacts">
            {site.artifacts.map((item) => (
              <article key={item} className="site-page-artifact-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-page-section">
        <div className="container">
          <h2 className="subsection-title">Galeri</h2>
          <div className="site-page-gallery">
            {site.gallery.map((img) => (
              <img key={img} src={img} alt={site.name} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="site-page-section">
        <div className="container">
          <h2 className="subsection-title">Informasi Kunjungan</h2>
          <div className="site-page-meta">
            <p><strong>Harga tiket:</strong> {site.ticket}</p>
            <p><strong>Jam buka:</strong> {site.hours}</p>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              Buka Google Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
