// Lab 04 — LoRA parameter/memory math + fine-tune-vs-RAG decision helper.
// Run: npm run lab04

/** Full fine-tune trainable params for a square weight matrix of side d. */
export function fullFinetuneParams(d: number): number {
  return d * d;
}

/** LoRA trainable params for a d×d matrix at rank r: two thin matrices A(d×r), B(r×d). */
export function loraParams(d: number, r: number): number {
  return d * r + r * d; // = 2*d*r
}

/** Fraction of parameters LoRA trains vs full fine-tune (0..1). */
export function loraFraction(d: number, r: number): number {
  return loraParams(d, r) / fullFinetuneParams(d);
}

/** Rough trainable-memory estimate in MB (params × bytes, ×~4 for Adam optimizer states). */
export function trainableMemoryMB(params: number, bytesPerParam = 2, optimizerMultiplier = 4): number {
  return (params * bytesPerParam * optimizerMultiplier) / (1024 * 1024);
}

/** Simple rule-of-thumb router for the classic interview question. */
export function recommend(need: string): "RAG" | "Fine-tune" | "Both" {
  const n = need.toLowerCase();
  if (/(fact|knowledge|docs?|documentation|fresh|cite|citation|delete|compliance|changing)/.test(n)) return "RAG";
  if (/(format|json|tone|style|jargon|persona|voice)/.test(n)) return "Fine-tune";
  if (/(reasoning|skill|domain).*(and|\+).*(fact|knowledge)/.test(n)) return "Both";
  return "RAG"; // default: knowledge problems dominate real requests
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const d = 4096;
  console.log(`Full fine-tune of one ${d}x${d} matrix: ${fullFinetuneParams(d).toLocaleString()} params`);
  for (const r of [8, 16, 64]) {
    console.log(
      `LoRA r=${r}: ${loraParams(d, r).toLocaleString()} params ` +
        `(${(loraFraction(d, r) * 100).toFixed(2)}% of full)`
    );
  }
  console.log("\nDecision helper:");
  for (const q of [
    "make it know our internal documentation",
    "always output our house JSON format",
    "learn our domain reasoning and our product facts",
  ]) {
    console.log(`  "${q}" -> ${recommend(q)}`);
  }
}
