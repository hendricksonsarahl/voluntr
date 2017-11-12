// Collects all DOM Manipulation for the opp-saving feature

// map the opportunities found in localStorage to HTML panels, then append them to a container
export function showOpps(store, parentElt) {
  const headerElt = document.createElement("h2");
  headerElt.textContent = "My Saved Posts";
  parentElt.appendChild(headerElt);

  store.forEach(opp => {
    const oppElt = document.createElement("div");
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
export function showNoOppsMessage(parentElt) {
  parentElt.innerHTML =
    '<h2>Nothing Saved Yet</h2><p><a href="/opportunities">Continue browsing opportunities</a></p>';
}

// Update the display
export function renderSavedOpps(store, parentElt) {
  // Remove everything currently in parentElt
  parentElt.innerHTML = "";

  // Show saved opps as panels if they exist; otherwise show a message
  if (store.length > 0) {
    showOpps(store, parentElt);
  } else {
    showNoOppsMessage(parentElt);
  }
}