import { describe, it, expect } from "vitest";
import { idf, bm25Term, reciprocalRankFusion, fuseRanked } from "./fusion.js";

describe("Lab 08 — BM25 (matches Chapter 8 worked example)", () => {
  it("IDF for a term in 10 of 1000 docs is ~4.55", () => {
    expect(idf(1000, 10)).toBeCloseTo(4.55, 1);
  });

  it("BM25 term score matches the hand computation (~7.22)", () => {
    // f=3, |D|=120, avgdl=100, k1=1.5, b=0.75, 10/1000 docs
    const score = bm25Term(3, 120, 100, 1000, 10, 1.5, 0.75);
    expect(score).toBeCloseTo(7.22, 1);
  });

  it("shows saturation: doubling term frequency does NOT double the score", () => {
    const s3 = bm25Term(3, 120, 100, 1000, 10);
    const s6 = bm25Term(6, 120, 100, 1000, 10);
    expect(s6).toBeLessThan(s3 * 2); // diminishing returns
  });
});

describe("Lab 08 — Reciprocal Rank Fusion (matches Chapter 8)", () => {
  it("computes the exact RRF scores from the example", () => {
    const vector = ["X", "Y"]; // X rank1, Y rank2
    const bm25 = ["A", "Y", "B", "C", "X"]; // Y rank2, X rank5
    const scores = reciprocalRankFusion([vector, bm25]);
    expect(scores.get("X")).toBeCloseTo(0.03177, 4);
    expect(scores.get("Y")).toBeCloseTo(0.03226, 4);
  });

  it("Y edges out X — solid in both beats #1 in one", () => {
    const ranked = fuseRanked([
      ["X", "Y"],
      ["A", "Y", "B", "C", "X"],
    ]);
    expect(ranked[0].id).toBe("Y");
  });
});
