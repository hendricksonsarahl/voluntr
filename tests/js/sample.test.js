var test = require('tape-catch');

function returnHello() {
  return 'hello';
}

test('sample test', function (t) {  
  var expected = 'hello'
  t.equal(expected, returnHello());
  t.end();
});
