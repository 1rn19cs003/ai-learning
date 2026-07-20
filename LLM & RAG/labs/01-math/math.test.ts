import { describe, it, expect } from "vitest";
import { dot, cosine, softmax, trainLinear } from "./solution.js";

describe("Lab 01 — foundations", () => {
  it("dot product matches the worked example", () => {
    expect(dot([2, 1, 0], [1, 3, 0])).toBe(5);
  });

  it("cosine similarity is ~0.707 (45 degrees)", () => {
    expect(cosine([2, 1, 0], [1, 3, 0])).toBeCloseTo(0.707, 3);
  });

  it("identical vectors have cosine 1", () => {
    expect(cosine([1, 2, 3], [1, 2, 3])).toBeCloseTo(1, 6);
  });

  it("softmax matches the worked example and sums to 1", () => {
    const p = softmax([2, 1, 0]);
    expect(p[0]).toBeCloseTo(0.665, 3);
    expect(p[1]).toBeCloseTo(0.245, 3);
    expect(p[2]).toBeCloseTo(0.09, 3);
    expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 6);
  });

  it("softmax is numerically stable for huge logits", () => {
    const p = softmax([1000, 1001, 1002]); // would overflow without max-subtraction
    expect(p.every((x) => Number.isFinite(x))).toBe(true);
    expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 6);
  });

  it("higher temperature flattens the distribution", () => {
    const sharp = softmax([2, 1, 0], 0.5);
    const flat = softmax([2, 1, 0], 2);
    expect(sharp[0]).toBeGreaterThan(flat[0]); // top prob higher when sharper
  });

  it("autograd trains the 2-param model to ~0 loss", () => {
    const { w, b, loss } = trainLinear(2, 10);
    expect(loss).toBeLessThan(1e-3);
    expect(w * 2 + b).toBeCloseTo(10, 2); // it learned yhat = 10
  });
});
