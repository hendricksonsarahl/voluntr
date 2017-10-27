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
  if (!store) {
    store = [];
  }

  return store;
}

// map the opportunities found in localStorage to HTML panels, then append them to a container
function showOpps(store, parentElt) {
  var headerElt = document.createElement("h2");
  headerElt.textContent = "My Saved Posts";
  parentElt.appendChild(headerElt);

  store.forEach(function(opp) {
    var oppElt = document.createElement("div");
    oppElt.innerHTML = `
    <div class="panel panel-default" data-id="${opp.id}">
      <div class="panel-body">
        <h4>${opp.title}
          <br />
          <small>${opp.event_date}</small>
        </h4>
        <div class="pull-right">
          <form action="/match" method="post">
            <input type="hidden" name="oppId" value="${opp.id}"/>
            <button type="submit" class="btn btn-primary">View&nbsp;
              <span class="glyphicon glyphicon-play"></span>
            </button>
            <a class="btn btn-danger remove-button" href="#" role="button">Remove&nbsp;
            <div class="glyphicon glyphicon-remove"></div>
            </a>
          </form>
        </div>
      </div>
    </div>
    `;
    parentElt.appendChild(oppElt);
  });
}

// Display message if no opportunities have been saved yet
function showNoOppsMessage(parentElt) {
  parentElt.innerHTML =
    '<h2>Nothing Saved Yet</h2><p><a href="/opportunities">Continue browsing opportunities</a></p>';
}

// add opportunities to a JSON-encoded localStorage array
function saveOpportunity(store, opp){

    //add the page's currentOpp to the provided store, then save it to localStorage
    store.push(opp);
    localStorage.setItem("savedOpps", JSON.stringify(store));
}

// change the appearance and text of the save button when an opp is saved or removed
function updateSaveButton(isSaved) {
  if (isSaved) {
    this.classList.remove('btn-default');
    this.classList.add('btn-success');
    this.innerHTML = 'Saved!&nbsp;<span class="glyphicon glyphicon-ok"></span>';  
  } else {
    this.classList.add('btn-default');
    this.classList.remove('btn-success');
    this.innerHTML = 'Save&nbsp;<span class="glyphicon glyphicon-pushpin"></span>';  
  }
}

// Remove an opportunity from localStorage
function removeOppFromStore(oppId) {
  var oppList = loadStore();

  // Find the index of the target opportunity in the store:
  var indexToRemove = oppList.findIndex(function(opp) {
    return opp.id == oppId;
  });

  // Remove the opportunity from the store and save to localStorage
  oppList.splice(indexToRemove, 1);
  localStorage.setItem("savedOpps", JSON.stringify(oppList));
}

// Remove an opportunity's panel from the page
function removeOppFromPage(oppPanel) {

  //Remove the opportunity's panel from this page:
  oppPanel.parentNode.removeChild(oppPanel);
}

// Update the display
function render(store, parentElt) {

  // Remove everything currently in parentElt
  parentElt.innerHTML = "";

  // Show saved opps as panels if they exist; otherwise show a message
  if (store.length > 0) {
    showOpps(store, parentElt);
  } else {
    showNoOppsMessage(parentElt);
  }
}

//don't run this outside of a browser environment (e.g., when testing in Node)
if (typeof window !== "undefined") {
  // Code in this anonymous function is immediately invoked once this script loads:
  (function() {
    var store = loadStore();
    
    // set up Browse Opportunities page:
    if(window.location.pathname === "/opportunities") {
      var saveButton = document.getElementById('save-button');
      //currentOpp is a global variable loaded in the HTML created by the Jinja template
      
      // update the save button if the opp is already saved on page load
      if (idInArray(store, currentOpp)) {
        updateSaveButton.bind(saveButton)(true);
      }

      // on Save Button click, add the opp to localStorage and change button appearance
      saveButton.addEventListener('click', function(){
        //depending on if the opportunity has already been saved, either save or remove it:
        if(!idInArray(store, currentOpp)) {
          saveOpportunity(store, currentOpp);
          updateSaveButton.bind(this)(true);
          store = loadStore();
        } else {
          removeOppFromStore(currentOpp.id);
          updateSaveButton.bind(this)(false);
          store = loadStore();
        }
      });

    // set up My Saved Opportunities page:
    } else if (window.location.pathname === "/matches") {
      var oppListParent = document.getElementById("opp-container");

      //initial render
      render(store, oppListParent);

      //listen for clicks on Remove buttons
      oppListParent.addEventListener("click", function(e) {
        if (
          e.target.classList.contains("remove-button") ||
          e.target.parentNode.classList.contains("remove-button")
        ) {
          var clickedOppId = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
          removeOppFromStore(clickedOppId);

          //re-load the store from localStorage, and re-render the view
          store = loadStore();
          render(store, oppListParent);
        }
      });
    }
  })();
}

// Export all named, top-level functions for use in unit tests.
// The leading if statement should prevent this block from running in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {};
}
