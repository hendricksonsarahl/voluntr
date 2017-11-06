var tap = require("tap");

// import browser code to be tested
var idInArray = require("../../static/js/vol.js").idInArray;

tap.test("idInArray function", function(test) {
  var testArray = [{ id: "testId" }];

  test.equal(
    idInArray(testArray, "abc"),
    false,
    "Should return false if target is not an object"
  );

  test.equal(
    idInArray([], { id: "testId" }),
    false,
    "Should return false if array has length 0"
  );

  test.equal(
    idInArray(testArray, { id: "nope" }),
    false,
    "Should return false if target's ID not in array"
  );

  test.equal(
    idInArray(testArray, { id: "testId" }),
    true,
    "Should return true if target's ID is in array"
  );

  test.end();
});
