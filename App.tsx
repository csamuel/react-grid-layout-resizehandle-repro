import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './App.css';

/**
 * ⚠️ THIS CODE HAS A TYPESCRIPT ERROR - THIS IS INTENTIONAL! ⚠️
 *
 * This component demonstrates the BUG in @types/react-grid-layout type definitions.
 * Run `npx tsc --noEmit` to see the error.
 *
 * THE PROBLEM:
 * - The type definition says: resizeHandle?: (resizeHandle: ResizeHandle) => React.ReactNode
 * - But the library actually calls: resizeHandle(resizeHandleAxis, ref)
 * - This mismatch causes TypeScript to error on line 97 where we pass customResizeHandle
 *
 * THE ERROR MESSAGE:
 * "Target signature provides too few arguments. Expected 2 or more, but got 1."
 *
 * This proves that @types/react-grid-layout needs to be fixed to include the `ref` parameter!
 */

const App: React.FC = () => {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 2, y: 0, w: 2, h: 2 },
    { i: 'c', x: 4, y: 0, w: 2, h: 2 },
  ];

  /**
   * Custom resize handle that demonstrates the fix.
   *
   * With the OLD type definition, TypeScript would complain about the 'ref' parameter
   * because the type signature only expected one parameter.
   *
   * With the NEW type definition, this works correctly because:
   * 1. resizeHandleAxis: tells us which handle is being rendered (e.g., 'se', 'nw')
   * 2. ref: allows us to attach a React ref to the handle element
   */
  const customResizeHandle = (
    resizeHandleAxis: string,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={`custom-resize-handle custom-resize-handle-${resizeHandleAxis}`}
        title={`Resize handle: ${resizeHandleAxis}`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="header">
        <h1>React Grid Layout - resizeHandle Fix Demo</h1>
        <p>
          This demonstrates the fix for the <code>resizeHandle</code> prop type definition.
        </p>
        <p>
          The custom resize handles below use both parameters:
          <code>resizeHandleAxis</code> and <code>ref</code>
        </p>
      </header>

      <div className="info-box">
        <h3>The Issue</h3>
        <p>
          <strong>Before:</strong> The type definition only expected one parameter
        </p>
        <pre>
{`resizeHandle?: React.ReactNode |
  ((resizeHandle: ResizeHandle) => React.ReactNode)`}
        </pre>
        <p>
          <strong>After:</strong> The type definition correctly includes both parameters
        </p>
        <pre>
{`resizeHandle?: React.ReactNode |
  ((resizeHandleAxis: ResizeHandle,
    ref: React.Ref<HTMLElement>) => React.ReactNode)`}
        </pre>
      </div>

      <div className="grid-container">
        <GridLayout
          className="layout"
          layout={layout}
          cols={6}
          rowHeight={100}
          width={1200}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
          resizeHandle={customResizeHandle}
        >
          <div key="a" className="grid-item">
            <div className="grid-item-content">
              <h3>Item A</h3>
              <p>Drag or resize me!</p>
              <p>Look for the custom resize handles</p>
            </div>
          </div>
          <div key="b" className="grid-item">
            <div className="grid-item-content">
              <h3>Item B</h3>
              <p>Drag or resize me!</p>
              <p>Custom handles with ref support</p>
            </div>
          </div>
          <div key="c" className="grid-item">
            <div className="grid-item-content">
              <h3>Item C</h3>
              <p>Drag or resize me!</p>
              <p>TypeScript types are now correct!</p>
            </div>
          </div>
        </GridLayout>
      </div>
    </div>
  );
};

export default App;
