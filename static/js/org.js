// ~~~~~~~~~~~~~~~~~~~Misc helper functions~~~~~~~~~~~~~~~~~~

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

// delete a cookie by setting its expiration date in the past
function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// ~~~~~~~~~~~~~~~~~Add/Edit Opp form~~~~~~~~~~~~~~~~~

// Update form to require/not allow date and times, based on Flexible Schedule checkbox
function toggleFlexible(e) {
  var scheduleInputs = document.querySelectorAll('.schedule-input');
  var scheduleLabels = document.querySelectorAll('.schedule-label');
  var addressInput = document.getElementById('address');

  if(e.target.checked) {

    // Dim labels and inputs, stop requiring them, mark input disabled
    scheduleLabels.forEach(function(label){
      label.classList.add('text-muted');
    });
    scheduleInputs.forEach(function(input){
      input.removeAttribute("required");
      input.setAttribute("disabled", true);
    });

    // Focus the address input
    addressInput.focus();
  } else {

    // Reset labels and inputs to initial state
    scheduleLabels.forEach(function(label){
      label.classList.remove('text-muted');
    });
    scheduleInputs.forEach(function(input){
      input.setAttribute("required", true);
      input.removeAttribute("disabled");
    });
  }
}


// ~~~~~~~~~~~~~~~~User account authorization:~~~~~~~~~~~~~~~~~~~
// Callback function for Google API's sign-in event
function onSignIn(googleUser) {

  // Only proceed if called from login page:
  if (window.location.pathname !== "/org/login") {
    return false;
  }
  
  var profile = googleUser.getBasicProfile();
  var authToken = googleUser.getAuthResponse().id_token;

  // Build an object with the data we wish to send to server 
  var userDataToSend = {
    authToken: authToken
  };

  // build a fetch request to POST user's Google data to server for verification:
  var authUrl = "/org/login";
  var requestOptions = {
    method: "POST",
    body: JSON.stringify(userDataToSend)
  };

  requestOptions.headers = new Headers();
  requestOptions.headers.append("Content-Type", "application/json");

  // Send the request, and respond to both successful and failure outcomes:
  fetch(authUrl, requestOptions)
    .then(function(response) {
      if (response.status >= 300) {
        displayError(response);
      } else {
        response
          .json()
          .then(function(responseData) {
            
            // Based on token validity, and Voluntr account existence, either:
            // Redirect to logged-in view, show sign-up form, or show an error message
            if(responseData.valid_token) {
              if (responseData.account_exists) {

                //add token to cookie, then redirect to logged-in view
                document.cookie = `token=${responseData.token}; path=/`;
                redirectToOrgHome();
              } else {
                showSignUpForm(profile.getName(), profile.getEmail(), authToken);
              }
            } else {
              throw Error('Received invalid Google authorization token.')
            }
          })
          .catch(displayError);
      }
    })
    .catch(displayError);
}

// Executed after successful Google sign-in, with no existing Voluntr account:
function showSignUpForm(contactName, email, token) {
  var signUpForm = document.querySelector('.signup-row');
  var googleDiv = document.querySelector('.g-signin2');
  var contactNameInput = document.getElementById('contactName');
  var emailInput = document.getElementById('email');
  var tokenInput = document.getElementById('token');

  //pre-populate Contact Name and Contact Email fields with data from Google account:
  contactNameInput.value = contactName;
  emailInput.value = email;
  tokenInput.value = token;

  //display the form, hide the Google sign-in button
  signUpForm.classList.remove("hidden");
  googleDiv.classList.add("hidden");
}

// Executed after successful Google sign-in to an existing Voluntr account:
function redirectToOrgHome() {
  var redirectRow = document.querySelector('.redirect-row');
  var googleDiv = document.querySelector('.g-signin2');

  redirectRow.classList.remove("hidden");
  googleDiv.classList.add("hidden");
  
  setTimeout(function() {
    window.location.href="/org/opportunities";    
  }, 1200);
}

// Sign out of Google connection, delete token cookie, then redirect to "/"
function signOut(event) {
  //don't immediately redirect the user
  event.preventDefault();

  //send sign-out request to Google
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
  auth2.signOut().then(function() {

    //delete the OAuth token from browser cookies:
    deleteCookie('token');

    //redirect user after confirmation of sign-out received
    window.location.href = "/";
  });
}


//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {

    //when the sign-out link is clicked, the signOut function is executed
    var signOutLink = document.querySelectorAll(".signOutLink");
    var flexibleCheckbox = document.getElementById("flexible");

    if (signOutLink) {
      signOutLink.forEach(function(link){
        link.addEventListener("click", signOut);
      });
    }

    if (flexibleCheckbox) {
      flexibleCheckbox.addEventListener("click", toggleFlexible);
    }
    
  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    displayError: displayError,
    signOut: signOut,
    onSignIn: onSignIn,
    showSignUpForm: showSignUpForm,
    redirectToOrgHome: redirectToOrgHome
  };
}