import {
  selectAllCategories,
  toggleSelectAllCheckbox
} from "../../../src/js/vol/filters-form.js";

let categoryInputs, selectAllCheckbox;
const setUpDOM = () => {
  document.body.innerHTML = `
    <div class="checkbox" id="selectAll">
      <label>
        <input type="checkbox"><strong>All Categories</strong>
      </label>
    </div>                
    <input id="animals" type="checkbox" name="category" value="animals">Animals
    <input id="arts_culture" type="checkbox" name="category" value="arts_culture">Arts &amp; Culture
  `;

  categoryInputs = document.querySelectorAll("input[name=category]");
  selectAllCheckbox = document.querySelector("#selectAll input");
};

beforeEach(setUpDOM);

describe("selectAllCategories", () => {
  it("Should un-check all category checkboxes if selectAll previously checked", () => {
    selectAllCategories();
    categoryInputs.forEach(input => {
      expect(input.checked).toBe(false);
    });
  });

  it("Should check all category checkboxes if selectAll not previously checked", () => {
    selectAllCheckbox.checked = true;
    selectAllCategories();
    categoryInputs.forEach(input => {
      expect(input.checked).toBe(true);
    });
  });
});

describe("toggleSelectAllCheckbox", () => {
  it("Should un-check selectAllCheckbox when another box is un-checked", () => {
    // set it to checked to begin with:
    selectAllCheckbox.checked = true;

    // un-check a different box:
    let animalsCheckbox = document.getElementById("animals");
    animalsCheckbox.checked = false;
    toggleSelectAllCheckbox.bind(animalsCheckbox)();

    expect(selectAllCheckbox.checked).toBe(false);
  });

  it("Should leave selectAllCheckbox checked when one (but not all) other box is checked", () => {
    // set it to checked to begin with:
    selectAllCheckbox.checked = false;

    // check a different box:
    let animalsCheckbox = document.getElementById("animals");
    animalsCheckbox.checked = true;
    toggleSelectAllCheckbox.bind(animalsCheckbox)();

    expect(selectAllCheckbox.checked).toBe(false);
  });

  it("Should leave selectAllCheckbox checked when one (but not all) other box is checked", () => {
    // set it to checked to begin with:
    selectAllCheckbox.checked = false;

    // check a different box, after all other boxes checked:
    categoryInputs.forEach(input => {
      input.checked = true;
    });
    let animalsCheckbox = document.getElementById("animals");
    toggleSelectAllCheckbox.bind(animalsCheckbox)();

    expect(selectAllCheckbox.checked).toBe(true);
  });
});
