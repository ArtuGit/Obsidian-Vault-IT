In Node.js, a **module** is just a JavaScript file that exports code (functions, objects, variables, classes), and can be imported into other files.

There are **three main types**:

1. **Built-in modules** (e.g., `fs`, `path`, `http`)
    
2. **Local modules** (your own code)
    
3. **Third-party modules** (installed via npm like `express`, `lodash`)
    

---

## 📦 1. Built-in Modules

These come with Node.js — no install needed.

`const fs = require('fs');  fs.writeFileSync('example.txt', 'Hello Node.js!');`

Popular built-ins:

- `fs` – file system access
    
- `path` – path utilities
    
- `http` – create HTTP servers
    
- `crypto` – encryption
    
- `os` – system info
    

---

## 📁 2. Local Modules (Your Own)

### 📄 math.js


`function add(a, b) {   return a + b; }  module.exports = { add };`

### 📄 app.js


`const math = require('./math');  console.log(math.add(2, 3)); // → 5`

---

## 🌍 3. Third-Party Modules

Installed via `npm`.

bash

CopyEdit

`npm install express`


`const express = require('express'); const app = express();  app.get('/', (req, res) => {   res.send('Hello from Express!'); });  app.listen(3000);`

---

## 🔄 CommonJS vs ES Modules

By default, Node.js uses **CommonJS (`require`)**, but you can use **ES Modules (`import`)** by:

- Naming files with `.mjs`
    
- Or setting `"type": "module"` in `package.json`
    

### ES Module example


`// math.mjs export function add(a, b) {   return a + b; }  // app.mjs import { add } from './math.mjs'; console.log(add(4, 6));`

[[CommonJS vs ES Modules]]

---

## 🔧 How to Organize Modules

A typical project might have a structure like:

```
project/
│
├── app.js
├── routes/
│   └── user.js
├── controllers/
│   └── userController.js
├── utils/
│   └── logger.js
```
Each of those files is a module you can import/export from.