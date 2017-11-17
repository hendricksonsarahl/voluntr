import { idInArray } from "../../../src/js/vol/helpers.js";

describe("idInArray", () => {
  const emptyArray = [];
  const testArray = [{ id: 1 }];
  const notAnObj = "abc";
  const objInArray = { id: 1 };
  const objNotInArray = { id: 2 };

  it("Should return false if target is not an object", () => {
    expect(idInArray(testArray, notAnObj)).toBe(false);
  });

  it("Should return false if array has length 0", () => {
    expect(idInArray(emptyArray, objInArray)).toBe(false);
  });

  it("Should return false if target's ID not in array", () => {
    expect(idInArray(testArray, objNotInArray)).toBe(false);
  });

  it("Should return true if target's ID is in array", () => {
    expect(idInArray(testArray, objInArray)).toBe(true);
  });
});
