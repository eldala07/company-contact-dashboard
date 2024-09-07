import { callAllFunctions } from "../callAllFunctions";

describe("callAllFunctions", () => {
  it("should call all functions", () => {
    const obj = {
      a: () => 1,
      b: () => 2,
      c: () => 3,
    };
    const result = callAllFunctions(obj);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});
