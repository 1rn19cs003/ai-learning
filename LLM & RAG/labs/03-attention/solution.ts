// Lab 03 — scaled dot-product attention from scratch.
// Verifies the exact numbers hand-computed in Chapter 3 (output [1.232, 0.768]).
// Run: npm run lab03

function softmaxStable(scores: number[]): number[] {
  const finite = scores.filter((s) => Number.isFinite(s));
  const max = finite.length ? Math.max(...finite) : 0;
  const exps = scores.map((s) => (s === -Infinity ? 0 : Math.exp(s - max)));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

/** Single-head scaled dot-product attention. Q,K,V are [seqLen][dk]. */
export function attention(
  Q: number[][],
  K: number[][],
  V: number[][],
  causal = false
): number[][] {
  const dk = Q[0].length;
  const scale = 1 / Math.sqrt(dk);
  return Q.map((q, i) => {
    const scores = K.map((k, j) =>
      causal && j > i ? -Infinity : q.reduce((s, qv, d) => s + qv * k[d], 0) * scale
    );
    const weights = softmaxStable(scores);
    // weighted sum of value vectors
    return V[0].map((_, d) => V.reduce((s, v, j) => s + weights[j] * v[d], 0));
  });
}

/** Also expose the attention weights for a single query (for inspection/tests). */
export function attentionWeights(q: number[], K: number[][]): number[] {
  const dk = q.length;
  const scale = 1 / Math.sqrt(dk);
  const scores = K.map((k) => q.reduce((s, qv, d) => s + qv * k[d], 0) * scale);
  return softmaxStable(scores);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // The exact setup from Chapter 3's worked example.
  const Q = [[1, 1]];
  const K = [
    [1, 0],
    [0, -1],
    [1, 1],
  ];
  const V = [
    [2, 0],
    [0, 2],
    [1, 1],
  ];
  const w = attentionWeights(Q[0], K);
  const out = attention(Q, K, V);
  console.log("weights =", w.map((x) => x.toFixed(3)), "(expect 0.306, 0.074, 0.620)");
  console.log("output  =", out[0].map((x) => x.toFixed(3)), "(expect 1.231, 0.769)");
}
