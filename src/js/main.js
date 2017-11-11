import { onSignIn, signOut } from "./org/auth";
import { toggleFlexible } from "./org/opp-forms";
import { idInArray } from "./vol/helpers";
import {
  loadStore,
  saveOpportunity,
  removeOppFromStore
} from "./vol/local-storage";
import {
  selectAllCategories,
  toggleSelectAllCheckbox
} from "./vol/filters-form";
import { updateSaveButton, renderSavedOpps } from "./vol/dom-saved-opps";

// Webpack checks uses file as entry point for bundling CSS assets
import "../../node_modules/bootswatch/cosmo/bootstrap.min.css";
import "../../node_modules/intro.js/introjs.css";
import "../css/main.css";

// don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  // Code in this anonymous function is immediately invoked once this script loads:
  (() => {
    // get data from localStorage:
    let store = loadStore();

    // create variables from DOM elements
    // if a given element isn't found on the current page, its variable has value of null
    const signOutLink = document.querySelectorAll(".signOutLink");
    const flexibleCheckbox = document.getElementById("flexible");
    const selectAllButton = document.getElementById("selectAll");
    const categoryInputs = document.querySelectorAll("input[name=category]");
    const saveButton = document.getElementById("save-button");
    const oppListParent = document.getElementById("opp-container");
    const tutorialButton = document.getElementById("tutorial-button");

    // Give the onSignIn callback function a global scope, so it can be accessed by Google's gapi script
    window.onSignIn = onSignIn;

    // start the Intro JS tour when Tutorial button is clicked
    if (tutorialButton) {
      tutorialButton.addEventListener("click", () => {
        window.introJs.introJs().setOption("showProgress", true).start();
      });
    }

    // when the sign-out link is clicked, the signOut function is executed
    if (signOutLink) {
      signOutLink.forEach(link => {
        link.addEventListener("click", signOut);
      });
    }

    // set up Add/Edit opp forms:
    if (flexibleCheckbox) {
      flexibleCheckbox.addEventListener("click", toggleFlexible);
    }

    // set up Filters page:
    if (selectAllButton) {
      selectAllButton.addEventListener("change", selectAllCategories);
      categoryInputs.forEach(cat => {
        cat.addEventListener("change", toggleSelectAllCheckbox);
      });
    }

    // set up Browse Opportunities page:
    if (saveButton) {
      // update the save button if the opp is already saved on page load
      // (currentOpp is a global variable loaded in the HTML created by the Jinja template)

      if (idInArray(store, currentOpp)) {
        updateSaveButton.bind(saveButton)(true);
      }

      // on Save Button click, add the opp to localStorage and change button appearance
      saveButton.addEventListener("click", e => {
        // depending on if the opportunity has already been saved, either save or remove it:
        if (!idInArray(store, currentOpp)) {
          saveOpportunity(store, currentOpp);
          updateSaveButton.bind(e.target)(true);
          store = loadStore();
        } else {
          removeOppFromStore(currentOpp.id);
          updateSaveButton.bind(e.target)(false);
          store = loadStore();
        }
      });
    }

    // set up My Saved Opportunities page:
    if (oppListParent) {
      // initial render
      renderSavedOpps(store, oppListParent);

      // listen for clicks on Remove buttons
      oppListParent.addEventListener("click", e => {
        if (
          e.target.classList.contains("remove-button") ||
          e.target.parentNode.classList.contains("remove-button")
        ) {
          const clickedOppId =
            e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
          removeOppFromStore(clickedOppId);

          // re-load the store from localStorage, and re-render the view
          store = loadStore();
          renderSavedOpps(store, oppListParent);
        }
      });
    }
  })();
}
