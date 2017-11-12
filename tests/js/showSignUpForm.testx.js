var tap = require("tap");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

// import browser code to be tested
var frontEndCode = require("../../static/js/org.js");
var sourceUrl = "http://localhost:5000/org/login";

//collect tests that require DOM access here:
tap.test("showSignUpForm function", function(test) {

  // JSDOM will create a DOM object from the HTML at the provided URL.
  // This allows us to simulate a browser environment.
  JSDOM.fromURL(sourceUrl).then(dom => {
    global.document = dom.window.document;

    //tests that the starting DOM actually reflects the given page
    test.ok(document.querySelector('.signup-row'),
      'DOM includes a signup-row div'
    );

    test.ok(document.querySelector('.signup-row').classList.contains("hidden"),
      'Before invoking showSignUpForm, signup-row div has class "hidden"'
    );

    //invoke function being tested
    frontEndCode.showSignUpForm();
    
    test.notOk(document.querySelector('.signup-row').classList.contains("hidden"),
      'After invoking showSignUpForm, signup-row div does not have class "hidden"'
    );

    test.end();
  });

});
