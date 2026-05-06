import { useParams } from 'react-router-dom'
import { templateRegistry } from '../config/templateRegistry'
import invitationData from '../mock/invitationData.json'

function PreviewPage() {
  const { templateId } = useParams()

  if (!templateId) {
    return (
      <main className="page-shell page-shell--centered">
        <section className="status-card">
          <p className="status-card__eyebrow">Template Tidak Ditemukan</p>
          <h1 className="status-card__title">Template tidak ditemukan</h1>
        </section>
      </main>
    )
  }

  const templateConfig = templateRegistry[templateId]

  if (!templateConfig) {
    return (
      <main className="page-shell page-shell--centered">
        <section className="status-card">
          <p className="status-card__eyebrow">Coming Soon</p>
          <h1 className="status-card__title">Template tidak ditemukan</h1>
          <p>
            Template <strong>{templateId}</strong> belum tersedia untuk preview.
          </p>
        </section>
      </main>
    )
  }

  const TemplateComponent = templateConfig.component

  return (
    <main className="app-shell">
      <TemplateComponent
        data={invitationData}
        guestName={invitationData.guestName}
      />
    </main>
  )
}

export default PreviewPage
