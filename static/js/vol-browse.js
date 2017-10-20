// returns true if the page's opportunity is in the provided array
function isSaved(arr) {
  function checkId(obj) {

    //window.currentOpp is a global variable loaded in the HTML created by the Jinja template
    return obj.id === window.currentOpp.id;
  }

  return arr.findIndex(checkId) > -1
}

// return the savedOpps value in localStorage. if it doesn't exist yet, create an empty array first
function loadStore() {
  //get the current stored value for savedOpps
  var store = JSON.parse(localStorage.getItem("savedOpps"));

  //if no local store has been created for savedOpps, create an empty array to hold it
  if(!store) {
    var newStore = JSON.stringify([])
    localStorage.setItem("savedOpps", newStore);
    store = JSON.parse(localStorage.getItem("savedOpps"));
  }

  return store;
}

// add opportunities to a JSON-encoded localStorage array
function saveOpportunity(store){

  //check to see if the opportunity has already been saved:
  if(!isSaved(store)) {

    //add the page's currentOpp to the savedOpps store
    store.push(window.currentOpp);
    localStorage.setItem("savedOpps", JSON.stringify(store));
  }
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
    
    // update the save button if the opp is already saved
    if (isSaved(store)) {
      updateSaveButton.bind(saveButton)();
    }

    // on Save click, add the opp to localStorage and change button appearance
    saveButton.addEventListener('click', function(e){
      e.preventDefault();
      saveOpportunity(store);
      updateSaveButton.bind(this)();
    });

  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    saveOpportunity: saveOpportunity
  };
}