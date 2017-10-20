// add opportunities to a JSON-encoded localStorage array
function saveOpportunity(){

  //used when checking if opportunity had previously been saved
  function checkId(obj) {
    return obj.id === window.currentOpp.id;
  }

  //get the current stored value for savedOpps
  var loadedStore = JSON.parse(localStorage.getItem("savedOpps"));

  //if no local store has been created for savedOpps, create an empty array to hold it
  if(!loadedStore) {
    var newStore = JSON.stringify([])
    localStorage.setItem("savedOpps", newStore);
  }

  //check to see if the opportunity has already been saved:
  if(loadedStore.findIndex(checkId) === -1) {

    //add the currentOpp to the savedOpps store
    loadedStore.push(window.currentOpp);
    localStorage.setItem("savedOpps", JSON.stringify(loadedStore));
  }
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    var saveButton = document.getElementById('save-button');
    saveButton.addEventListener('click', function(e){
      e.preventDefault();
      saveOpportunity();
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