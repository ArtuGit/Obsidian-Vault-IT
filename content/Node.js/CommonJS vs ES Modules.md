
| Feature                   | **CommonJS (CJS)**              | **ES Modules (ESM)**                      |
| ------------------------- | ------------------------------- | ----------------------------------------- |
| **Syntax**                | `require()`, `module.exports`   | `import`, `export`                        |
| **File Extension**        | `.js`                           | `.mjs` (or `.js` with `"type": "module"`) |
| **Loaded**                | Synchronously                   | Asynchronously                            |
| **Top-Level `await`**     | ❌ Not allowed                   | ✅ Allowed                                 |
| **Default in Node.js**    | ✅ Yes                           | ❌ Must opt-in                             |
| **Interop**               | Can import ESM with limitations | Can import CommonJS                       |
| **Browser Compatibility** | ❌ Not native                    | ✅ Native in modern browsers               |

---

## 🔄 Basic Syntax Comparison

### CommonJS

`// math.js function add(a, b) {   return a + b; }  module.exports = { add };  // app.js const { add } = require('./math'); console.log(add(2, 3));`

---

### ES Modules


`// math.mjs export function add(a, b) {   return a + b; }  // app.mjs import { add } from './math.mjs'; console.log(add(2, 3));`

**OR** with `"type": "module"` in `package.json`:


`{   "type": "module" }`

Then your regular `.js` files can use `import`/`export`.

---

## ⚙️ When to Use What?

### ✅ Use **CommonJS** if:

- You're working in a legacy or existing Node.js project
    
- You need maximum compatibility with old packages
    
- You want synchronous loading and don’t care about top-level `await`
    

### ✅ Use **ES Modules** if:

- You're starting a **new** project
    
- You want future-proof, browser-compatible syntax
    
- You're using modern tooling (like Vite, ESBuild, etc.)
    
- You want top-level `await`, better tree-shaking, or native module support
    

---

## ⚠️ Interoperability Gotchas

- **You can import CJS in ESM**:
       
    `import pkg from 'lodash'; // works`
    
- **You can't easily `require()` an ESM module** unless you use dynamic imports:
    
    
    `const { readFile } = await import('fs/promises');`
    

---

## 🔚 TL;DR

- **CommonJS** = `require`, `module.exports`, default in Node
    
- **ESM** = `import`, `export`, future-friendly and browser-ready
    
- Node.js supports both, but **pick one per project** if you can