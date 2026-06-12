# Career OS — University Talent Platform

An interactive, multi-view prototype for the **TalentBank Tech Hackathon**. Career OS connects students, university administrators, and employers in one unified platform — verifying real capability beyond CGPA.

**Repository:** [github.com/kesin0414/talentbanktechhackathon](https://github.com/kesin0414/talentbanktechhackathon)

## Features

### Student Dashboard — Adaptive Readiness Profile
- Profile card with GitHub connect & PDF upload (persistent state)
- Verified Skills Matrix with progress bars
- Expandable internship cards with match criteria
- Apply flow with modal confirmation and permanent "Applied ✓" state

### University Admin — Lifelong Outcome Loop
- Institutional metrics (alumni tracked, industry shift rate, upskills triggered)
- Alumni Trajectory Tree with horizontal transition bars
- Automated Nudge Log feed

### Employer Hub — Talent Discovery Engine
- Sortable candidate table (CGPA ↓)
- Verified capability tags per candidate
- Upload Mock Challenge modal
- View Portfolio overlay per candidate

## Design

UI follows the Apple-inspired design system documented in [`apple-design.md`](./apple-design.md):
- Action Blue (`#0066cc`) as the single accent
- Black global nav + frosted sub-nav
- Parchment canvas, hairline-bordered utility cards
- SF Pro / system-ui typography at 17px body

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** — component architecture & local state
- **Vite 6** — fast dev server & build
- **Tailwind CSS 3** — Apple-token-aligned utility styling

## Project Structure

```
src/
├── App.jsx                 # Shell, role routing, global state
├── components/
│   ├── TopNav.jsx          # Sticky nav + role switcher
│   ├── StudentDashboard.jsx
│   ├── UniversityAdmin.jsx
│   └── EmployerHub.jsx
└── index.css               # Tailwind + Apple component classes
```

## License

Built for the TalentBank Tech Hackathon competition.
