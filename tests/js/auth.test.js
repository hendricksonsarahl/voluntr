var test = require("tape-catch");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var frontEndCode = require('../../static/js/auth.js');

// create a DOM from the HTML of the site at the given address, then pass it to the test suite
var url = "http://localhost:5000/org/login";
JSDOM.fromURL(url)
  .then(dom => {
    runTests(dom);
  })
  .catch(err => {
    console.log(`Error: Tests for ${url} did not run.`, err);
  });

// collect all tests inside this function:
function runTests(dom) {
  global.document = dom.window.document;

  function returnHi() {
    return "hi";
  }

  test("auth test", function(t) {
    t.plan(1);
    var expected = "hi";
    t.equal(expected, returnHi());
  });

  test("auth test B", function(t) {
    t.plan(1);
    var expected = "hi";
    t.equal(expected, returnHi());
  });
}

