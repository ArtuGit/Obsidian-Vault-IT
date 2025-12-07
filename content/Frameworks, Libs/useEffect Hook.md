# Complete Guide to useEffect in React

## Introduction

The `useEffect` hook is one of the most fundamental and powerful hooks in React. It allows you to perform side effects in functional components, effectively replacing the lifecycle methods `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.

Understanding `useEffect` is crucial for building robust React applications, as it handles everything from data fetching to DOM manipulation and cleanup operations.

## What Are Side Effects?

Before diving into `useEffect`, it's important to understand what side effects are in the context of React components:

**Side effects** are operations that affect something outside the scope of the function being executed. In React, these include:

- **Data fetching** (API calls, database queries)
- **DOM manipulation** (changing document title, focus management)
- **Event listeners** (scroll, resize, keyboard events)
- **Timers and intervals** (setTimeout, setInterval)
- **Subscriptions** (WebSocket connections, real-time data)
- **Cleanup operations** (removing listeners, canceling requests)

## Basic Syntax and Structure

```javascript
import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Side effect logic here
    document.title = `Count: ${count}`;
    
    // Optional cleanup function
    return () => {
      // Cleanup logic here
    };
  }, [count]); // Dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## The Three Patterns of useEffect

### 1. Effect Runs After Every Render

```javascript
useEffect(() => {
  console.log('This runs after every render');
  // Runs on mount and after every update
});
```

**When to use:**

- Rarely recommended due to performance implications
- Only when you need to run after every single render
- Usually indicates a design issue

### 2. Effect Runs Only Once (componentDidMount equivalent)

```javascript
useEffect(() => {
  console.log('This runs only once after initial render');
  
  // Common use cases:
  // - Initial data fetching
  // - Setting up subscriptions
  // - One-time DOM setup
}, []); // Empty dependency array
```

**When to use:**

- Initial data loading
- Setting up global event listeners
- Initializing third-party libraries
- One-time setup operations

### 3. Effect Runs When Dependencies Change

```javascript
useEffect(() => {
  console.log('This runs when count or name changes');
  updateUserProfile(count, name);
}, [count, name]); // Dependency array with values
```

**When to use:**

- Responding to prop or state changes
- Updating derived data
- Conditional side effects
- Most common and recommended pattern

## Real-World Examples

### Data Fetching Pattern

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if no userId
    if (!userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Re-fetch when userId changes

  if (loading) return <div className="loading">Loading user...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
  );
}
```

### Event Listeners and Window Events

```javascript
function ResponsiveComponent() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setWindowSize(newSize);
      setIsMobile(newSize.width < 768);
    }

    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function - remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency - set up once

  return (
    <div>
      <h2>Window Size: {windowSize.width} x {windowSize.height}</h2>
      <p>Device type: {isMobile ? 'Mobile' : 'Desktop'}</p>
    </div>
  );
}
```

### Timer and Interval Management

```javascript
function Timer({ autoStart = false }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, seconds]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="timer">
      <h2>Timer: {seconds} seconds</h2>
      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
```

### Search with Debouncing

```javascript
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't search for empty terms
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    // Debounce the search
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchTerm)}`
        );
        
        if (!response.ok) {
          throw new Error('Search failed');
        }
        
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    // Cleanup: cancel the timeout if searchTerm changes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  return (
    <div className="search-component">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
      
      {loading && <div className="loading">Searching...</div>}
      {error && <div className="error">Error: {error}</div>}
      
      <div className="results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Advanced Patterns

### Multiple useEffects for Separation of Concerns

```javascript
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [theme, setTheme] = useState('light');

  // Effect for user data
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId]);

  // Effect for user posts
  useEffect(() => {
    if (userId) {
      fetchUserPosts(userId).then(setPosts);
    }
  }, [userId]);

  // Effect for notifications
  useEffect(() => {
    if (userId) {
      fetchNotifications(userId).then(setNotifications);
    }
  }, [userId]);

  // Effect for document title
  useEffect(() => {
    document.title = user 
      ? `${user.name}'s Dashboard` 
      : 'Dashboard';
  }, [user]);

  // Effect for theme application
  useEffect(() => {
    document.body.className = `theme-${theme}`;
    
    return () => {
      document.body.className = '';
    };
  }, [theme]);

  return (
    <div className="dashboard">
      {/* Dashboard content */}
    </div>
  );
}
```

### Conditional Effects

```javascript
function ConditionalEffectExample({ shouldFetch, url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Only run effect if condition is met
    if (!shouldFetch || !url) {
      return;
    }

    let isCancelled = false;

    async function fetchData() {
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        // Only update state if component is still mounted
        if (!isCancelled) {
          setData(result);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Fetch error:', error);
        }
      }
    }

    fetchData();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isCancelled = true;
    };
  }, [shouldFetch, url]);

  return <div>{data ? JSON.stringify(data) : 'No data'}</div>;
}
```

### Custom Hooks with useEffect

```javascript
// Custom hook for API data fetching
function useApiData(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    let isCancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

// Custom hook for local storage synchronization
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage examples
function MyComponent() {
  const { data, loading, error } = useApiData('/api/users');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme ({theme})
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## Common Mistakes and How to Avoid Them

### 1. Missing Dependencies

```javascript
// ❌ Wrong - missing dependencies
function BadExample() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    const result = count * multiplier;
    document.title = `Result: ${result}`;
  }, [count]); // Missing 'multiplier' dependency!

  // ✅ Correct - include all dependencies
  useEffect(() => {
    const result = count * multiplier;
    document.title = `Result: ${result}`;
  }, [count, multiplier]); // All dependencies included
}
```

### 2. Infinite Loops

```javascript
// ❌ Wrong - creates infinite loop
function BadExample() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }); // No dependency array!

  // ✅ Correct - proper dependency management
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []); // Empty dependency array for one-time fetch
}
```

### 3. Not Cleaning Up Properly

```javascript
// ❌ Wrong - memory leak
function BadExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData().then(setData);
    }, 1000);
    // No cleanup!
  }, []);

  // ✅ Correct - proper cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData().then(setData);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
```

### 4. Stale Closures

```javascript
// ❌ Wrong - stale closure
function BadExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // Always uses initial count value!
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array

  // ✅ Correct - use functional update
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1); // Uses current count
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
```

## Performance Optimization

### Memoizing Effect Dependencies

```javascript
import { useMemo, useCallback } from 'react';

function OptimizedComponent({ items, filters }) {
  const [results, setResults] = useState([]);

  // Memoize expensive calculations
  const processedFilters = useMemo(() => {
    return filters.map(filter => ({
      ...filter,
      regex: new RegExp(filter.pattern, 'i')
    }));
  }, [filters]);

  // Memoize callback functions
  const filterItems = useCallback((items, filters) => {
    return items.filter(item => 
      filters.every(filter => filter.regex.test(item.name))
    );
  }, []);

  useEffect(() => {
    const filtered = filterItems(items, processedFilters);
    setResults(filtered);
  }, [items, processedFilters, filterItems]);

  return (
    <div>
      {results.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Avoiding Unnecessary Re-renders

```javascript
function EfficientsComponent({ config }) {
  const [data, setData] = useState(null);

  // Avoid creating new objects in dependency array
  const configString = JSON.stringify(config);

  useEffect(() => {
    fetchDataWithConfig(config).then(setData);
  }, [configString]); // Use serialized version

  // Or use useMemo for complex objects
  const memoizedConfig = useMemo(() => config, [
    config.apiUrl,
    config.timeout,
    config.retries
  ]);

  useEffect(() => {
    fetchDataWithConfig(memoizedConfig).then(setData);
  }, [memoizedConfig]);

  return <div>{data && JSON.stringify(data)}</div>;
}
```

## Testing useEffect

```javascript
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Mock fetch for testing
global.fetch = jest.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches user data on mount', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId={1} />);

    expect(screen.getByText('Loading user...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('/api/users/1');
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });
});
```

## Best Practices Summary

1. **Always include dependencies** that are used inside the effect
2. **Use multiple useEffects** to separate concerns
3. **Implement proper cleanup** to prevent memory leaks
4. **Use functional updates** to avoid stale closures
5. **Memoize expensive dependencies** to prevent unnecessary re-runs
6. **Handle loading and error states** in async effects
7. **Test your effects** to ensure they work correctly
8. **Use custom hooks** to reuse effect logic
9. **Be mindful of performance** - effects run after every render
10. **Consider using React DevTools** to debug effect behavior

## Conclusion

The `useEffect` hook is a powerful tool for managing side effects in React functional components. By understanding its patterns, avoiding common mistakes, and following best practices, you can build robust and performant React applications.

Remember that `useEffect` is about synchronizing your component with external systems - whether that's an API, the DOM, or browser APIs. Think of it as a bridge between your React component and the outside world, and use it thoughtfully to create great user experiences.