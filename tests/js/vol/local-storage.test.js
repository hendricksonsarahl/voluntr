import {
  loadStore,
  saveOpportunity,
  removeOppFromStore
} from "../../../src/js/vol/local-storage.js";

beforeEach(() => {
  localStorage.clear();
});

describe("loadStore", () => {
  it("Should return empty array if localStorage empty", () => {
    expect(loadStore()).toEqual([]);
  });

  it("Should return empty array if localStorage has values, but not for savedOpps", () => {
    localStorage.setItem("unrelatedKey", "unrelatedValue");
    expect(loadStore()).toEqual([]);
  });

  it("Should return array if localStorage has serialized array set for savedOpps", () => {
    localStorage.setItem("savedOpps", JSON.stringify(["testValue"]));
    expect(loadStore()).toEqual(["testValue"]);
  });
});

describe("saveOpportunity", () => {
  const testOpp = { id: 1 };
  const testStore = [{ id: 0 }];
  const emptyStore = [];

  it("Should add array of length 1 to localStorage if localStorage empty beforehand", () => {
    saveOpportunity(emptyStore, testOpp);
    const lsAfterCall = JSON.parse(localStorage.getItem("savedOpps"));
    expect(lsAfterCall.length).toBe(1);
  });

  it("Last item in localStorage should match opp argument", () => {
    saveOpportunity(testStore, testOpp);
    const lsAfterCall = JSON.parse(localStorage.getItem("savedOpps"));
    expect(lsAfterCall.slice(-1)[0].id).toBe(1);
  });
});

describe("removeOppFromStore", () => {
  const testStore = [{ id: 10 }, { id: 2 }, { id: "abc" }];
  const testId = 10;

  beforeEach(() => {
    localStorage.setItem("savedOpps", JSON.stringify(testStore));
  });

  it("Should not change the length of the array in localStorage by 1 when id is not match", () => {
    // localStorage.setItem("savedOpps", JSON.stringify(testStore));
    removeOppFromStore(0);
    const lsAfterCall = JSON.parse(localStorage.getItem("savedOpps"));
    expect(lsAfterCall.length).toBe(3);
  });

  it("Should reduce the length of the array in localStorage by 1 when id is match", () => {
    // localStorage.setItem("savedOpps", JSON.stringify(testStore));
    removeOppFromStore(2);
    const lsAfterCall = JSON.parse(localStorage.getItem("savedOpps"));
    expect(lsAfterCall.length).toBe(2);
  });
});
