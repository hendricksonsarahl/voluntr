// change the appearance and text of the save button when an opp is saved or removed
export function updateSaveButton(isSaved) {
  if (isSaved) {
    this.classList.remove("btn-default");
    this.classList.add("btn-success");
    this.innerHTML = 'Saved!&nbsp;<span class="glyphicon glyphicon-ok"></span>';
  } else {
    this.classList.add("btn-default");
    this.classList.remove("btn-success");
    this.innerHTML =
      'Save&nbsp;<span class="glyphicon glyphicon-pushpin"></span>';
  }
}
