import { isDefined } from "../isDefined";

describe("isDefined", () => {
  it("returns true for a defined value", () => {
    const value = "test";

    expect(isDefined(value)).toBe(true);
  });

  it("returns false for a null value", () => {
    const value = null;

    expect(isDefined(value)).toBe(false);
  });

  it("returns false for an undefined value", () => {
    const value = undefined;

    expect(isDefined(value)).toBe(false);
  });
});