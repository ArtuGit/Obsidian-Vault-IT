
These are **functions that take other functions as arguments or return functions**. They enable composition and abstraction in a clean way.

Examples in JavaScript:

- `map`, `filter`, `reduce` are all higher-order functions.
```js
const numbers = [1, 2, 3, 4, 5];

// map applies a function to each element
const squares = numbers.map(n => n * n); 
console.log(squares); // [1, 4, 9, 16, 25]

// filter selects elements based on a condition
const evens = numbers.filter(n => n % 2 === 0); 
console.log(evens); // [2, 4]

// reduce accumulates values
const sum = numbers.reduce((acc, n) => acc + n, 0); 
console.log(sum); // 15
