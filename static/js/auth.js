function onSignIn(googleUser) {

  // Useful data for client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

//This function isn't actually being called at the moment
function signinCallback(authResult) {
  if (authResult['access_token']) {

    // The user is signed in
    var loc = 'index.jsp?GoogleAuthToken=' + authResult['access_token'];
    window.location.href = loc;
  } else if (authResult['error']) {

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
  auth2.signOut()
    .then(function () {
      console.log('User signed out.');

      //redirect user after confirmation of sign-out received
      window.location.href='/';
    }
  );
}

// Code in this anonymous function is immediately invoked once this script loads:
(function() {

  //when the sign-out link is clicked, the signOut function is executed
  var signOutLink = document.getElementById('signOut');
  signOutLink.addEventListener('click', signOut);
}());
