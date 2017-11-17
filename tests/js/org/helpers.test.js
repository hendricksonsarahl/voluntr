import { displayError, deleteCookie } from "../../../src/js/org/helpers.js";

describe("displayError", () => {
  let alertContainer;

  const setUpDOM = () => {
    document.body.innerHTML = `
      <div class="alert-container"></div>
    `;

    alertContainer = document.querySelector(".alert-container");
  };

  beforeEach(setUpDOM);

  it("Rendered alert matches snapshot for string argument", () => {
    displayError("message in string");
    const renderedHTML = alertContainer.outerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });

  it("Rendered alert matches snapshot for error argument", () => {
    const errorObject = new Error("message in error object");
    displayError(errorObject);
    const renderedHTML = alertContainer.outerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });
});
