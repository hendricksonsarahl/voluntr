var tap = require("tap");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

// import browser code to be tested
var frontEndCode = require("../../static/js/org.js");
var sourceUrl = "http://localhost:5000/org/login";

//collect tests that require DOM access here:
tap.test("redirectToOrgHome function", function(test) {

  // JSDOM will create a DOM object from the HTML at the provided URL.
  // This allows us to simulate a browser environment.
  JSDOM.fromURL(sourceUrl).then(dom => {
    global.window = dom.window;
    global.document = dom.window.document;

    //tests that the starting DOM actually reflects the given page
    test.ok(document.querySelector('.redirect-row'),
      'DOM includes a redirect-row div'
    );

    test.ok(document.querySelector('.redirect-row').classList.contains("hidden"),
      'Before invoking, redirect-row div has class "hidden"'
    );

    // test.equal('/org/login', window.location.pathname, 
    //   'Before invoking, browser is on login page'
    // );

    //invoke function being tested
    frontEndCode.redirectToOrgHome();
    
    test.notOk(document.querySelector('.redirect-row').classList.contains("hidden"),
      'After invoking, redirect-row div does not have class "hidden"'
    );

    console.log(window.location.pathname);
    // TODO: figure out simulating navigation in JSDOM
    // test.equal('/org/opportunities', window.location.pathname, 
    //   'After invoking, browser is on org homepage'
    // );

    test.end();
  });

});
