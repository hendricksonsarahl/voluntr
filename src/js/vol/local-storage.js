// Collects all localStorage manipulation

// return the savedOpps value in localStorage. if it doesn't exist yet, create an empty array first
export function loadStore() {
  // get the current stored value for savedOpps
  let store = JSON.parse(localStorage.getItem("savedOpps"));

  // if no local store has been created for savedOpps, create an empty array to hold it
  if (!store) {
    store = [];
  }

  return store;
}

// add opportunities to a JSON-encoded localStorage array
export function saveOpportunity(store, opp) {
  // add the page's currentOpp to the provided store, then save it to localStorage
  store.push(opp);
  localStorage.setItem("savedOpps", JSON.stringify(store));
}

// Remove an opportunity from localStorage
export function removeOppFromStore(oppId) {
  const oppList = loadStore();

  // Find the index of the target opportunity in the store:
  const indexToRemove = oppList.findIndex(opp => opp.id === parseInt(oppId, 10));

  // Remove the opportunity from the store and save to localStorage
  if (indexToRemove > -1) {
    oppList.splice(indexToRemove, 1);
    localStorage.setItem("savedOpps", JSON.stringify(oppList));
  }
}