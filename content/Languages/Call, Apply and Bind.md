### ✅ `call()`

**Syntax:** `func.call(thisArg, arg1, arg2, ...)`

- Calls the function **immediately**.
    
- Passes arguments one by one.
    
- Sets the `this` value inside the function.
```JS
function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}

const person = { name: 'Alice' };

greet.call(person, 'Hello'); // Output: Hello, Alice

```

### ✅ `apply()`

**Syntax:** `func.apply(thisArg, [argsArray])`

- Calls the function **immediately**.
    
- Arguments are passed as a single array.
    
- Also sets the `this` value.
```JS
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Bob' };

greet.apply(person, ['Hi', '!']); // Output: Hi, Bob!

```

### ✅ `bind()`

**Syntax:** `const boundFunc = func.bind(thisArg, arg1, arg2, ...)`

- **Returns a new function** with `this` set, but **does not call it immediately**.
    
- Useful for creating a function with preset `this`.
```JS
function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}

const person = { name: 'Carol' };

const greetCarol = greet.bind(person);
greetCarol('Hey'); // Output: Hey, Carol
```

| Method  | Invokes function? | Arguments passed as | Returns a new function? | Sets `this`? |
| ------- | ----------------- | ------------------- | ----------------------- | ------------ |
| `call`  | Yes               | Individual args     | No                      | Yes          |
| `apply` | Yes               | Array of args       | No                      | Yes          |
| `bind`  | No                | Individual args     | Yes                     | Yes          |