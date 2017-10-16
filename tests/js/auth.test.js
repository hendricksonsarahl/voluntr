var tap = require("tap");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

// import browser code to be tested
var auth = require("../../static/js/auth.js");

//collect tests that require DOM access here:
tap.test("Log-in page", function(test) {

  // JSDOM will create a DOM object from the HTML at the provided URL.
  // This allows us to simulate a browser environment.
  var url = "http://localhost:5000/org/login";
  JSDOM.fromURL(url).then(dom => {
    var document = dom.window.document;

    //tests that the returned DOM actually reflects the given page
    test.ok(document.querySelector('.container'),
      'DOM includes a container div'
    );
    
    //always include t.end() in a collection of child tests
    test.end();
  })
  .catch(err => {
    console.error(`Error: Tests for ${url} did not run. Is the Flask app running on localhost:5000?`);
  });
});
