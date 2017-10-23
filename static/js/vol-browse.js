// returns true iff target object's ID matches the ID of an element in the provided array
function idInArray(arr, target) {
  function checkId(obj) {

    //window.currentOpp is a global variable loaded in the HTML created by the Jinja template
    return obj.id === target.id;
  }

  return arr.findIndex(checkId) > -1
}

// return the savedOpps value in localStorage. if it doesn't exist yet, create an empty array first
function loadStore() {

  //get the current stored value for savedOpps
  var store = JSON.parse(localStorage.getItem("savedOpps"));

  //if no local store has been created for savedOpps, create an empty array to hold it
  if(!store) {
    store = [];
  }

  return store;
}

// add opportunities to a JSON-encoded localStorage array
function saveOpportunity(store, opp){

    //add the page's currentOpp to the provided store, then save it to localStorage
    store.push(opp);
    localStorage.setItem("savedOpps", JSON.stringify(store));
}

// change the appearance and text of the save button if the opp has been saved
function updateSaveButton() {
  this.classList.remove('btn-default')
  this.classList.add('btn-success');
  this.innerHTML = 'Saved!&nbsp;<span class="glyphicon glyphicon-ok"></span>';  
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    var store = loadStore();
    var saveButton = document.getElementById('save-button');
    //currentOpp is a global variable loaded in the HTML created by the Jinja template
    
    // update the save button if the opp is already saved on page load
    if (idInArray(store, currentOpp)) {
      updateSaveButton.bind(saveButton)();
    }

    // on Save Button click, add the opp to localStorage and change button appearance
    saveButton.addEventListener('click', function(){

      //check to see if the opportunity has already been saved:
      if(!idInArray(store, currentOpp)) {
        saveOpportunity(store, currentOpp);
        updateSaveButton.bind(this)();
      }
    });

  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    idInArray: idInArray,
    loadStore: loadStore,
    saveOpportunity: saveOpportunity,
    updateSaveButton: updateSaveButton
  };
}