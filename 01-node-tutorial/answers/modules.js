const names = require('./names');
const sayHi = require('./utils');
const data = require('./alternative-flavor');
require('./mind-grenade');

console.log(data);
// alternatively destructuring const { matei, nicoleta } = require('./names); sayHi(matei)

console.log(names);

sayHi('Olga');
sayHi(names.matei);
sayHi(names.nicoleta);


