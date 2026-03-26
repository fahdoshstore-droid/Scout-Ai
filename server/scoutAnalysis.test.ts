import { describe, it, expect } from "vitest";

describe("Scout Analysis - Anthropic API Key Validation", () => {
  it("should have ANTHROPIC_API_KEY set in environment", () => {
    const key = process.env.ANTHROPIC_API_KEY;
    expect(key, "ANTHROPIC_API_KEY must be set").toBeTruthy();
    expect(key?.startsWith("sk-ant-"), "Key must start with sk-ant-").toBe(true);
  });

  it("should be able to instantiate Anthropic client without error", async () => {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const apiKey = process.env.ANTHROPIC_API_KEY;
    expect(() => new Anthropic({ apiKey })).not.toThrow();
  });
});
