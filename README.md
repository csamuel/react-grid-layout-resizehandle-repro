# React Grid Layout - `resizeHandle` Type Error Reproduction

⚠️ **This StackBlitz project demonstrates the BROKEN state** - it shows the TypeScript error that occurs with the incorrect type definition in `@types/react-grid-layout`.

## The Issue

The type definition for the `resizeHandle` prop was incorrect and missing the second parameter (`ref`).

### Before (Incorrect)

```typescript
resizeHandle?: React.ReactNode |
  ((resizeHandle: ResizeHandle) => React.ReactNode) |
  undefined;
```

**Problem:** When using a function for `resizeHandle`, TypeScript would error if you tried to use the `ref` parameter because it wasn't included in the type signature.

### After (Fixed)

```typescript
resizeHandle?: React.ReactNode |
  ((resizeHandleAxis: ResizeHandle, ref: React.Ref<HTMLElement>) => React.ReactNode) |
  undefined;
```

**Solution:** The type now correctly includes both parameters:
1. `resizeHandleAxis` - The resize handle position (e.g., 'se', 'nw', 'ne', 'sw')
2. `ref` - A React ref for the HTMLElement

## What This Demo Shows

This project demonstrates:

1. **Custom Resize Handles**: Using the `resizeHandle` prop with a function that receives both `resizeHandleAxis` and `ref` parameters
2. **Type Safety**: With the fix, TypeScript correctly validates the function signature
3. **Visual Example**: Custom styled resize handles with circular icons

## Files

- **App.tsx** - Main component demonstrating the fix with custom resize handles
- **App.css** - Styling for custom resize handles
- **package.json** - Dependencies including react-grid-layout and TypeScript

## How to Test the Fix

### Before the Fix
If you were using the old type definitions, this code would cause a TypeScript error:

```typescript
const customHandle = (axis: string, ref: React.Ref<HTMLElement>) => {
  return <div ref={ref}>Resize {axis}</div>;
  //          ^^^
  // TypeScript error: ref parameter doesn't exist in type signature
};
```

### After the Fix
With the corrected type definition, the same code works perfectly:

```typescript
const customHandle = (axis: string, ref: React.Ref<HTMLElement>) => {
  return <div ref={ref}>Resize {axis}</div>;
  // ✅ No TypeScript errors!
};
```

## Running This Demo

1. Open this project in StackBlitz
2. The demo will automatically install dependencies and start
3. **TypeScript will show errors** - this is expected and demonstrates the bug!
4. Run `npx tsc --noEmit` to see the full TypeScript error
5. The error shows that the type definition expects 1 parameter but receives 2

## How to See the Error

Run this command to see the TypeScript error:

```bash
npx tsc --noEmit
```

You'll see:

```
App.tsx(92,24): error TS2769: No overload matches this call.
  Type '(resizeHandleAxis: string, ref: React.Ref<HTMLElement>) => JSX.Element'
  is not assignable to type 'ReactNode | ((resizeHandle: ResizeHandle) => ReactNode)'.
    Target signature provides too few arguments. Expected 2 or more, but got 1.
```

This proves that `@types/react-grid-layout` has an incorrect type definition!

## Reference

- **Source Repository**: [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- **Type Definitions**: [@types/react-grid-layout](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-grid-layout)
- **Original Implementation**: See `/lib/ReactGridLayoutPropTypes.js` lines 23-28 in the source repository

## Key Takeaways

✅ The `resizeHandle` prop accepts either:
- A React element/node
- A function that receives `(resizeHandleAxis, ref)` and returns a React element

✅ The `ref` parameter is essential for proper DOM manipulation by the library

✅ TypeScript types should match the actual implementation for better developer experience
