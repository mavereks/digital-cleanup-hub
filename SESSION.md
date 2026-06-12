# Session Recap — Earth Day Cloud Workshop Hub

## What we built

Scaffolded a full React + TypeScript + Vite + Tailwind project around `earth-day-cloud-workshop.tsx`, ready to deploy to GitHub Pages.

---

## Project structure

```
digitalcleanup/
├── src/
│   ├── components/EarthDayHub.tsx   ← main component (typed, linted-clean)
│   ├── App.tsx                      ← renders EarthDayHub
│   ├── main.tsx                     ← React root
│   └── index.css                    ← Tailwind directives
├── public/favicon.svg
├── index.html
├── package.json                     ← vite@8, react@18, lucide-react, tailwind
├── vite.config.ts                   ← base: '/digitalcleanup/'
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── .gitignore
└── .github/workflows/deploy.yml     ← GitHub Actions → GitHub Pages
```

The original `earth-day-cloud-workshop.tsx` is still in the repo root (untouched). The active copy is `src/components/EarthDayHub.tsx` — TypeScript types added for all props and state.

---

## Status

| Task | Done? |
|---|---|
| Vite + React + TS scaffold | ✅ |
| Tailwind + PostCSS wired up | ✅ |
| Component moved to `src/components/` + typed | ✅ |
| GitHub Actions deploy workflow | ✅ |
| Node.js installed (v26.3.0 via Homebrew) | ✅ |
| `npm install` run | ✅ |
| Production build verified (`npm run build`) | ✅ |
| Local dev server tested | ❌ **Next step** |
| GitHub repo created + pushed | ❌ |
| GitHub Pages enabled (Settings → Pages → GitHub Actions) | ❌ |

---

## Next steps to pick up from here

### 1. Install dependencies
```bash
cd ~/Github/digitalcleanup
npm install
```

### 2. Run locally
```bash
npm run dev
# → http://localhost:5173/digitalcleanup/
```

### 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial project scaffold"
git remote add origin https://github.com/<your-username>/digitalcleanup.git
git push -u origin main
```

### 4. Enable GitHub Pages
- Go to the repo on GitHub → **Settings → Pages**
- Under **Source**, select **GitHub Actions**
- The deploy workflow runs automatically on every push to `main`
- Live URL: `https://<your-username>.github.io/digitalcleanup/`

---

## Key config notes

- **`vite.config.ts` `base`** is set to `/digital-cleanup-hub/` — must match your GitHub repo name exactly. If you rename the repo, update this value and the favicon path in `index.html`.
- **Node**: installed at `/opt/homebrew/bin/node` (v26.3.0). If `node` isn't found in a new terminal, run: `export PATH="/opt/homebrew/bin:$PATH"` or add it to `~/.zshrc`.
- **`package.json`** was auto-updated to `vite@8` — that's intentional, leave it.

---

## Component overview

`EarthDayHub` has 5 tabbed sections navigable via sidebar (desktop) or bottom nav (mobile):

| # | Section | Key content |
|---|---|---|
| 01 | Why It Matters | Stats, 3 drivers, rules-of-thumb table, dark data callout |
| 02 | Cleanup Guides | 6 platform tabs: Outlook, OneDrive, SharePoint, Canvas, Zoom, Panopto |
| 03 | Impact Tools | Live CO₂ calculator (sliders), tool links for users + admins, formulas |
| 04 | Behavior Change | Habits for individuals, teams, instructors, and IT |
| 05 | Running the Event | 60-min agenda, pre-event checklist, email templates, success metrics |
