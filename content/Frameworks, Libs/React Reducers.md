React reducers are functions that manage state transitions in a predictable, centralized way. They're used with the `useReducer` hook as an alternative to `useState` for handling complex state logic.

## What is a Reducer?

A reducer is a pure function that takes two arguments:

- **Current state**: The existing state value
- **Action**: An object describing what happened

It returns a new state based on the action:

javascript

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

## Core Concepts

**Actions** are plain objects that describe what happened:

javascript

```javascript
{ type: 'INCREMENT' }
{ type: 'ADD_TODO', payload: 'Learn React' }
```

**Dispatch** is the function that sends actions to the reducer:

javascript

```javascript
dispatch({ type: 'INCREMENT' });
```

**State** is immutable - reducers always return new state objects rather than modifying existing ones.

## When to Use Reducers

Choose `useReducer` over `useState` when:

- State logic is complex with multiple sub-values
- Next state depends on previous state in complex ways
- You need to manage related pieces of state together
- State updates involve multiple steps
- You want centralized state management

## useReducer Hook

The `useReducer` hook accepts a reducer function and initial state, returning current state and a dispatch function:

javascript

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

## Reducer Rules

1. **Pure functions**: No side effects, same input always produces same output
2. **Immutable**: Never mutate state directly, always return new objects
3. **Predictable**: Given the same state and action, always return same result
4. **Complete**: Handle all possible action types (often with default case)

## Common Patterns

**Multiple related state values:**

javascript

```javascript
const initialState = {
  user: null,
  loading: false,
  error: null
};
```

**Action creators** for cleaner code:

javascript

```javascript
const actions = {
  setLoading: (loading) => ({ type: 'SET_LOADING', payload: loading }),
  setUser: (user) => ({ type: 'SET_USER', payload: user }),
  setError: (error) => ({ type: 'SET_ERROR', payload: error })
};
```

**Nested state updates:**

javascript

```javascript
case 'UPDATE_USER_NAME':
  return {
    ...state,
    user: {
      ...state.user,
      name: action.payload
    }
  };
```

## Benefits

- **Predictability**: All state changes go through one function
- **Testability**: Easy to test reducer functions in isolation
- **Debugging**: Clear action history makes debugging easier
- **Scalability**: Handles complex state logic better than multiple useState calls
- **Performance**: Can optimize by passing dispatch down instead of callback functions

## Advanced Usage

**With useContext** for global state:

javascript

```javascript
const StateContext = createContext();
const DispatchContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <MyComponent />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
```

**Lazy initialization** for expensive initial state:

javascript

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

React reducers provide a robust pattern for managing state that scales well with application complexity, offering predictable state updates and better organization than scattered useState calls.