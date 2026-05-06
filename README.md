# Wedding Invitation Platform

Platform undangan pernikahan digital dengan frontend React multi-template dan backend ASP.NET Core Web API.

## Struktur Proyek

```text
wedding-invitation/
├── frontend/   # React + Vite
├── backend/    # ASP.NET Core Web API
└── README.md
```

## Frontend

- Stack: React, Vite, React Router, Axios
- Entry page: `src/pages/InvitationPage.jsx`
- Template pertama: `src/components/templates/TemplateOne/`
- Mock data sementara: `src/mock/invitationData.json`

Jalankan:

```bash
cd frontend
npm install
npm run dev
```

## Backend

- Stack: ASP.NET Core Web API, Entity Framework Core, Swagger
- Project: `backend/WeddingInvitation`
- Controller awal: `InvitationController`, `GuestController`
- Data layer awal: `Data/AppDbContext.cs`

Jalankan:

```bash
cd backend/WeddingInvitation
dotnet restore
dotnet run
```

## Environment

- Frontend API base URL: `VITE_API_BASE_URL`
- Backend database password: `DB_PASSWORD`

Contoh:

```bash
export VITE_API_BASE_URL=https://localhost:7001/api
export DB_PASSWORD=your_strong_password
```
