import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="not-found__card">
        <p className="not-found__eyebrow">Wedding Invitation</p>
        <h1 className="not-found__title">Halaman tidak ditemukan</h1>
        <p className="not-found__description">
          Tautan undangan yang kamu buka belum tersedia atau sudah berubah.
        </p>
        <Link className="not-found__link" to="/">
          Kembali ke undangan
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
