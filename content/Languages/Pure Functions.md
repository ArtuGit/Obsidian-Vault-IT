A **pure function** is a function where:

- The **output depends only on the input**.
    
- It has **no side effects** (doesn’t modify external state, doesn’t log, fetch, or mutate).

```js
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (modifies external state)
let count = 0;
function increment() {
  count += 1; // side effect!
}
```
Pure functions are easier to test, reason about, and compose.