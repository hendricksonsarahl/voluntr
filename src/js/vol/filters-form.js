// Collects all functions enchancing the filters form

// On filters form, check all category boxes
export function selectAllCategories() {
  const categoryInputs = document.querySelectorAll("input[name=category]");
  const selectAllButton = document.querySelector("#selectAll input");

  if (selectAllButton.checked) {
    categoryInputs.forEach(catInput => {
      catInput.checked = true;
    });
  } else {
    categoryInputs.forEach(catInput => {
      catInput.checked = false;
    });
  }
}

// Select All checkbox should be checked exactly when all other checkboxes are checked
export function toggleSelectAllCheckbox() {
  const selectAllCheckbox = document.querySelector("#selectAll input");
  const categoryInputs = document.querySelectorAll("input[name=category]");

  if (!this.checked) {
    selectAllCheckbox.checked = false;
  } else {
    let allChecked = true;
    for (let i = 0; i < categoryInputs.length; i++) {
      if (!categoryInputs[i].checked) {
        allChecked = false;
      }
    }
    if (allChecked) {
      selectAllCheckbox.checked = true;
    }
  }
}