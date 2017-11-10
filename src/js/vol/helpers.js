// Collects all helper functions (should be pure functions, without side effects)

// returns true iff target object's ID matches the ID of an element in the provided array
export function idInArray(arr, target) {
  function checkId(obj) {
    // window.currentOpp is a global variable loaded in the HTML created by the Jinja template
    return obj.id === target.id;
  }

  return arr.findIndex(checkId) > -1;
}
