// display error messages as Bootstrap alert elements in browser
// Bootstrap will handle closing them
function displayError(message) {

  //allow for direct input of error objects:
  if (message instanceof Error) {
    message = message.message;
  }

  //select a container for the alert
  var alertContainer = document.querySelector(".alert-container");

  //build a new DOM element
  var alert = document.createElement("div");
  alert.className = `alert alert-danger alert-dismissible fade in`;
  alert.innerHTML = `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error: </strong>${message}`;

  //append the new DOM element to the container
  alertContainer.appendChild(alert);
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    console.log('base.js loaded');
  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    displayError: displayError
  };
}