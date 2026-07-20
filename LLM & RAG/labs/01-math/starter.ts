// Lab 01 — STARTER. Implement the TODOs, then run `npm test` until green.
// Reference: Chapter 1. Reference solution: solution.ts (try this first!).

export function dot(a: number[], b: number[]): number {
  // TODO: sum of elementwise products
  throw new Error("not implemented");
}

export function norm(a: number[]): number {
  // TODO: sqrt(dot(a, a))
  throw new Error("not implemented");
}

export function cosine(a: number[], b: number[]): number {
  // TODO: dot(a,b) / (norm(a) * norm(b)); guard divide-by-zero
  throw new Error("not implemented");
}

export function softmax(logits: number[], temperature = 1): number[] {
  // TODO: divide by temperature, SUBTRACT THE MAX (stability), exp, normalize
  throw new Error("not implemented");
}

// TODO: build the Value autograd class (see chapter) with add/mul/pow/backward,
// then trainLinear(x, y) using gradient descent. Copy tests from math.test.ts.
