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

// map the opportunities found in localStorage to HTML panels, then append them to a container
function showOpps(store, parentElt) {
  var headerElt = document.createElement('h2');
  headerElt.textContent = 'My Saved Posts';
  parentElt.appendChild(headerElt);

  store.forEach(function(opp) {
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

// Display message if no opportunities have been saved yet
function showNoOppsMessage(parentElt) {
  parentElt.innerHTML = '<h2>Nothing Saved Yet</h2><p><a href="/opportunities">Continue browsing opportunities</a></p>'
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    var store = loadStore();
    var oppListParent = document.getElementById('opp-container');
    
    // Show saved opps if they exist; otherwise show a message
    if (store.length > 0) {
      showOpps(store, oppListParent);
    } else {
      showNoOppsMessage(oppListParent);
    }
  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {

  };
}