import { useReveal } from '../hooks/index.js';

const PLACES = [
  {
    id: 'place-candi-singosari',
    name: 'Candi Singosari',
    image: 'assets/img/singosari/singosari-1.jpeg',
    description:
      'Situs utama peninggalan era Singhasari dengan karakter arsitektur Jawa Timur yang kuat. Area ini cocok sebagai titik awal memahami sejarah kawasan sebelum lanjut ke lokasi lain.',
    ticket: 'Gratis',
    hours: '06:00 - 17:00 WIB',
    mapsUrl: 'https://maps.google.com/?q=Candi+Singosari+Malang',
  },
  {
    id: 'place-candi-sumberawan',
    name: 'Candi Sumberawan',
    image: 'assets/img/sumberawan/sumberawan-1.jpeg',
    description:
      'Candi berbentuk stupa dengan suasana lebih tenang dan alami. Lokasinya sering dipilih untuk kunjungan santai sambil melihat sisi lain sejarah kawasan Singhasari.',
    ticket: 'Rp 10.000',
    hours: '06:00 - 17:00 WIB',
    mapsUrl: 'https://maps.google.com/?q=Candi+Sumberawan+Malang',
  },
  {
    id: 'place-museum-singhasari',
    name: 'Museum Singhasari',
    image: 'assets/img/museum/museum-4.jpeg',
    description:
      'Museum pendamping yang membantu membaca konteks situs melalui koleksi arca, fragmen, dan panel interpretasi. Bagian ini ideal sebagai penutup rute agar kunjungan lebih utuh.',
    ticket: 'Gratis',
    hours: '08:00 - 16:00 WIB',
    mapsUrl: 'https://maps.google.com/?q=Museum+Singhasari+Malang',
  },
];

export default function Places() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="places" className="places-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">Tiga Titik Utama</div>
          <h2 className="section-title">
            Rute <span className="gradient-text">Singosari</span>
          </h2>
          <p className="section-desc">
            Setiap lokasi punya karakter berbeda. Berikut penjelasan singkat untuk Candi Singosari, Candi Sumberawan, dan Museum Singhasari.
          </p>
        </div>

        <div className="places-stack">
          {PLACES.map((place) => (
            <section key={place.id} id={place.id} className="place-card">
              <img src={place.image} alt={place.name} className="place-image" loading="lazy" />
              <div className="place-content">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <div className="place-meta">
                  <span><strong>Tiket:</strong> {place.ticket}</span>
                  <span><strong>Jam:</strong> {place.hours}</span>
                </div>
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  Buka Lokasi
                </a>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
