"use strict"; is a directive that enables strict mode in JavaScript, imposing stricter parsing and error handling on your code.

### How to Enable Strict Mode

Globally: Place at the top of a script.  
javascript  
  
| "use strict"; |
| ------------- |

Locally: Place at the top of a function.  
javascript  
    
| function myFunction() {  <br>  "use strict";  <br>} |
| --------------------------------------------------- |

### Benefits of Strict Mode

Eliminates Silent Errors: Throws errors for undefined variables.  
javascript  
Copy code  
  

| "use strict";  <br>x = 10; // ReferenceError |     |
| -------------------------------------------- | --- |

1. Eliminates Silent Errors: Throws errors for undefined variables.
    
2. Prevents Accidental Globals: Variables must be declared.
    
3. Disallows Duplicate Names: Duplicate property names or parameters throw errors.
    
4. Changes this Behavior: In functions, this is undefined if not set.
    
5. Improves Performance: Enables some optimizations in JavaScript engines.
    

### Summary

Using "use strict"; helps catch errors early and enforce better coding practices, making your code more reliable. It's a good habit to adopt, especially in larger projects.

### ✅ Where is Strict Mode **enabled by default**?

In **modern JavaScript**, certain environments **automatically enable strict mode**, even if you don’t explicitly write `"use strict"`.

---

### 🚀 Strict Mode is enabled by default in:

1. ### **ES6 Modules**
    
    If you write your code using ES6 module syntax (`import` / `export`), **strict mode is applied automatically**.
```JS
// myModule.js
export const hello = () => {
  undeclaredVar = 123; // ❌ ReferenceError in strict mode
};
```
 Even without `"use strict"`, this will throw because ES modules are **implicitly strict**.
  

---

2. ### **Class Bodies**
    
    Code inside a `class` is always in strict mode.
```JS
class MyClass {
  myMethod() {
    someVar = 10; // ❌ ReferenceError in strict mode
  }
}

```
 Methods and constructors inside classes run in strict mode automatically.  

---

### ✅ Recap Table:

| Context         | Strict Mode Enabled by Default? |
| --------------- | ------------------------------- |
| ES6 Modules     | ✅ Yes                           |
| Class Bodies    | ✅ Yes                           |
| Regular Scripts | ❌ No (must use `"use strict"`)  |