function onSignIn(googleUser) {
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
            console.log("Server responded with: ", responseData);
            
            // Based on token validity, and Voluntr account existence, either:
            // Redirect to logged-in view, show sign-up form, or show an error message
            if(responseData.valid_token) {
              if (responseData.account_exists) {
                redirectToOrgHome();
              } else {
                showSignUpForm(profile.getName(), profile.getEmail());
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
function showSignUpForm(contactName, email) {
  var signUpForm = document.querySelector('.signup-row');
  var contactNameInput = document.getElementById('contactName');
  var emailInput = document.getElementById('email');

  //pre-populate Contact Name and Contact Email fields with data from Google account:
  contactNameInput.value = contactName;
  emailInput.value = email;

  //display the form
  signUpForm.classList.remove("hidden");
}

// Executed after successful Google sign-in to an existing Voluntr account:
function redirectToOrgHome() {
  var redirectRow = document.querySelector('.redirect-row');
  redirectRow.classList.remove("hidden");
  setTimeout(function() {
    window.location.href="/org/opportunities";    
  }, 1200);
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    //when the sign-out link is clicked, the signOut function is executed
    var signOutLink = document.getElementById("signOut");
    signOutLink.addEventListener("click", signOut);
  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    onSignIn: onSignIn,
    showSignUpForm: showSignUpForm,
    redirectToOrgHome: redirectToOrgHome
  };
}
