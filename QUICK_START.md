# Quick Start Guide

## Installation

```bash
npm install clickaway
```

## Basic Usage

```jsx
import { useOutsideClick } from 'clickaway';
import { useState } from 'react';

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && <ul>Items...</ul>}
    </div>
  );
}
```

## Real-World Example: Modal

```jsx
import { useOutsideClick } from 'clickaway';
import { useState } from 'react';

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false), isOpen);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div ref={ref} className="modal">
          <h2>Modal Title</h2>
          <p>Click outside to close</p>
        </div>
      )}
    </>
  );
}
```

## Real-World Example: Tooltip

```jsx
import { useOutsideClick } from 'clickaway';
import { useState } from 'react';

export function TooltipTrigger({ children, tooltip }) {
  const [show, setShow] = useState(false);
  const ref = useOutsideClick(() => setShow(false));

  return (
    <div ref={ref} className="tooltip-container">
      <button onClick={() => setShow(!show)}>{children}</button>
      {show && <div className="tooltip">{tooltip}</div>}
    </div>
  );
}
```

## TypeScript Support

```tsx
import { useOutsideClick } from 'clickaway';
import { useRef } from 'react';

export function Component() {
  // Specify the element type for better type checking
  const ref = useOutsideClick<HTMLDivElement>(() => {
    console.log('Clicked outside');
  });

  return <div ref={ref}>Content</div>;
}
```

## API

```typescript
const ref = useOutsideClick<T>(callback, enabled);
```

- **`callback`** - Function to call when clicking outside
- **`enabled`** - Optional boolean to enable/disable (default: true)
- **`ref`** - Ref to attach to your component

## Features

✅ Works with both mouse and touch events
✅ Full TypeScript support
✅ Enable/disable on demand
✅ Zero dependencies (besides React)
✅ Minimal bundle size
