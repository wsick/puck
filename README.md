# puck
Canvas scene render library

## Objective
Create canvas tree renderer that is optimized for rendering scene trees.  
Scene trees can take aggressive optimizations since ancestors influence how and whether an ancestry renders.

This renderer is focused on reducing memory footprint while maintaining optimal DRY (don't repeat yourself) techniques to optimize CPU impact.

## Components
Puck consists of 3 actors:
- [DownProcessor](docs/process-down.md)
- [UpProcessor](docs/process-up.md)
- [Renderer](docs/render.md)
