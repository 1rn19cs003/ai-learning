import { describe, it, expect } from "vitest";
import { fullFinetuneParams, loraParams, loraFraction, recommend } from "./solution.js";

describe("Lab 04 — LoRA math (matches Chapter 4 worked example)", () => {
  it("full fine-tune of a 4096x4096 matrix = 16,777,216 params", () => {
    expect(fullFinetuneParams(4096)).toBe(16_777_216);
  });

  it("LoRA rank 8 on that matrix = 65,536 params", () => {
    expect(loraParams(4096, 8)).toBe(65_536);
  });

  it("LoRA rank 8 trains ~0.39% of the parameters", () => {
    expect(loraFraction(4096, 8) * 100).toBeCloseTo(0.39, 2);
  });

  it("higher rank trains more parameters", () => {
    expect(loraParams(4096, 64)).toBeGreaterThan(loraParams(4096, 8));
  });

  it("decision helper routes knowledge -> RAG, format -> Fine-tune", () => {
    expect(recommend("make it know our internal documentation")).toBe("RAG");
    expect(recommend("always output our house JSON format")).toBe("Fine-tune");
  });
});
