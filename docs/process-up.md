# Process Up

The purpose of the process phases is to pre-compute metrics used to prune the tree during rendering and hit testing.
The process up phase focuses on paint extents gained from aggregating children.

## Process

- Calculate extents based on offset, size, transform
- [element] bounds = extents
- [container] bounds = union of all child bounds
- If bounds change, include bounds in invalidated paint
- A node can force dirty changes up the tree

* NOTE: Paint can be invalidated from opacity/visible changing (from self or children)

## Inputs
- visible, opacity
- size - only [Element](element.md)
- transform

## Outputs
- extents
- bounds
- paint


## Notes from minerva (overrides)
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
 