// TODO: Finish this function and call it on successful sign-in.
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
            // TODO: Create an actual response here. Should request more data from new users, and redirect to logged-in view for returning users.
            console.log("Success! Server responded with: ", responseData);
          })
          .catch(displayError);
      }
    })
    .catch(displayError);
}

// TODO: remove this once the above function works
function onSignInTemp(googleUser) {
  // Useful data for client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Full Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

//TODO: This function isn't actually being called at the moment. Do we need it?
function signinCallback(authResult) {
  if (authResult["access_token"]) {
    // The user is signed in
    var loc = "index.jsp?GoogleAuthToken=" + authResult["access_token"];
    window.location.href = loc;
  } else if (authResult["error"]) {
    // There was an error, which means the user is not signed in.
    console.error(authResult);
    return false;
  }
}

function signOut(event) {
  //don't immediately redirect the user
  event.preventDefault();

  //send sign-out request to Google
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");

    //redirect user after confirmation of sign-out received
    window.location.href = "/";
  });
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
    signOut: signOut
  };
}
