// Lab 08 — BM25 and Reciprocal Rank Fusion, verifying the Chapter 8 hand-computed numbers.
// The full advanced-RAG lab (rerank, HyDE, graph) needs an API + Docker; this file is the
// offline algorithmic core you can test with no services.
// Run: (imported by fusion.test.ts) ;  see 08-advanced-rag/README.md for the full lab.

/** IDF as used in the chapter's BM25 worked example. */
export function idf(totalDocs: number, docsWithTerm: number): number {
  return Math.log((totalDocs - docsWithTerm + 0.5) / (docsWithTerm + 0.5) + 1e-12);
}

/** BM25 score contribution of a single term in a single document. */
export function bm25Term(
  termFreq: number,
  docLen: number,
  avgDocLen: number,
  totalDocs: number,
  docsWithTerm: number,
  k1 = 1.5,
  b = 0.75
): number {
  const IDF = idf(totalDocs, docsWithTerm);
  const lengthNorm = 1 - b + b * (docLen / avgDocLen);
  const saturation = (termFreq * (k1 + 1)) / (termFreq + k1 * lengthNorm);
  return IDF * saturation;
}

/** Reciprocal Rank Fusion. Each list is an ordered array of doc ids (rank 1 = index 0). */
export function reciprocalRankFusion(lists: string[][], k = 60): Map<string, number> {
  const scores = new Map<string, number>();
  for (const list of lists) {
    list.forEach((docId, idx) => {
      const rank = idx + 1;
      scores.set(docId, (scores.get(docId) ?? 0) + 1 / (k + rank));
    });
  }
  return scores;
}

/** Convenience: RRF then sorted best-first. */
export function fuseRanked(lists: string[][], k = 60): { id: string; score: number }[] {
  const scores = reciprocalRankFusion(lists, k);
  return [...scores.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score);
}
