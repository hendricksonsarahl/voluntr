module.exports = {
    "extends": ["airbnb-base", "prettier"],
    "rules": {
      "no-console": 0,
      "comma-dangle": 0,
      "quotes": 0,
      "no-plusplus": 0,
      "no-param-reassign": 0,
      "no-unused-vars": 1,
      "import/prefer-default-export": 0,
      "import/extensions": 0
    },
    "env": {
      "browser": true,
      "es6": true,
      "jquery": true,
      "jest": true
    },
    "globals": {
      "currentOpp": false,
      "gapi": false
    }
};