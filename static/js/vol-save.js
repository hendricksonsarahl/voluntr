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

function showOpps(store, parentElt) {
  store.forEach(function(opp) {
    console.log(opp.title);
    var oppElt = document.createElement('div');
    oppElt.innerHTML = `
    <div class="panel panel-default">
      <div class="panel-body">
        <h4>${opp.title}</h4>
        <div class="pull-right">
          <a class="btn btn-primary" href="#" role="button">View&nbsp;
            <div class="glyphicon glyphicon-play"></div>
          </a>
          <a class="btn btn-danger" href="#" role="button">Remove&nbsp;
            <div class="glyphicon glyphicon-remove"></div>
          </a>
        </div>
      </div>
    </div>
    `
    parentElt.appendChild(oppElt);
  })
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    var store = loadStore();
    var oppListParent = document.getElementById('opp-container');
    showOpps(store, oppListParent);

  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {

  };
}