In JavaScript, a **`Symbol`** is a **primitive data type** introduced in **ES6 (ECMAScript 2015)**. It’s used to create **unique and immutable identifiers** for object properties.

### 🔑 Key Characteristics of Symbols

- **Unique:** Every time you create a `Symbol`, it’s guaranteed to be different, even if you give it the same description.
    
- **Immutable:** Once created, a Symbol’s value doesn’t change.
    
- **Hidden Properties:** Symbols can be used as **non-enumerable** object keys, which won’t show up in standard property iteration like `for...in`.

📦 Syntax
```JS
const sym1 = Symbol();           // without description
const sym2 = Symbol("desc");     // with description
console.log(sym1 === sym2);      // false – every Symbol is unique
```

🔐 Symbols as Object Keys
```JS
const ID = Symbol("id");

const user = {
  name: "Alice",
  [ID]: 12345
};

console.log(user[ID]); // 12345

// Symbol key won't show up in normal iterations
for (let key in user) {
  console.log(key); // only "name"
}
```
### 🧰 Use Cases

- To create **hidden object properties**.
    
- In libraries and frameworks to avoid naming collisions.
    
- For **meta-programming** (with built-in Symbol values like `Symbol.iterator`, `Symbol.toPrimitive`, etc.).
    

---

### 🔧 Built-in Symbols

JavaScript includes some **well-known symbols** for advanced behaviors:

| Symbol               | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `Symbol.iterator`    | Makes objects iterable                                     |
| `Symbol.toPrimitive` | Custom conversion to primitive values                      |
| `Symbol.toStringTag` | Customizes the default object string tag                   |
| `Symbol.hasInstance` | Custom behavior for `instanceof`                           |
| `Symbol.species`     | Controls the constructor returned by methods like `.map()` |
🧠 Example with `Symbol.iterator`
```JS
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (let value of myIterable) {
  console.log(value); // 1, 2, 3
}

```