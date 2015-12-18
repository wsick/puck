# Process Up

The purpose of the process phases is to pre-compute metrics used to prune the tree during rendering and hit testing.
The process up phase focuses on paint extents gained from aggregating children. 

## Inputs
- width
- height
- useLayoutRounding

## Outputs
- extents
- extents with children
- global bounds with children
- surface bounds with children
- dirty flags
- dirty region

## Overrides
- Canvas
  - calcPaintBounds - force top-level Canvas to the entire surface
- Grid
  - calcExtents - use empty actual size if no grid lines or background
- Overlay
  - calcActualSize (x)
  - calcExtents (x)
  - calcPaintBounds (x)
- Panel
  - calcExtents - use empty actual size if no background
- Popup
  - calcActualSize (x)
  - calcExtents (x)
  - calcPaintBounds (x)
- TextBlock
  - calcActualSize 
    - run through layout
    - grow actual size by padding
  - calcExtents - include padding in extents
- TextBox
  - calcActualSize - run through layout
  - calcExtents - include caret in extents
 