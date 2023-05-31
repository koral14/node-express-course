require("dotenv").config();
console.log(__dirname);
console.log(__filename);

setInterval(() => {
    console.log('Hello!');
}, 1000)

console.log(process.env.MY_VAR);
console.log(process.env.MY_VAR1);
console.log(process.env.TEST);
