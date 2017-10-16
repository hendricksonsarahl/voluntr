var tap = require("tap");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

// import browser code to be tested
var auth = require("../../static/js/auth.js");
var sourceUrl = "http://localhost:5000/org/login";

//collect tests that require DOM access here:
tap.test("Log-in page", function(test) {

  // JSDOM will create a DOM object from the HTML at the provided URL.
  // This allows us to simulate a browser environment.
  JSDOM.fromURL(sourceUrl).then(dom => {
    global.document = dom.window.document;

    //tests that the starting DOM actually reflects the given page
    test.ok(document.querySelector('.alert-container'),
      'DOM includes an alert-container div'
    );

    test.notOk(document.querySelector('.alert'),
      'Before invoking displayError, DOM does not include an alert div'
    );

    //invoke function being tested
    var stringInput = 'test string input';
    auth.displayError(stringInput);

    test.ok(document.querySelector('.alert'),
      'After invoking displayError with string, DOM includes an alert div'
    );

    var displayedMessage = document.querySelector('.alert').lastChild.nodeValue;
    test.equal(stringInput, displayedMessage, 'Alert div displays message passed as string to displayError');
    
    //always include t.end() in a collection of child tests
    // test.end();
  });

  JSDOM.fromURL(sourceUrl).then(dom => {
    global.document = dom.window.document;

    //invoke function being tested
    var errorInput = new Error('test error object input');
    auth.displayError(errorInput);

    test.ok(document.querySelector('.alert'),
      'After invoking displayError with error object, DOM includes an alert div'
    );

    var displayedMessage = document.querySelector('.alert').lastChild.nodeValue;
    test.equal(errorInput.message, displayedMessage, 'Alert div displays message passed as error object to displayError');
    
    //always include t.end() in a collection of child tests
    test.end();
  })
});
