import { Link } from 'react-router-dom'
import { templateGallery } from '../config/templateRegistry'

function TemplatePage() {
  return (
    <main className="page-shell">
      <section className="template-gallery">
        <header className="template-gallery__hero">
          <p className="template-gallery__eyebrow">Template Gallery</p>
          <h1 className="template-gallery__title">Wedding Invitation Templates</h1>
          <p className="template-gallery__subtitle">
            Pilih desain undangan yang ingin dipreview. Struktur ini siap
            diperluas untuk banyak template berikutnya.
          </p>
        </header>

        <section className="template-gallery__grid">
          {templateGallery.map((template) => (
            <article className="template-card" key={template.id}>
              <div
                className="template-card__preview"
                style={{ '--template-accent': template.accent }}
              >
                <span className="template-card__badge">Preview</span>
              </div>

              <div className="template-card__body">
                <h2 className="template-card__title">{template.name}</h2>
                <p className="template-card__text">{template.description}</p>
                <Link
                  className="template-card__link"
                  to={`/preview/${template.id}`}
                >
                  Lihat Preview
                </Link>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}

export default TemplatePage
