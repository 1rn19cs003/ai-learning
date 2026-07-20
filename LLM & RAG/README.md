# LLM & RAG — The Complete Track

A MAANG-level, self-paced deep dive from LLM internals to a deployed multi-agent RAG system. Written for a JS/TS engineer, deep enough to prep AI-engineering interviews and to stand as public proof of expertise.

**Start here:** open `home.html` in a browser.

## Contents

| Path | What it is |
|---|---|
| `home.html` | **Track landing page** — the 12-chapter grid + links to everything. Start here. |
| `chapters/01…12.html` | The core: 12 deep chapters, each with worked math, from-scratch TypeScript, corrected misconceptions, interview Q&A, a whiteboard summary, and a linked lab. Fixed sidebar for jumping between chapters. |
| `labs/` | Runnable TypeScript labs (one per chapter) with tests. Labs 01–05 run offline; 06–11 build toward RepoSage. `cd labs && npm install && npm test`. |
| `notes/Handwritten_Notes.html` | Plain-language, notebook-style notes with hand-drawn diagrams — the gentle companion to the chapters. |
| `curriculum/LLM_RAG_Curriculum.html` | The original syllabus with per-milestone resource lists and checkpoint assignments. |
| `diagrams/Diagrams.html` | Interactive architecture + roadmap diagrams (page tabs, zoom, pan). |
| `diagrams/LLM_RAG_Project.drawio` | Editable diagram source (open at [app.diagrams.net](https://app.diagrams.net)). |
| `plan/LLM_RAG_Project_Plan.docx` / `.pdf` | The original 8-week project plan. |

## The 12 chapters

**Part I — How LLMs work:** 1 · Math foundations · 2 · Tokens & embeddings · 3 · The transformer, derived · 4 · How models are trained
**Part II — Engineering:** 5 · LLM engineering · 6 · Vector search internals
**Part III — RAG:** 7 · RAG fundamentals · 8 · Advanced RAG
**Part IV — Ship it:** 9 · Evaluation · 10 · Agents & orchestration · 11 · Production · 12 · RepoSage (flagship build)

## How to work through it

1. Read a chapter (`home.html` → pick one, or start at Chapter 1).
2. Do its lab — the tests are the spec; get them green.
3. From Chapter 6 onward, the labs assemble into **RepoSage**, the portfolio project (Chapter 12).
4. Use `notes/Handwritten_Notes.html` when you want a lighter re-explanation.

## Progress

- [ ] Ch 1 — Math foundations (lab: dot/cosine/softmax + autograd)
- [ ] Ch 2 — Tokens & embeddings (lab: BPE from scratch)
- [ ] Ch 3 — Transformer & attention (lab: attention by hand)
- [ ] Ch 4 — Training & alignment (lab: LoRA math + decision quiz)
- [ ] Ch 5 — LLM engineering (lab: the gateway)
- [ ] Ch 6 — Vector search internals (lab: brute-force vs HNSW)
- [ ] Ch 7 — RAG fundamentals (lab: naive RAG + failure taxonomy)
- [ ] Ch 8 — Advanced RAG (lab: BM25 + RRF + rerank + HyDE)
- [ ] Ch 9 — Evaluation (lab: golden set + CI gate)
- [ ] Ch 10 — Agents (lab: ReAct from scratch + critic)
- [ ] Ch 11 — Production (lab: caching + injection red-team)
- [ ] Ch 12 — RepoSage shipped
