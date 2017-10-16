// Trivial test to check testing environment

var test = require('tape-catch');
 
function returnHello() {
  return 'hello';
}

test('sample test', function (t) {
  t.plan(1);
  var expected = 'hello'
  t.equal(expected, returnHello());
});