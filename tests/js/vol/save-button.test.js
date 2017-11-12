import { updateSaveButton } from "../../../src/js/vol/save-button.js";

let saveButton;

const setUpDOM = () => {
  document.body.innerHTML = `
    <button id="save-button" class="btn btn-default">Save&nbsp;
      <span class="glyphicon glyphicon-pushpin"></span>
    </button>
  `;

  saveButton = document.getElementById("save-button");
};

beforeEach(setUpDOM);

describe("updateSaveButton", () => {
  it("Rendered button HTML matches snapshot for 'true' argument", () => {
    updateSaveButton.bind(saveButton, true)();
    const renderedHTML = saveButton.outerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });

  it("Rendered button HTML matches snapshot for 'false' argument", () => {
    updateSaveButton.bind(saveButton, false)();
    const renderedHTML = saveButton.outerHTML;
    expect(renderedHTML).toMatchSnapshot();
  });
});
