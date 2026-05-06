import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InvitationPage from './pages/InvitationPage'
import NotFoundPage from './pages/NotFoundPage'
import PreviewPage from './pages/PreviewPage'
import TemplatePage from './pages/TemplatePage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <main className="page-shell page-shell--centered">
            <section className="status-card">
              <p className="status-card__eyebrow">Loading Template</p>
              <h1 className="status-card__title">Menyiapkan preview undangan</h1>
            </section>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<TemplatePage />} />
          <Route path="/preview/:templateId" element={<PreviewPage />} />
          <Route path="/inv/:token" element={<InvitationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
