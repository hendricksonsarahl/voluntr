webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _auth = __webpack_require__(2);

var _oppForms = __webpack_require__(4);

var _helpers = __webpack_require__(5);

var _localStorage = __webpack_require__(6);

var _filtersForm = __webpack_require__(7);

var _savedOppsPage = __webpack_require__(44);

var _saveButton = __webpack_require__(43);

__webpack_require__(9);

// don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  // Code in this anonymous function is immediately invoked once this script loads:
  (function () {
    // get data from localStorage:
    var store = (0, _localStorage.loadStore)();

    // create variables from DOM elements
    // if a given element isn't found on the current page, its variable has value of null
    var signOutLink = document.querySelectorAll(".signOutLink");
    var flexibleCheckbox = document.getElementById("flexible");
    var selectAllButton = document.getElementById("selectAll");
    var categoryInputs = document.querySelectorAll("input[name=category]");
    var saveButton = document.getElementById("save-button");
    var oppListParent = document.getElementById("opp-container");
    var tutorialButton = document.getElementById("tutorial-button");

    // Give the onSignIn callback function a global scope, so it can be accessed by Google's gapi script
    window.onSignIn = _auth.onSignIn;

    // start the Intro JS tour when Tutorial button is clicked
    if (tutorialButton) {
      tutorialButton.addEventListener("click", function () {
        window.introJs.introJs().setOption("showProgress", true).start();
      });
    }

    // when the sign-out link is clicked, the signOut function is executed
    if (signOutLink) {
      signOutLink.forEach(function (link) {
        link.addEventListener("click", _auth.signOut);
      });
    }

    // set up Add/Edit opp forms:
    if (flexibleCheckbox) {
      flexibleCheckbox.addEventListener("click", _oppForms.toggleFlexible);
    }

    // set up Filters page:
    if (selectAllButton) {
      selectAllButton.addEventListener("change", _filtersForm.selectAllCategories);
      categoryInputs.forEach(function (cat) {
        cat.addEventListener("change", _filtersForm.toggleSelectAllCheckbox);
      });
    }

    // set up Browse Opportunities page:
    if (saveButton) {
      // update the save button if the opp is already saved on page load
      // (currentOpp is a global variable loaded in the HTML created by the Jinja template)

      if ((0, _helpers.idInArray)(store, currentOpp)) {
        _saveButton.updateSaveButton.bind(saveButton)(true);
      }

      // on Save Button click, add the opp to localStorage and change button appearance
      saveButton.addEventListener("click", function (e) {
        // depending on if the opportunity has already been saved, either save or remove it:
        if (!(0, _helpers.idInArray)(store, currentOpp)) {
          (0, _localStorage.saveOpportunity)(store, currentOpp);
          _saveButton.updateSaveButton.bind(e.target)(true);
          store = (0, _localStorage.loadStore)();
        } else {
          (0, _localStorage.removeOppFromStore)(currentOpp.id);
          _saveButton.updateSaveButton.bind(e.target)(false);
          store = (0, _localStorage.loadStore)();
        }
      });
    }

    // set up My Saved Opportunities page:
    if (oppListParent) {
      // initial render
      (0, _savedOppsPage.renderSavedOpps)(store, oppListParent);

      // listen for clicks on Remove buttons
      oppListParent.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-button") || e.target.parentNode.classList.contains("remove-button")) {
          var clickedOppId = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
          (0, _localStorage.removeOppFromStore)(clickedOppId);

          // re-load the store from localStorage, and re-render the view
          store = (0, _localStorage.loadStore)();
          (0, _savedOppsPage.renderSavedOpps)(store, oppListParent);
        }
      });
    }
  })();
}

// Webpack uses this file as entry point for bundling CSS assets

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSignUpForm = showSignUpForm;
exports.redirectToOrgHome = redirectToOrgHome;
exports.onSignIn = onSignIn;
exports.signOut = signOut;

var _helpers = __webpack_require__(3);

// Executed after successful Google sign-in, with no existing Voluntr account:
function showSignUpForm(contactName, email, token) {
  var signUpForm = document.querySelector(".signup-row");
  var googleDiv = document.querySelector(".g-signin2");
  var contactNameInput = document.getElementById("contactName");
  var emailInput = document.getElementById("email");
  var tokenInput = document.getElementById("token");

  // pre-populate Contact Name and Contact Email fields with data from Google account:
  contactNameInput.value = contactName;
  emailInput.value = email;
  tokenInput.value = token;

  // display the form, hide the Google sign-in button
  signUpForm.classList.remove("hidden");
  googleDiv.classList.add("hidden");
}

// Executed after successful Google sign-in to an existing Voluntr account:
// Collects all account/authorization functions

function redirectToOrgHome() {
  var redirectRow = document.querySelector(".redirect-row");
  var googleDiv = document.querySelector(".g-signin2");

  redirectRow.classList.remove("hidden");
  googleDiv.classList.add("hidden");

  setTimeout(function () {
    window.location.href = "/org/opportunities";
  }, 1200);
}

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
  return fetch(authUrl, requestOptions).then(function (response) {
    if (response.status >= 300) {
      (0, _helpers.displayError)(response);
    } else {
      response.json().then(function (responseData) {
        // Based on token validity, and Voluntr account existence, either:
        // Redirect to logged-in view, show sign-up form, or show an error message
        if (responseData.valid_token) {
          if (responseData.account_exists) {
            // add token to cookie, then redirect to logged-in view
            document.cookie = "token=" + responseData.token + "; path=/";
            redirectToOrgHome();
          } else {
            showSignUpForm(profile.getName(), profile.getEmail(), authToken);
          }
        } else {
          throw Error("Received invalid Google authorization token.");
        }
      }).catch(_helpers.displayError);
    }
  }).catch(_helpers.displayError);
}

// Sign out of Google connection, delete token cookie, then redirect to "/"
function signOut(event) {
  // don't immediately redirect the user
  event.preventDefault();

  // send sign-out request to Google
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
  auth2.signOut().then(function () {
    // delete the OAuth token from browser cookies:
    (0, _helpers.deleteCookie)("token");

    // redirect user after confirmation of sign-out received
    window.location.href = "/";
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayError = displayError;
exports.deleteCookie = deleteCookie;
// display error messages as Bootstrap alert elements in browser
// Bootstrap will handle closing them
function displayError(err) {
  // allow for direct input of error objects:
  if (err instanceof Error) {
    err = err.message;
  }

  // select a container for the alert
  var alertContainer = document.querySelector(".alert-container");

  // build a new DOM element
  var alert = document.createElement("div");
  alert.className = "alert alert-danger alert-dismissible fade in";
  alert.innerHTML = "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>Error: </strong>" + err;

  // append the new DOM element to the container
  alertContainer.appendChild(alert);
}

// delete a cookie by setting its expiration date in the past
function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleFlexible = toggleFlexible;
// Update form to require/not allow date and times, based on Flexible Schedule checkbox
function toggleFlexible(e) {
  var scheduleInputs = document.querySelectorAll(".schedule-input");
  var scheduleLabels = document.querySelectorAll(".schedule-label");
  var addressInput = document.getElementById("address");

  if (e.target.checked) {
    // Dim labels and inputs, stop requiring them, mark input disabled
    scheduleLabels.forEach(function (label) {
      label.classList.add("text-muted");
    });
    scheduleInputs.forEach(function (input) {
      input.removeAttribute("required");
      input.setAttribute("disabled", true);
    });

    // Focus the address input
    addressInput.focus();
  } else {
    // Reset labels and inputs to initial state
    scheduleLabels.forEach(function (label) {
      label.classList.remove("text-muted");
    });
    scheduleInputs.forEach(function (input) {
      input.setAttribute("required", true);
      input.removeAttribute("disabled");
    });
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idInArray = idInArray;
// Collects all helper functions (should be pure functions, without side effects)

// returns true iff target object's ID matches the ID of an element in the provided array
function idInArray(arr, target) {
  function checkId(obj) {
    // window.currentOpp is a global variable loaded in the HTML created by the Jinja template
    return obj.id === target.id;
  }

  return arr.findIndex(checkId) > -1;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadStore = loadStore;
exports.saveOpportunity = saveOpportunity;
exports.removeOppFromStore = removeOppFromStore;
// Collects all localStorage manipulation

// return the savedOpps value in localStorage. if it doesn't exist yet, create an empty array first
function loadStore() {
  // get the current stored value for savedOpps
  var store = JSON.parse(localStorage.getItem("savedOpps"));

  // if no local store has been created for savedOpps, create an empty array to hold it
  if (!store) {
    store = [];
  }

  return store;
}

// add opportunities to a JSON-encoded localStorage array
function saveOpportunity(store, opp) {
  // add the page's currentOpp to the provided store, then save it to localStorage
  store.push(opp);
  localStorage.setItem("savedOpps", JSON.stringify(store));
}

// Remove an opportunity from localStorage
function removeOppFromStore(oppId) {
  var oppList = loadStore();

  // Find the index of the target opportunity in the store:
  var indexToRemove = oppList.findIndex(function (opp) {
    return opp.id === parseInt(oppId, 10);
  });

  // Remove the opportunity from the store and save to localStorage
  if (indexToRemove > -1) {
    oppList.splice(indexToRemove, 1);
    localStorage.setItem("savedOpps", JSON.stringify(oppList));
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAllCategories = selectAllCategories;
exports.toggleSelectAllCheckbox = toggleSelectAllCheckbox;
// Collects all functions enchancing the filters form

// On filters form, check all category boxes
function selectAllCategories() {
  var categoryInputs = document.querySelectorAll("input[name=category]");
  var selectAllCheckbox = document.querySelector("#selectAll input");

  if (selectAllCheckbox.checked) {
    categoryInputs.forEach(function (catInput) {
      catInput.checked = true;
    });
  } else {
    categoryInputs.forEach(function (catInput) {
      catInput.checked = false;
    });
  }
}

// Select All checkbox should be checked exactly when all other checkboxes are checked
function toggleSelectAllCheckbox() {
  var selectAllCheckbox = document.querySelector("#selectAll input");
  var categoryInputs = document.querySelectorAll("input[name=category]");
  if (!this.checked) {
    // when another box is un-checked, also un-check selectAllCheckbox
    selectAllCheckbox.checked = false;
  } else {

    // when another box is checked, see if that makes ALL other boxes checked, and check selectAllCheckbox if so
    var allChecked = true;
    for (var i = 0; i < categoryInputs.length; i++) {
      if (!categoryInputs[i].checked) {
        allChecked = false;
      }
    }
    if (allChecked) {
      selectAllCheckbox.checked = true;
    }
  }
}

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(14);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSaveButton = updateSaveButton;
// change the appearance and text of the save button when an opp is saved or removed
function updateSaveButton(isSaved) {
  if (isSaved) {
    this.classList.remove("btn-default");
    this.classList.add("btn-success");
    this.innerHTML = 'Saved!&nbsp;<span class="glyphicon glyphicon-ok"></span>';
  } else {
    this.classList.add("btn-default");
    this.classList.remove("btn-success");
    this.innerHTML = 'Save&nbsp;<span class="glyphicon glyphicon-pushpin"></span>';
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showOpps = showOpps;
exports.showNoOppsMessage = showNoOppsMessage;
exports.renderSavedOpps = renderSavedOpps;
// Collects all DOM Manipulation for the opp-saving feature

// map the opportunities found in localStorage to HTML panels, then append them to a container
function showOpps(store, parentElt) {
  var headerElt = document.createElement("h2");
  headerElt.textContent = "My Saved Posts";
  parentElt.appendChild(headerElt);

  store.forEach(function (opp) {
    var oppElt = document.createElement("div");
    oppElt.innerHTML = "\n    <div class=\"panel panel-default\" data-id=\"" + opp.id + "\">\n      <div class=\"panel-body\">\n        <h4>" + opp.title + "\n          <br />\n          <small>" + opp.event_date + "</small>\n        </h4>\n        <div class=\"pull-right\">\n          <form action=\"/match\" method=\"post\">\n            <input type=\"hidden\" name=\"oppId\" value=\"" + opp.id + "\"/>\n            <button type=\"submit\" class=\"btn btn-primary\">View&nbsp;\n              <span class=\"glyphicon glyphicon-play\"></span>\n            </button>\n            <a class=\"btn btn-danger remove-button\" href=\"#\" role=\"button\">Remove&nbsp;\n            <div class=\"glyphicon glyphicon-remove\"></div>\n            </a>\n          </form>\n        </div>\n      </div>\n    </div>\n    ";
    parentElt.appendChild(oppElt);
  });
}

// Display message if no opportunities have been saved yet
function showNoOppsMessage(parentElt) {
  parentElt.innerHTML = '<h2>Nothing Saved Yet</h2><p><a href="/opportunities">Continue browsing opportunities</a></p>';
}

// Update the display
function renderSavedOpps(store, parentElt) {
  // Remove everything currently in parentElt
  parentElt.innerHTML = "";

  // Show saved opps as panels if they exist; otherwise show a message
  if (store.length > 0) {
    showOpps(store, parentElt);
  } else {
    showNoOppsMessage(parentElt);
  }
}

/***/ })
],[1]);