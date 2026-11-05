# ANRF-PAIR · Kannur University Website

An academic research web application built with **React 19**, **Vite 6**, **Tailwind CSS v4**, **TypeScript**, and **React Router DOM v7**, matching the design specifications from the ANRF-PAIR Kannur University PDF design.

---

## 🚀 Features

- **Exact Design Matching**: Recreated 1:1 based on the design pages:
  - **Top Mini-Banner**: Institution details and dual-language selector (`English` / `മലയാളം`).
  - **Main Navigation**: `KU` emblem badge, institution title & subtitle, with navigation links and active indicator tab.
  - **Hero Section**: Deep navy theme, gold uppercase scheme eyebrow (`PARTNERSHIPS FOR ACCELERATED INNOVATION AND RESEARCH`), serif display headline, dual action buttons (`Read the latest bulletin` & `Submit a presentation`), and 3-column key metrics (`6 Departments`, `3 Disease areas`, `1 Hub: Univ. of Hyderabad`).
  - **Latest Updates Ticker**: Distinct teal pill badge with announcement updates.
  - **Our Six Departments**: 3x2 responsive card grid featuring `DEPARTMENT 1-6`, department names, focus areas, and lead investigator info.
  - **Research Bulletins**: Distinct alternating header bands (Teal & Navy) with `VOL. [ ] · ISSUE [ ]`, summary text, and `Download PDF` links.
  - **Presentations & Submission Form**: Interactive two-column layout with past/upcoming seminar list and an interactive presentation review upload form with department selector and file picker.
  - **Follow Project Updates**: Social channel buttons (`Facebook`, `Instagram`, `X`, `LinkedIn`, `YouTube`) and dual social preview cards.
  - **Deep Navy Footer**: Contact details, quick links, partner links (`ANRF` & `University of Hyderabad`), and copyright notes.
- **Wireframe & Realistic Content Switcher**: Floating quick-toggle switch to view exact wireframe labels (e.g. `[Department name]`, `[Bulletin title]`) or rich demo academic data.
- **Full TypeScript & React Router v7 Routing**: All routes declared centrally in [src/App.tsx](file:///x:/TEMP/ANRF_Website/src/App.tsx).

---

## 🛠️ Routes Configured in `App.tsx`

| Path | View | Description |
|---|---|---|
| `/` | `HomePage` | Full homepage layout based on the PDF design |
| `/about` | `AboutPage` | Detailed ANRF-PAIR scheme & hub-spoke background |
| `/departments` | `DepartmentsPage` | Listing of all 6 research departments |
| `/departments/:id` | `DepartmentDetailPage` | Single department detail with lead PI, outputs & focus |
| `/bulletins` | `BulletinsPage` | Current volume research bulletin list |
| `/bulletins/archive` | `BulletinsArchivePage` | Complete archive of past bulletins and monographs |
| `/presentations` | `PresentationsPage` | Seminars, reviews, and presentation upload form |
| `/news-events` | `NewsEventsPage` | Academic conferences, symposia, and workshops |
| `/team` | `TeamPage` | Faculty, co-investigators, and researchers |
| `/contact` | `ContactPage` | Directorate office contact information and query form |
| `*` | `NotFoundPage` | 404 fallback page |

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview the Production Build
```bash
npm run preview
```

