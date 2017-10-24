// TODO: Finish this function
function onSignIn(googleUser) {
  // Build an object with the data we wish to send to server
  var profile = googleUser.getBasicProfile();
  var authToken = googleUser.getAuthResponse().id_token;
  var userDataToSend = {
    contactName: profile.getName(),
    email: profile.getEmail(),
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
            console.log("Success! Server responded with: ", responseData);
            
            if (responseData.valid_token && responseData.account_exists) {
              redirectToOrgHome();
            } else {
              showSignUpForm();
            }
          })
          .catch(displayError);
      }
    })
    .catch(displayError);
}

// Executed after successful Google sign-in, with no existing Voluntr account:
function showSignUpForm() {
  var signUpForm = document.querySelector('.signup-row');
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
