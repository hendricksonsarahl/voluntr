import {
  selectAllCategories,
  toggleSelectAllCheckbox
} from "../../../src/js/vol/filters-form.js";

let categoryInputs, selectAllButton;
const setUpDOM = () => {
  document.body.innerHTML = `
    <div class="checkbox" id="selectAll">
      <label>
        <input type="checkbox"><strong>All Categories</strong>
      </label>
    </div>                
    <input id="animals" type="checkbox" name="category" value="animals">Animals
    <input id="arts_culture" type="checkbox" name="category" value="arts_culture">Arts &amp; Culture
    <input id="kids_youth" type="checkbox" name="category" value="kids_youth">Children &amp; Youth
  `;

  categoryInputs = document.querySelectorAll("input[name=category]");
  selectAllButton = document.querySelector("#selectAll input");
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
    selectAllButton.checked = true;
    selectAllCategories();
    categoryInputs.forEach(input => {
      expect(input.checked).toBe(true);
    });
  });
});

describe('toggleSelectAllCheckbox', () => {
  it ("Should", () => {
    toggleSelectAllCheckbox();
  })
});
