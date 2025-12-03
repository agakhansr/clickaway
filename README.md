# clickaway

A lightweight React hook for detecting clicks outside of a component. Perfect for modals, dropdowns, tooltips, and other UI elements that need to close when clicked outside.

## Features

✨ **TypeScript Support** - Fully typed with generics for your custom elements
📦 **Tiny Bundle** - Minimal overhead, tree-shakeable
⚡ **Zero Dependencies** - Only requires React
🎯 **Touch Support** - Works with both mouse and touch events
🔄 **Enable/Disable** - Control when the hook is active
♿ **Accessible** - Respects user preferences

## Installation

```bash
npm i @azeagakhan/clickaway
```

or with yarn:

```bash
yarn add @azeagakhan/clickaway
```

## Usage

### Basic Example

```jsx
import { useOutsideClick } from '@azeagakhan/clickaway';
import { useState } from 'react';

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Menu
      </button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
          <li>Option 3</li>
        </ul>
      )}
    </div>
  );
}
```

### With TypeScript Custom Element

```tsx
import { useOutsideClick } from '@azeagakhan/clickaway';

interface CustomElement extends HTMLElement {
  customMethod(): void;
}

export function MyComponent() {
  const ref = useOutsideClick<CustomElement>(() => {
    console.log('Clicked outside');
    ref.current?.customMethod();
  });

  return <div ref={ref}>Content</div>;
}
```

### Conditional Enable/Disable

```jsx
export function Modal({ isOpen, onClose }) {
  const ref = useOutsideClick(onClose, isOpen); // Hook only active when modal is open

  return isOpen ? <div ref={ref}>Modal Content</div> : null;
}
```

## API

### `useOutsideClick<T extends HTMLElement>(callback, enabled?)`

#### Parameters

- **`callback`** `() => void` - Function to execute when clicking outside the element
- **`enabled`** `boolean` (optional, default: `true`) - Whether the hook should listen for clicks

#### Returns

- **`ref`** `RefObject<T>` - React ref to attach to your component

## How It Works

The hook:
1. Attaches a ref to your component
2. Listens for `mousedown` and `touchstart` events on the document
3. Checks if the clicked target is outside your component
4. Calls your callback function if the click was outside
5. Automatically cleans up event listeners on unmount

## Browser Support

Works in all modern browsers that support:
- React 16.8+ (Hooks)
- ES2020 or transpiled equivalents

## Performance Tips

- Wrap your callback with `useCallback` to prevent unnecessary re-renders:

```jsx
import { useCallback } from 'react';
import { useOutsideClick } from 'use-outside-click';

export function Component() {
  const handleClickOutside = useCallback(() => {
    console.log('Outside click');
  }, []);

  const ref = useOutsideClick(handleClickOutside);

  return <div ref={ref}>Content</div>;
}
```

## License

MIT © 2024

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
# clickaway
# clickaway
