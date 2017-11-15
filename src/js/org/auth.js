// Collects all account/authorization functions

import {displayError, deleteCookie} from './helpers';

// Executed after successful Google sign-in, with no existing Voluntr account:
export function showSignUpForm(contactName, email, token) {
  const signUpForm = document.querySelector(".signup-row");
  const googleDiv = document.querySelector(".g-signin2");
  const contactNameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("email");
  const tokenInput = document.getElementById("token");

  // pre-populate Contact Name and Contact Email fields with data from Google account:
  contactNameInput.value = contactName;
  emailInput.value = email;
  tokenInput.value = token;

  // display the form, hide the Google sign-in button
  signUpForm.classList.remove("hidden");
  googleDiv.classList.add("hidden");
}

// Executed after successful Google sign-in to an existing Voluntr account:
export function redirectToOrgHome() {
  const redirectRow = document.querySelector(".redirect-row");
  const googleDiv = document.querySelector(".g-signin2");

  redirectRow.classList.remove("hidden");
  googleDiv.classList.add("hidden");

  setTimeout(() => {
    window.location.href = "/org/opportunities";
  }, 1200);
}

// Callback function for Google API's sign-in event
export function onSignIn(googleUser) {
  // Only proceed if called from login page:
  if (window.location.pathname !== "/org/login") {
    return false;
  }

  const profile = googleUser.getBasicProfile();
  const authToken = googleUser.getAuthResponse().id_token;

  // Build an object with the data we wish to send to server
  const userDataToSend = {
    authToken
  };

  // build a fetch request to POST user's Google data to server for verification:
  const authUrl = "/org/login";
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(userDataToSend)
  };

  requestOptions.headers = new Headers();
  requestOptions.headers.append("Content-Type", "application/json");

  // Send the request, and respond to both successful and failure outcomes:
  return fetch(authUrl, requestOptions)
    .then(response => {
      if (response.status >= 300) {
        displayError(response);
      } else {
        response
          .json()
          .then(responseData => {
            // Based on token validity, and Voluntr account existence, either:
            // Redirect to logged-in view, show sign-up form, or show an error message
            if (responseData.valid_token) {
              if (responseData.account_exists) {
                // add token to cookie, then redirect to logged-in view
                document.cookie = `token=${responseData.token}; path=/`;
                redirectToOrgHome();
              } else {
                showSignUpForm(
                  profile.getName(),
                  profile.getEmail(),
                  authToken
                );
              }
            } else {
              throw Error("Received invalid Google authorization token.");
            }
          })
          .catch(displayError);
      }
    })
    .catch(displayError);
}

// Sign out of Google connection, delete token cookie, then redirect to "/"
export function signOut(event) {
  // don't immediately redirect the user
  event.preventDefault();

  // send sign-out request to Google
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
  auth2.signOut().then(() => {
    // delete the OAuth token from browser cookies:
    deleteCookie("token");

    // redirect user after confirmation of sign-out received
    window.location.href = "/";
  });
}