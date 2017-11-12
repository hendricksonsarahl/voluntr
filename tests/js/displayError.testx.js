// import { displayError } from "../../src/js/org/helpers.js";

// describe('displayError', () => {
//   const emptyArray = [];
//   const testArray = [{ id: 1 }];
//   const notAnObj = "abc";
//   const objInArray = { id: 1 };
//   const objNotInArray = { id: 2 };

//   it("Should return false if target is not an object", () => {
//     expect(idInArray(testArray, notAnObj)).toBe(false);
//   });

//   it("Should return false if array has length 0", () => {
//     expect(idInArray(emptyArray, objInArray)).toBe(false);
//   });

//   it("Should return false if target's ID not in array", () => {
//     expect(idInArray(testArray, objNotInArray)).toBe(false);
//   });

//   it("Should return true if target's ID is in array", () => {
//     expect(idInArray(testArray, objInArray)).toBe(true);
//   });

// });

// var tap = require("tap");
// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;

// // import browser code to be tested
// var sourceUrl = "http://localhost:5000/org/login";

// //collect tests that require DOM access here:
// tap.test("displayError function", function(test) {

//   // JSDOM will create a DOM object from the HTML at the provided URL.
//   // This allows us to simulate a browser environment.
//   JSDOM.fromURL(sourceUrl).then(dom => {
//     global.document = dom.window.document;

//     //tests that the starting DOM actually reflects the given page
//     test.ok(document.querySelector('.alert-container'),
//       'DOM includes an alert-container div'
//     );

//     test.notOk(document.querySelector('.alert'),
//       'Before invoking displayError, DOM does not include an alert div'
//     );

//     //invoke function being tested
//     var stringInput = 'test string input';
//     frontEndCode.displayError(stringInput);

//     test.ok(document.querySelector('.alert'),
//       'After invoking displayError with string, DOM includes an alert div'
//     );

//     var displayedMessage = document.querySelector('.alert').lastChild.nodeValue;
//     test.equal(stringInput, displayedMessage, 'Alert div displays message passed as string to displayError');

//   });

//   JSDOM.fromURL(sourceUrl).then(dom => {
//     global.document = dom.window.document;

//     //invoke function being tested
//     var errorInput = new Error('test error object input');
//     frontEndCode.displayError(errorInput);

//     test.ok(document.querySelector('.alert'),
//       'After invoking displayError with error object, DOM includes an alert div'
//     );

//     var displayedMessage = document.querySelector('.alert').lastChild.nodeValue;
//     test.equal(errorInput.message, displayedMessage, 'Alert div displays message passed as error object to displayError');
    
//     //always include t.end() in a collection of child tests
//     test.end();
//   })
// });
