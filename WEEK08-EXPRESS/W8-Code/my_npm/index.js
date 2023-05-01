const {upperCase , localeUpperCase} = require("upper-case");
var colors = require('colors');

console.log(upperCase("string")); //=> "STRING"
console.log(localeUpperCase("string", "tr")); //=> "STRING"


console.log('hello'.green);
console.log('OMG Rainbows!'.rainbow);
console.log('OMG Rainbows!'.trap);
