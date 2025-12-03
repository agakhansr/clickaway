import { useOutsideClick } from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useCallback } from 'react';

describe('useOutsideClick', () => {
  it('should call callback when clicking outside', () => {
    const callback = jest.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(callback);
      return (
        <>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </>
      );
    }

    render(<TestComponent />);

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when clicking inside', () => {
    const callback = jest.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(callback);
      return (
        <div data-testid="inside" ref={ref}>
          Inside
        </div>
      );
    }

    render(<TestComponent />);

    const inside = screen.getByTestId('inside');
    fireEvent.mouseDown(inside);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should respect enabled flag', () => {
    const callback = jest.fn();

    function TestComponent({ enabled }: { enabled: boolean }) {
      const ref = useOutsideClick<HTMLDivElement>(callback, enabled);
      return (
        <>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </>
      );
    }

    const { rerender } = render(<TestComponent enabled={false} />);

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    expect(callback).not.toHaveBeenCalled();

    rerender(<TestComponent enabled={true} />);
    fireEvent.mouseDown(outside);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle touchstart events', () => {
    const callback = jest.fn();

    function TestComponent() {
      const ref = useOutsideClick<HTMLDivElement>(callback);
      return (
        <>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </>
      );
    }

    render(<TestComponent />);

    const outside = screen.getByTestId('outside');
    fireEvent.touchStart(outside);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should work with useCallback', () => {
    const callback = jest.fn();

    function TestComponent() {
      const memoizedCallback = useCallback(() => {
        callback();
      }, [callback]);

      const ref = useOutsideClick<HTMLDivElement>(memoizedCallback);
      return (
        <>
          <div data-testid="inside" ref={ref}>
            Inside
          </div>
          <div data-testid="outside">Outside</div>
        </>
      );
    }

    render(<TestComponent />);

    const outside = screen.getByTestId('outside');
    fireEvent.mouseDown(outside);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
