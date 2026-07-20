import { describe, it, expect } from "vitest";
import { attention, attentionWeights } from "./solution.js";

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

describe("Lab 03 — attention (matches the hand-computed Chapter 3 example)", () => {
  it("produces the exact attention weights", () => {
    const w = attentionWeights(Q[0], K);
    expect(w[0]).toBeCloseTo(0.306, 3);
    expect(w[1]).toBeCloseTo(0.074, 3);
    expect(w[2]).toBeCloseTo(0.62, 3);
  });

  it("produces the exact output vector", () => {
    const out = attention(Q, K, V)[0];
    expect(out[0]).toBeCloseTo(1.231, 3);
    expect(out[1]).toBeCloseTo(0.769, 3);
  });

  it("weights always form a probability distribution", () => {
    const w = attentionWeights([0.5, -0.3], K);
    expect(w.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 6);
    expect(w.every((x) => x >= 0)).toBe(true);
  });

  it("causal mask zeroes out the future", () => {
    // token 0 may only attend to itself -> its output equals V[0]
    const out = attention(
      [[1, 1], [1, 1]],
      [[1, 1], [1, 1]],
      [[5, 5], [9, 9]],
      true
    );
    expect(out[0][0]).toBeCloseTo(5, 6);
    expect(out[0][1]).toBeCloseTo(5, 6);
  });
});
