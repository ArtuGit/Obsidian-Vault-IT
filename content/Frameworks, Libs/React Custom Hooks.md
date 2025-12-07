React custom hooks are reusable functions that encapsulate stateful logic and side effects, allowing you to extract component logic into reusable functions that can be shared across multiple components.

## What are Custom Hooks?

Custom hooks are JavaScript functions that:

- Start with the word "use" (following React's naming convention)
- Can call other hooks inside them
- Return values, functions, or objects that components can use
- Enable you to share stateful logic between components without changing component hierarchy

## Key Characteristics

**Hook Rules Apply**: Custom hooks must follow the same rules as built-in hooks - they can only be called at the top level of React functions, not inside loops, conditions, or nested functions.

**Reusability**: The same custom hook can be used in multiple components, with each component getting its own isolated state.

**Composition**: Custom hooks can call other hooks, including other custom hooks, allowing for powerful composition patterns.

## Basic Example

Here's a simple custom hook for managing a counter:

javascript

```javascript
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Usage in a component
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Common Patterns

**Data Fetching**: Custom hooks are excellent for encapsulating API calls and loading states:

javascript

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}
```

**Local Storage**: Managing localStorage with synchronization:

javascript

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}
```

## Benefits

**Separation of Concerns**: Custom hooks separate stateful logic from UI components, making both easier to test and maintain.

**Reusability**: The same logic can be used across multiple components without duplication.

**Testability**: Custom hooks can be tested independently of components.

**Composition**: Complex functionality can be built by combining simpler custom hooks.

## When to Create Custom Hooks

Consider creating a custom hook when you find yourself:

- Repeating the same stateful logic across multiple components
- Having components with complex state management that could be simplified
- Needing to share side effects or subscriptions between components
- Wanting to abstract away complex useEffect logic

Custom hooks are a powerful pattern for creating clean, reusable, and maintainable React applications by extracting and sharing component logic in a way that feels natural within React's functional programming paradigm.