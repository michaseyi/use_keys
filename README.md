# use_keys

A simple library to make using key events in React reactive, enabling the creation of keyboard-driven web applications.

## Features

- **Reactive Key Event Handling**: Use key events reactively within your React components.
- **Simple API**: Easy-to-use hooks and components for handling key events.
- **Key State Management**: Manage the state of keys, whether they are pressed or released.
- **Flexible Usage**: Can be used for simple key state checking or more complex interactions.

## Installation

You can install `use_keys` via npm:

```bash
npm install @michaseyi/use_keys
```

# Example Usage

## Using `useKeys` reactively

```tsx
import { KeyProvider, useKeys, KeyState } from "@michaseyi/use_keys"

function TestKeys() {
	const keys = useKeys()

	const keyW = keys.use.KeyW()

	return <div>{keyW === KeyState.Released ? "Key W Released" : "Key W Pressed"}</div>
}

function App() {
	return (
		<KeyProvider>
			<TestKeys />
		</KeyProvider>
	)
}
```

## Using `useKeys` like regular event listeners

```tsx
import { KeyProvider, useKeys, KeyState } from "@michaseyi/use_keys"

function TestKeys() {
	const keys = useKeys()

	const arrowDown = keys.use.ArrowDown()
	const arrowUp = keys.use.ArrowUp()

	const [count, setCount] = useState(0)

	useEffect(() => {
		if (arrowUp === KeyState.Pressed) {
			setCount(count + 1)
		}
	}, [arrowUp])

	useEffect(() => {
		if (arrowDown === KeyState.Pressed) {
			setCount(count - 1)
		}
	}, [arrowDown])

	return <div>Clicked {count} times</div>
}

function App() {
	return (
		<KeyProvider>
			<TestKeys />
		</KeyProvider>
	)
}
```
### Using `useKeys` with custom key bindings and also disabling default key combo behaviour

```tsx
import { Key, isPressed, useKeys } from "@michaseyi/use_keys"

function App() {

	// useKeys now takes in a function that allows you to disable default key combo behaviour set by the browser
	// When the function returns true, the default behaviour for the pressed keys will be disabled
  // For example, below we are disabling the default behaviour of the browser when the user presses Ctrl + Shift + P or Ctrl + P
	const keys = useKeys(
		(state) =>
			(isPressed(state.Control) && isPressed(state.Shift) && isPressed(state.KeyP)) ||
			(isPressed(state.Control) && isPressed(state.KeyP))
	)

	const arrowUp = keys.use.ArrowUp()

	const arrowDown = keys.use.ArrowDown()

	const combo = keys.use.Combo(Key.Ctrl, Key.Shift, Key.KeyP)

	return (
		<>
			{isPressed(combo) && <div>combo pressed</div>}
		</>
	)
}
```

## API Reference

### `useKeys`

The `useKeys` hook provides access to key event handling functionality within your components.

#### Usage

```tsx
const keys = useKeys()
```

#### Methods

- `use.keyName()`: Returns the state of a specific key. Replace keyName with the name of the key (e.g., `KeyW`, `ArrowUp`, etc.).

### `KeyProvider`

The `KeyProvider` component wraps your components and provides access to key event handling functionality via context.

#### Usage

```tsx
<KeyProvider>{/* Your components */}</KeyProvider>
```
### `isPressed`
The `isPressed` function checks if a key is pressed.

### `isReleased`
The `isReleased` function checks if a key is released.
