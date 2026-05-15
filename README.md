# 📚 Yuvi's Knowledge Base & Playbook

A personal repository of architectural wisdom, design patterns, curated references, decision records, and reusable templates — built to grow.

🌐 **Live site:** `https://<your-username>.github.io/<repo-name>/`

---

## 📁 Project Structure

```
yuviskb/
├── index.html          ← Home page with all section cards
├── references.html     ← References & Links
├── templates.html      ← Reusable Templates
├── patterns.html       ← Design Patterns
├── adr.html            ← Architectural Decision Records
├── tech-radar.html     ← Tech Radar
└── notes.html          ← Notes / Blog
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name your repo (e.g. `yuviskb` or `knowledge-base`)
3. Set it to **Public** (required for free GitHub Pages)
4. Click **Create repository** — skip adding README since you already have files

### Step 2 — Push your local project

Open a terminal in `C:\vscode\yuviskb` and run:

```bash
git init
git add .
git commit -m "Initial commit: Knowledge Base & Playbook"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

> Replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub username and repo name.

### Step 3 — Enable GitHub Pages

1. In your GitHub repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Click **Save**

Your site will be live in ~1 minute at:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

---

## ✏️ How to Add Content

All pages are self-contained HTML files using [Tailwind CSS CDN](https://tailwindcss.com/docs/installation/play-cdn) — no build step required.

### Adding a new ADR
In `adr.html`, duplicate a `<tr>` row in the table, update the ADR number, title, category, date, and status badge.

### Adding a new Tech Radar item
In `tech-radar.html`, add a `<tr>` row to the appropriate section table. Change the dot colour class to match the ring:
- `bg-green-500` → Adopt
- `bg-blue-500` → Trial
- `bg-yellow-400` → Assess
- `bg-red-400` → Hold

### Adding a new Note
In `notes.html`, duplicate an `<article>` block, update the tag, date, title, excerpt, and tags.

---

## 🛠 Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | Plain HTML5 |
| Styling | Tailwind CSS (CDN) |
| Hosting | GitHub Pages |
| Build | None required |

---

## 📌 Future Ideas

- [ ] Add a search bar with [Fuse.js](https://fusejs.io/) for client-side search
- [ ] Extract nav into a reusable component with a lightweight templating approach
- [ ] Add individual playbook detail pages
- [ ] Add a dark mode toggle
- [ ] Add a `CNAME` file for a custom domain
