// Gather vendor packages for bundling by Webpack

window.$ = require("jquery");
window.jQuery = require("jquery");

// Import all of Bootstrap:
// require("bootstrap");

// Import Bootstrap JS modules as needed (saves space):
require('bootstrap/js/transition.js')
require('bootstrap/js/alert.js')
// require('bootstrap/js/button.js')
// require('../../js/carousel.js')
require('bootstrap/js/collapse.js')
require('bootstrap/js/dropdown.js')
// require('../../js/modal.js')
// require('../../js/tooltip.js')
// require('../../js/popover.js')
// require('../../js/scrollspy.js')
// require('../../js/tab.js')
// require('../../js/affix.js')

window.introJs = require("intro.js");