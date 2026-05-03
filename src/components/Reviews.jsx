const reviews = [
  { name: 'Nabila R.', rating: 5, text: 'Tempatnya tenang dan bersejarah. Penjelasan tentang masa Singhasari sangat membantu.' },
  { name: 'Aditya P.', rating: 5, text: 'Arca Dwarapala-nya ikonik banget. Cocok untuk wisata edukasi bareng keluarga.' },
  { name: 'Fauzan M.', rating: 4, text: 'Akses mudah dari Kota Malang. Area bersih dan spot foto bagus.' },
];

export default function Reviews() {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">⭐ Ulasan Pengunjung</div>
          <h2 className="section-title">Review <span className="gradient-text">Candi Singosari</span></h2>
          <p className="section-desc">Ringkasan pengalaman pengunjung dari kunjungan budaya di kawasan Singosari.</p>
        </div>
        <div className="visit-grid">
          {reviews.map((review) => (
            <article key={review.name} className="visit-info-card">
              <h3>{review.name}</h3>
              <p style={{ marginBottom: '0.75rem', color: 'var(--clr-primary)' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
              <p>{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
