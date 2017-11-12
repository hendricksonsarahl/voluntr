import {
  showOpps,
  showNoOppsMessage,
  renderSavedOpps
} from "../../../src/js/vol/saved-opps-page.js";

let parentElt;
const fullStore = [
  { id: 1, title: "One", event_date: "Thursday, October 26, 2017" },
  { id: 2, title: "Two", event_date: "Thursday, October 26, 2017" },
  { id: 3, title: "Three", event_date: "Thursday, October 26, 2017" }
];
const emptyStore = [];

const setUpDOM = () => {
  document.body.innerHTML = `
    <div id="parent"></div>
  `;

  parentElt = document.getElementById("parent");
};

beforeEach(setUpDOM);

describe("renderSavedOpps", () => {
  it("Should append an H2 element as first child of input element", () => {
    renderSavedOpps(fullStore, parentElt);
    expect(parentElt.childNodes[0].tagName).toBe("H2");
  });

  it("Should append a total of n+1 children when store has size n", () => {
    renderSavedOpps(fullStore, parentElt);
    expect(parentElt.childNodes.length).toBe(4);
  });

  it("Rendered HTML matches snapshot for store with content", () => {
    renderSavedOpps(fullStore, parentElt);
    const renderedHTML = parentElt.innerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });

  it("Rendered HTML matches snapshot for empty store", () => {
    renderSavedOpps(emptyStore, parentElt);
    const renderedHTML = parentElt.innerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });
});
