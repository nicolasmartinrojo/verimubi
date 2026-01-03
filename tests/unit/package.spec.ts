import { describe, it, expect } from "vitest";
import pkg from "../../package.json";

describe("package.json sanity", () => {
  it("has correct project name", () => {
    expect(pkg.name).toBe("verimubi");
  });
});
