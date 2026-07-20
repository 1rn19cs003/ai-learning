# Code Labs — LLM & RAG Track

Runnable TypeScript exercises, one per chapter. Each lab is self-contained: read the chapter, then do the lab to prove you can implement the ideas, not just recognize them.

## Setup

```bash
cd "LLM & RAG/labs"
npm install          # installs tsx + vitest + a few libs
npm run lab01        # run any lab by number
npm test             # run all lab test suites
```

Labs 01–05 run with **no API keys** (pure algorithms + a mockable gateway). Labs 06–11 touch real services (a vector DB via Docker, an LLM API); each lab's own README lists what it needs and gives a mock fallback so you can run the logic offline.

## The labs

| Lab | Chapter | You implement | Runs offline? |
|-----|---------|---------------|---------------|
| `01-math` | 1 · Foundations | dot/cosine/softmax (stable) + a 40-line autograd `Value` class; train a 2-param model | ✅ |
| `02-bpe` | 2 · Tokens | BPE training + encode/decode; compare token counts to tiktoken | ✅ |
| `03-attention` | 3 · Transformer | scaled dot-product attention; verify against the hand-computed example; multi-head split | ✅ |
| `04-lora-math` | 4 · Training | LoRA parameter/memory calculator; fine-tune-vs-RAG decision quiz | ✅ |
| `05-gateway` | 5 · LLM eng | the LLM gateway: streaming, structured+retry, cost logging, one tool call | ✅ (mock model) |
| `06-ann` | 6 · Vector search | brute-force cosine vs Qdrant HNSW; measure recall@10 + latency; filtered-search trap | Docker |
| `07-naive-rag` | 7 · RAG | full naive pipeline over ~50 docs; produce `failures.json` | API + Docker |
| `08-advanced-rag` | 8 · Advanced RAG | BM25 + RRF (verify the hand numbers), cross-encoder rerank, HyDE, mini knowledge graph | API + Docker |
| `09-eval` | 9 · Evaluation | faithfulness + answer-relevance judges; `npm run eval` CI gate; naive-vs-advanced chart | API |
| `10-agent` | 10 · Agents | ReAct agent from scratch (3 tools) + bounded critic retry; then rebuild in LangGraph.js | API |
| `11-prod` | 11 · Production | prompt caching cost measurement; semantic cache; write + patch a prompt-injection attack | API |

Labs 06–11 build directly toward **RepoSage** (Chapter 12) — by the time you finish them you've built most of the flagship project's pieces.

## How to use a lab

Each lab folder has:
- `README.md` — the exercise and its acceptance criteria
- `starter.ts` — skeleton with `// TODO` markers
- `solution.ts` — reference implementation (try the starter first!)
- `*.test.ts` — assertions that verify your implementation, including the hand-computed values from the chapters

Do the starter, run the tests until green, then diff against the solution. The tests are the real spec.
