// Lab 01 — the four operations that run everything, from scratch.
// Run:  npm run lab01     Test:  npm test
// Read Chapter 1 first, then try starter.ts before peeking here.

// ---------- 1. Similarity ----------
export function dot(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error("length mismatch");
  return a.reduce((s, ai, i) => s + ai * b[i], 0);
}

export function norm(a: number[]): number {
  return Math.sqrt(dot(a, a));
}

export function cosine(a: number[], b: number[]): number {
  const denom = norm(a) * norm(b);
  if (denom === 0) return 0;
  return dot(a, b) / denom;
}

// ---------- 2. Softmax (numerically stable — subtract the max, Ch 1) ----------
export function softmax(logits: number[], temperature = 1): number[] {
  const scaled = logits.map((z) => z / temperature);
  const max = Math.max(...scaled); // stability: prevents e^big overflow
  const exps = scaled.map((z) => Math.exp(z - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

// ---------- 3. Autograd — the heart of every DL framework ----------
export class Value {
  grad = 0;
  private _backward: () => void = () => {};
  constructor(public data: number, private prev: Value[] = []) {}

  add(o: Value | number): Value {
    const other = o instanceof Value ? o : new Value(o);
    const out = new Value(this.data + other.data, [this, other]);
    out._backward = () => {
      this.grad += out.grad; // d(a+b)/da = 1
      other.grad += out.grad;
    };
    return out;
  }

  mul(o: Value | number): Value {
    const other = o instanceof Value ? o : new Value(o);
    const out = new Value(this.data * other.data, [this, other]);
    out._backward = () => {
      this.grad += other.data * out.grad; // chain rule: d(a*b)/da = b
      other.grad += this.data * out.grad;
    };
    return out;
  }

  sub(o: Value | number): Value {
    const other = o instanceof Value ? o : new Value(o);
    return this.add(other.mul(-1));
  }

  pow(n: number): Value {
    const out = new Value(this.data ** n, [this]);
    out._backward = () => {
      this.grad += n * this.data ** (n - 1) * out.grad;
    };
    return out;
  }

  backward(): void {
    const topo: Value[] = [];
    const seen = new Set<Value>();
    const build = (v: Value) => {
      if (!seen.has(v)) {
        seen.add(v);
        v.prev.forEach(build);
        topo.push(v);
      }
    };
    build(this);
    this.grad = 1; // dL/dL = 1
    for (const v of topo.reverse()) v._backward();
  }
}

// ---------- 4. Train a 2-parameter model by hand (the Ch 1 worked example) ----------
export function trainLinear(x: number, y: number, steps = 20, lr = 0.1) {
  const w = new Value(1);
  const b = new Value(0);
  let loss = 0;
  for (let i = 0; i < steps; i++) {
    // forward: yhat = w*x + b ; loss = (yhat - y)^2
    const yhat = w.mul(x).add(b);
    const L = yhat.sub(y).pow(2);
    loss = L.data;
    // backward
    w.grad = 0;
    b.grad = 0;
    L.backward();
    // update (gradient descent)
    w.data -= lr * w.grad;
    b.data -= lr * b.grad;
  }
  return { w: w.data, b: b.data, loss };
}

// ---------- demo ----------
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("cosine([2,1,0],[1,3,0]) =", cosine([2, 1, 0], [1, 3, 0]).toFixed(3), "(expect 0.707)");
  console.log("softmax([2,1,0])       =", softmax([2, 1, 0]).map((p) => p.toFixed(3)), "(expect 0.665, 0.245, 0.090)");
  console.log("softmax T=2            =", softmax([2, 1, 0], 2).map((p) => p.toFixed(3)), "(flatter)");
  const r = trainLinear(2, 10);
  console.log(`trained: w=${r.w.toFixed(2)} b=${r.b.toFixed(2)} loss=${r.loss.toExponential(2)} (loss → ~0)`);
}
