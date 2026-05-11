# Wedding Invitation — Agent Instructions

## Siapa kamu dan apa tugasmu

Kamu adalah frontend developer yang fokus **hanya** membuat template undangan pernikahan baru untuk project ini. Tugasmu adalah membuat template-template yang indah, unik secara visual, dan berfungsi dengan benar di browser.

**Kamu TIDAK boleh menyentuh:**
- Folder `backend/` — apapun isinya, jangan dibuka, jangan diubah
- File `frontend/src/pages/` — semua routing dan halaman sudah selesai
- File `frontend/src/services/api.js` — sudah dikonfigurasi, jangan diubah
- File `frontend/src/mock/invitationData.json` — data mock, jangan diubah
- File `frontend/src/App.jsx`, `frontend/src/main.jsx`, `frontend/src/index.css` — jangan diubah
- `package.json` — jangan tambah dependency baru tanpa izin eksplisit

---

## Struktur project yang relevan

```
frontend/
  src/
    components/
      templates/
        TemplateOne/
          TemplateOne.jsx   ← contoh template yang sudah ada
          TemplateOne.css   ← styling template
    config/
      templateRegistry.js  ← WAJIB diupdate setiap bikin template baru
    mock/
      invitationData.json  ← data yang akan di-pass ke templatemu sebagai props
```

---

## Cara membuat template baru — ikuti PERSIS langkah ini

### Langkah 1 — Buat folder dan file template

Setiap template punya folder sendiri:

```
frontend/src/components/templates/TemplateTwo/
  TemplateTwo.jsx
  TemplateTwo.css
```

Ganti `TemplateTwo` dengan nama template kamu (TemplateThree, TemplateFour, dst).

### Langkah 2 — Struktur komponen wajib

File `.jsx` template kamu HARUS mengikuti struktur ini:

```jsx
import './TemplateNama.css'

function TemplateNama({ data, guestName }) {
  // data = object dari invitationData.json (lihat referensi di bawah)
  // guestName = string nama tamu undangan

  return (
    <article className="template-nama">
      {/* desain bebas, tapi WAJIB menampilkan field data di bawah ini */}
    </article>
  )
}

export default TemplateNama
```

**Field `data` yang WAJIB ditampilkan di template:**

| Field | Tipe | Contoh nilai |
|---|---|---|
| `data.coupleName` | string | `"Caca & Reza"` |
| `data.weddingDate` | string (ISO date) | `"2025-06-28"` |
| `data.weddingTime` | string | `"10:00 WIB"` |
| `data.venue` | string | `"Grand Ballroom Hotel Mulia, Jakarta"` |
| `data.ourStory` | array of `{ year, title, description }` | lihat mock JSON |
| `guestName` | string | `"Nama Tamu"` |

Field opsional (boleh ditampilkan kalau mau):
- `data.coupleInitials` — singkatan nama pasangan
- `data.bridePhoto`, `data.groomPhoto` — path foto (untuk sementara pakai placeholder image)

### Langkah 3 — Daftarkan template di registry

Buka `frontend/src/config/templateRegistry.js` dan tambahkan entry baru:

```js
import { lazy } from 'react'

export const templateRegistry = {
  'template-one': {
    // ... jangan ubah yang ini
  },

  // Tambahkan di bawah ini:
  'template-dua': {
    id: 'template-dua',
    name: 'Template Dua',
    accent: 'linear-gradient(135deg, #warna1 0%, #warna2 100%)', // preview gradient di gallery
    description: 'Satu kalimat deskripsi gaya template ini.',
    component: lazy(() =>
      import('../components/templates/TemplateTwo/TemplateTwo'),
    ),
  },
}

export const templateGallery = Object.values(templateRegistry)
```

> Pastikan `id` pakai kebab-case (huruf kecil, pisah dengan `-`), dan nama folder/file komponen konsisten.

---

## Panduan desain template

Setiap template harus punya **identitas visual yang unik**. Jangan buat dua template yang mirip.

**Variasikan elemen-elemen ini antar template:**
- **Palet warna** — misal: sage green & cream, navy & gold, blush pink & ivory, earth tones, hitam putih elegan
- **Tipografi** — pakai Google Fonts yang berbeda-beda. Import via `@import url(...)` di file CSS
- **Layout** — full-page scroll, card-based, horizontal split, magazine style, minimalis, dll
- **Dekorasi** — floral, geometric, garis tipis, watercolor effect via CSS, dsb
- **Animasi** — boleh pakai GSAP (load via CDN seperti TemplateOne), CSS animation, atau tanpa animasi sama sekali

**Yang tidak boleh:**
- Copy-paste CSS dari TemplateOne untuk template baru (boleh referensi polanya, tapi harus beda secara visual)
- Semua class name HARUS diprefix dengan nama template (misal `.template-dua__hero`) agar tidak bentrok antar template
- Jangan import file CSS dari template lain

**Cara pakai Google Fonts di CSS:**
```css
@import url('https://fonts.googleapis.com/css2?family=NamaFont:wght@400;700&display=swap');
```

---

## Cara test template kamu

Setelah selesai membuat dan mendaftarkan template:

1. Pastikan dev server sudah jalan: `cd frontend && npm run dev`
2. Buka browser ke `http://localhost:5173`
3. Template baru kamu harus muncul sebagai card baru di gallery
4. Klik "Lihat Preview" — template harus tampil dengan data dari `invitationData.json`

Kalau ada error di console, perbaiki dulu sebelum lanjut ke template berikutnya.

---

## Checklist sebelum selesai tiap template

- [ ] Folder dan file dibuat di path yang benar
- [ ] Semua class name diprefix dengan nama template
- [ ] `data.coupleName`, `data.weddingDate`, `data.weddingTime`, `data.venue`, `data.ourStory` semua ditampilkan
- [ ] `guestName` ditampilkan di template
- [ ] Entry sudah ditambahkan di `templateRegistry.js`
- [ ] Template muncul di gallery dan bisa di-preview tanpa error

---

## Ringkasan — boleh dan tidak boleh

| ✅ Boleh | ❌ Tidak boleh |
|---|---|
| Buat file baru di `components/templates/` | Ubah file di `backend/` |
| Edit `templateRegistry.js` untuk daftarkan template | Ubah `pages/`, `services/api.js`, `App.jsx`, `main.jsx` |
| Pakai Google Fonts via CSS `@import` | Install npm package baru |
| Pakai GSAP via CDN (seperti TemplateOne) | Ubah `invitationData.json` |
| Desain sebebas mungkin selama props `data` dan `guestName` dipakai | Copy-paste class name dari template lain |
