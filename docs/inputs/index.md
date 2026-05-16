# Inputs & Evidence

A controlled holding layer for raw source materials that feed the Knowledge Library and Playbook.

---

## What this layer is

**Inputs** is not architecture content. It is the raw material *behind* architecture content — books being read, training notes, articles saved, papers analysed, talks watched. It keeps that material organised, traceable, and linked to the higher layers it informs.

```
External world
     │
     ▼
[Inputs layer]  ← you are here
     │   captures, reflects, extracts
     ▼
[Knowledge Library]  ← architecture knowledge
     │   applies, distils
     ▼
[Playbook]  ← architecture practice
```

---

## Categories

| Category | What belongs here |
|---|---|
| [Books](books/index.md) | Technical books, textbooks, reference books |
| [Trainings](trainings/index.md) | Courses, certifications, workshops, learning paths |
| [Articles](articles/index.md) | Blog posts, magazine articles, newsletters |
| [Papers](papers/index.md) | Academic papers, whitepapers, research reports |
| [Talks](talks/index.md) | Conference talks, podcasts, recorded sessions |

---

## How to add a new input

1. Pick the correct category folder (`books/`, `trainings/`, `articles/`, `papers/`, `talks/`)
2. Create a sub-folder: `<category>/<kebab-case-title>/`
3. Copy the template files from `_templates/`
4. Fill in `index.md` (metadata), `notes.md` (raw notes), `extraction-log.md` (what was extracted and where it went)
5. Place any binary assets (PDFs, slide decks, images) under `_assets/<category>/`
6. Add the source to the nav in `mkdocs.yml` under the correct category

---

## Feeding rules (short form)

See full rules at the bottom of this page.

1. Notes stay here. Insights go to Knowledge Library or Playbook.
2. Every extracted insight must be logged in `extraction-log.md`.
3. Binary files live under `_assets/`, never inline in Markdown pages.
4. A source is only linked from Knowledge/Playbook after its extraction log has at least one entry.
5. Do not copy large passages. Extract the decision or principle, not the prose.

---

## Feeding rules (full)

**Rule 1 — Separation of concern.**  
Raw notes, highlights, and summaries stay in `inputs/`. Only the *distilled insight or principle* moves to Knowledge Library or Playbook. Never paste book excerpts or slide content directly into Knowledge pages.

**Rule 2 — Mandatory extraction log.**  
Every input that contributes to the Knowledge Library or Playbook must have an `extraction-log.md` entry. Log: what was extracted, where it was placed, and the date. This makes the source of every Knowledge Library claim traceable.

**Rule 3 — Binary assets stay in `_assets/`.**  
PDFs, slide decks, images, and other binary files are stored in `docs/inputs/_assets/<category>/`. Markdown pages reference them via relative path. Binary files are never committed to the root of a source folder.

**Rule 4 — One source, one folder.**  
Each book / article / paper / talk has its own folder, even if it generates only one note file. Flat files in the category root are not permitted.

**Rule 5 — No duplication of Knowledge Library content.**  
If a topic is already covered in the Knowledge Library, the extraction log links to it. Do not restate the Knowledge Library content inside an input note.

**Rule 6 — Status field is mandatory.**  
Every `index.md` must have a `status` field: `reading` / `complete` / `paused` / `abandoned`. Inputs with no status are incomplete.

**Rule 7 — Attribution in Knowledge Library.**  
When an insight from an input is used in the Knowledge Library or Playbook, the source must appear in that page's **Credible Sources** table. The extraction log and the Credible Sources entry must match.
