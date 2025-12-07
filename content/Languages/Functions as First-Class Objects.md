This means **functions in JavaScript can be treated like any other value**:

- Assigned to variables
    
- Passed as arguments
    
- Returned from other functions

```js
// Assigning a function to a variable
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Passing function as an argument
function callWithJohn(fn) {
  return fn("John");
}

console.log(callWithJohn(greet)); // Hello, John!

// Returning a function
function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```
