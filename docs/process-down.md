# Process Down

The purpose of the process phases is to pre-compute metrics used to prune the tree during rendering and hit testing.
The process down phase is focused on members that are altered by ancestors. 

## Inputs
- * visibility
- * opacity
- * isHitTestVisible
- transform
- transformOrigin
- x - offset from left (in local coordinate space)
- y - offset from top (in local coordinate space)
- width (in local coordinate space)
- height - (in local coordinate space)

## Outputs
- full visibility (?)
- full opacity (?)
- full isHitTestVisible (?)
- effective transform (to x,y)
- effective clip (?)

## Overrides
- Canvas
  - composite layout clip (noop)
- Image
  - stretch transform
  - overlap 
- Popup
  - calculate carrier transform
- UserControl (unused)
  - composite layout clip (noop)