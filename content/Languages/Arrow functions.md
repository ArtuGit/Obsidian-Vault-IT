Arrow functions are a shorthand syntax for writing function expressions in JavaScript, introduced in **ES6 (ECMAScript 2015)**. They use the `=>` (fat arrow) notation. Unlike regular functions, arrow functions do **not have their own `this`, `arguments`, `super`, or `new.target`**, which means they inherit `this` from their surrounding lexical context.

They are especially useful for writing short, anonymous functions such as callbacks or functional array operations.
```JS

// Traditional function expression
const multiply = function(a, b) {
  return a * b;
};

// Equivalent arrow function
const multiply = (a, b) => a * b;

console.log(multiply(3, 4)); // Output: 12

```

With one parameter and implicit return:
```JS
const square = x => x * x;
console.log(square(5)); // Output: 25
```

Lexical `this` example:
```JS
function Counter() {
  this.count = 0;
  setInterval(() => {
    this.count++;
    console.log(this.count);
  }, 1000);
}
new Counter();

```
In this example, the arrow function keeps the `this` context of the `Counter` function, avoiding the need for `.bind(this)` or storing `this` in a variable.