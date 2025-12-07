**Anonymous Functions** in JavaScript are functions **without a name**. They are often used as **function expressions** or **callbacks**, where the function does not need to be reused elsewhere in the code.
```JS
// Anonymous function assigned to a variable
const greet = function() {
  console.log("Hello!");
};

greet(); // Output: Hello!

// Anonymous function as a callback
setTimeout(function() {
  console.log("This runs after 1 second");
}, 1000);

```
### **Modern Usage with Arrow Functions:**

Arrow functions are often **anonymous by nature**, and frequently used in place of traditional anonymous functions:
```JS
setTimeout(() => {
  console.log("Arrow function as an anonymous callback");
}, 1000);

```