// display error messages as Bootstrap alert elements in browser
// Bootstrap will handle closing them
export function displayError(err) {
  // allow for direct input of error objects:
  if (err instanceof Error) {
    err = err.message;
  }

  // select a container for the alert
  const alertContainer = document.querySelector(".alert-container");

  // build a new DOM element
  const alert = document.createElement("div");
  alert.className = `alert alert-danger alert-dismissible fade in`;
  alert.innerHTML = `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error: </strong>${err}`;

  // append the new DOM element to the container
  alertContainer.appendChild(alert);
}

// delete a cookie by setting its expiration date in the past
export function deleteCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}