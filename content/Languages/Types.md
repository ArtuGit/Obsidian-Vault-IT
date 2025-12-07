JavaScript has **dynamic** and **loosely typed** behavior, meaning variables are not bound to a specific type. Instead, types are associated with **values**, not variables, and can change at runtime.

JavaScript has two main categories of types:

---

## 🔹 **1. Primitive Types** (Immutable)

These are the basic building blocks of JavaScript. They are **not objects** and have no methods (though JavaScript wraps them temporarily when methods are used).

### ✅ The 7 primitive types:

|Type|Description|Example|
|---|---|---|
|**Number**|Floating-point numbers, incl. `NaN`, `Infinity`|`42`, `3.14`, `NaN`|
|**String**|Sequence of characters|`"hello"`, `'world'`|
|**Boolean**|Logical values|`true`, `false`|
|**Undefined**|A declared variable with no value|`let x;` (x is `undefined`)|
|**Null**|An explicitly empty or unknown value|`let x = null;`|
|**Symbol**|Unique and immutable value (ES6+)|`Symbol("id")`|
|**BigInt**|Arbitrarily large integers (ES2020+)|`12345678901234567890n`|

---

## 🔹 **2.  Reference Object Types** (Mutable)

These are collections of key–value pairs and include more complex data structures.

### ✅ Main object types:

|Type|Description|Example|
|---|---|---|
|**Object**|General key-value pair collections|`{ name: "Alice" }`|
|**Array**|Ordered list of values|`[1, 2, 3]`|
|**Function**|Callable object|`function greet() {}`|
|**Date**, **RegExp**, **Map**, **Set**, etc.|Built-in object types|`new Date()`, `new Map()`|
## 🧠 Type Behavior Notes

 **typeof** operator returns a string indicating the type of a value:
```JS
typeof 42         // "number"
typeof "hi"       // "string"
typeof null       // "object" ← historical quirk
typeof undefined  // "undefined"
typeof {}         // "object"
typeof []         // "object"
typeof function() {} // "function"

```

JavaScript is **dynamically typed**, so a variable can hold any type:
```JS
let x = 42;       
x = "now I'm a string";
```

Use **strict equality (`===`)** to avoid type coercion bugs.