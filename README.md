#MedTrack - Sistem za Praćenje Zdravstvenog Stanja

MedTrack je web aplikacija za upravljanje pacijentima, pregledima i vitalnim znacima. Sistem omogućava lekarima da efikasno vode evidenciju o pacijentima, prate njihovo zdravstveno stanje i generišu izveštaje.

##Pokretanje Projekta

### Backend (Laravel)
```bash
cd C:\Users\HP\Desktop\materijali\ITEH\internet-tehnologije-2024-projekat-apppracenjezdravlja_2022_1040\medtrack
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
Backend: **http://localhost:8000**

### Frontend (React)
```bash
cd C:\Users\HP\Desktop\materijali\ITEH\internet-tehnologije-2024-projekat-apppracenjezdravlja_2022_1040\medtrack-frontend
npm install
npm start
```
Frontend: **http://localhost:3000**

##Glavne Funkcionalnosti

###Autentifikacija
- **Registracija i prijava** korisnika/lekara
- **Zaštićene rute** za privatne delove aplikacije
- **Bezbednosni mehanizmi** za zaštitu podataka

###Upravljanje Pacijentima
- **Lista svih pacijenata** sa pretragom i filtriranjem
- **Detaljni prikaz pacijenta** sa kompletnom medicinskom istorijom
- **Kreiranje i izmena** zdravstvenih kartona

###Medicinske Funkcije
- **Evidencija pregleda** sa datumom i dijagnozama
- **Unos vitalnih znakova** (krvni pritisak, puls, temperatura)
- **Praćenje zdravstvenog stanja** kroz vreme

###Izveštaji i Analize
- **Dnevni izveštaji** o broju pregleda
- **Statistike** i grafikoni zdravstvenih podataka
- **Trend analiza** vitalnih znakova

##Tehnologije

### Backend
- **Laravel 10** - PHP framework
- **MySQL** - Relaciona baza podataka
- **Sanctum** - API autentifikacija

### Frontend
- **React 18** - Korisnički interfejs
- **React Router** - Navigacija između stranica
- **Axios** - HTTP komunikacija sa backendom
- **CSS3** - Stilizovanje komponenti

##Ključne Stranice Aplikacije

- **`/login`** - Prijava u sistem
- **`/register`** - Registracija novog korisnika
- **`/patients`** - Lista svih pacijenata
- **`/patients/:id`** - Detalji pacijenta
- **`/encounters`** - Upravljanje pregledima
- **`/vitals`** - Evidencija vitalnih znakova
- **`/reports`** - Izveštaji i statistike
- **`/health`** - Zdravstveni dashboard

##API Endpointi

Glavni API endpointi za komunikaciju frontenda i backend-a:

- `POST /api/login` - Autentifikacija
- `GET /api/patients` - Lista pacijenata
- `POST /api/patients` - Kreiranje pacijenta
- `GET /api/patients/{id}/encounters` - Pregledi pacijenta
- `POST /api/encounters/{id}/vital-signs` - Dodavanje vitalnih znakova

##Struktura Frontend Projekta

```
medtrack-frontend/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx    # Zaštita privatnih ruta
│   │   ├── NavBar.jsx           # Glavna navigacija
│   │   └── HealthBadge.jsx      # Prikaz zdravstvenog stanja
│   ├── pages/
│   │   ├── Login.jsx            # Stranica za prijavu
│   │   ├── Register.jsx         # Stranica za registraciju
│   │   ├── Patients.jsx         # Lista pacijenata
│   │   ├── PatientDetails.jsx   # Detalji pacijenta
│   │   ├── Encounters.jsx       # Upravljanje pregledima
│   │   ├── Vitals.jsx           # Evidencija vitalnih znakova
│   │   ├── CreateMyChart.jsx    # Kreiranje kartona
│   │   ├── EditMyChart.jsx      # Izmena kartona
│   │   ├── ReportsDaily.jsx     # Dnevni izveštaji
│   │   └── HealthPage.jsx       # Zdravstveni dashboard
│   └── App.js                   # Glavna aplikacija
└── package.json
```

##Razvoj

### Backend komande
```bash
php artisan make:migration create_table_name
php artisan test
php artisan make:controller PatientController
```

### Frontend komande
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Pokretanje testova
```

##Kontakt

Za sva pitanja i podršku, kontaktirajte nas putem GitHub repozitorijuma.

##Autori

Nikola Divkovic i Mladen Gajic
