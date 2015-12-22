# Process Down

The purpose of the process phases is to pre-compute metrics used to prune the tree during rendering and hit testing.
The process down phase is focused on members that are altered by ancestors.
 
## State

The following state is used as input to the process down phase.

```typescript
export interface IElementState {
    //range: [0.0, 1.0]
    opacity: number;
    visible: boolean;
    //visual offset from parent
    offset: IPoint;
    size: ISize;
    transform: Float32Array;
    //origin of transform in relative coordinate space ([0.0,1.0], [0.0,1.0])
    transformOrigin: IPoint;
}
```

## Composite

During the process down phase, the following elements in the composite object are calculated.
```typescript
export interface IElementComposite {
    opacity: number;
    visible: boolean;
    transform: Float32Array;
    // others
}
```