import { useMemo, useState } from 'react'
import './TemplateOne.css'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const navigationItems = [
  { href: '#logistics', label: 'Travel Logistics' },
  { href: '#registry', label: 'Registry' },
  { href: '#faq', label: 'FAQ' },
]

function TemplateOne({ data, guestName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [heroImageStatus, setHeroImageStatus] = useState({
    path: '',
    ready: false,
  })
  const weddingDate = dateFormatter.format(new Date(data.weddingDate))

  const heroBackgroundStyle = useMemo(() => {
    const isHeroImageReady =
      Boolean(data.bridePhoto) &&
      heroImageStatus.path === data.bridePhoto &&
      heroImageStatus.ready

    if (!data.bridePhoto || !isHeroImageReady) {
      return {
        backgroundImage: 'linear-gradient(135deg, #1a1a1a, #3d2b1f)',
      }
    }

    return {
      backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.28), rgba(18, 18, 18, 0.46)), url(${data.bridePhoto})`,
    }
  }, [data.bridePhoto, heroImageStatus])

  return (
    <article className="template-one">
      {data.bridePhoto ? (
        <img
          key={data.bridePhoto}
          src={data.bridePhoto}
          alt=""
          className="template-one__asset-preload"
          aria-hidden="true"
          onLoad={() =>
            setHeroImageStatus({
              path: data.bridePhoto,
              ready: true,
            })
          }
          onError={() =>
            setHeroImageStatus({
              path: data.bridePhoto,
              ready: false,
            })
          }
        />
      ) : null}

      <section
        className="template-one__hero template-one__section"
        style={heroBackgroundStyle}
      >
        <header className="template-one__nav">
          <a className="template-one__brand" href="#hero">
            {data.coupleInitials}
          </a>

          <button
            type="button"
            className="template-one__menu-button"
            aria-expanded={isMenuOpen}
            aria-label="Buka navigasi"
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
          >
            <span />
            <span />
            <span />
          </button>

          <div
            className={`template-one__nav-panel ${isMenuOpen ? 'template-one__nav-panel--open' : ''}`}
          >
            <nav className="template-one__nav-links">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a className="template-one__nav-cta" href="#faq">
              Submit RSVP
            </a>
          </div>
        </header>

        <div className="template-one__hero-body reveal" id="hero">
          <p className="template-one__hero-kicker">The Wedding Of</p>
          <h1 className="template-one__hero-title">{data.coupleName}</h1>

          <div className="template-one__hero-divider" />

          <div className="template-one__hero-meta">
            <div className="template-one__guest-card">
              <span className="template-one__guest-label">Kepada Yth.</span>
              <strong className="template-one__guest-name">{guestName}</strong>
            </div>
          </div>
        </div>

        <span className="template-one__scroll-label">Scroll To Explore</span>
        <a className="template-one__scroll-arrow" href="#logistics" aria-label="Scroll ke bawah">
          ↓
        </a>
      </section>

      <section className="template-one__section" id="logistics">
        <div className="template-one__content template-one__event-card reveal">
          <p className="template-one__eyebrow">Travel Logistics</p>
          <h2 className="template-one__section-title">{weddingDate}</h2>
          <p className="template-one__event-detail">{data.weddingTime}</p>
          <p className="template-one__event-location">{data.venue}</p>
        </div>
      </section>

      <section className="template-one__section">
        <div className="template-one__content reveal">
          <div className="template-one__couple-grid">
            <figure className="template-one__portrait-card">
              <img
                src={data.bridePhoto}
                alt={`Foto mempelai wanita ${data.coupleName}`}
              />
            </figure>
            <figure className="template-one__portrait-card">
              <img
                src={data.groomPhoto}
                alt={`Foto mempelai pria ${data.coupleName}`}
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="template-one__section">
        <div className="template-one__content reveal">
          <p className="template-one__eyebrow">Our Story</p>
          <h2 className="template-one__section-title">
            Perjalanan yang membawa kami ke hari ini
          </h2>
          <div className="template-one__timeline">
            {data.ourStory.map((storyItem) => (
              <article className="template-one__timeline-item" key={storyItem.year}>
                <span className="template-one__timeline-year">{storyItem.year}</span>
                <div className="template-one__timeline-card">
                  <h3>{storyItem.title}</h3>
                  <p>{storyItem.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="template-one__section" id="registry">
        <div className="template-one__content reveal">
          <p className="template-one__eyebrow">Registry</p>
          <h2 className="template-one__section-title">Doa Restu Anda</h2>
          <p className="template-one__supporting-copy">
            Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.
          </p>
        </div>
      </section>

      <section className="template-one__section" id="faq">
        <div className="template-one__content reveal">
          <p className="template-one__eyebrow">FAQ</p>
          <h2 className="template-one__section-title">Informasi Singkat</h2>
          <div className="template-one__faq-list">
            <article className="template-one__faq-item">
              <h3>Apakah perlu konfirmasi hadir?</h3>
              <p>Ya, mohon konfirmasi kehadiran agar kami dapat mempersiapkan dengan baik.</p>
            </article>
            <article className="template-one__faq-item">
              <h3>Apakah ada dress code?</h3>
              <p>Kami menyarankan busana formal atau semi-formal dengan warna lembut.</p>
            </article>
          </div>
        </div>
      </section>
    </article>
  )
}

export default TemplateOne
