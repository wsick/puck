# puck
Canvas scene render library

## Objective
Create canvas tree renderer that is optimized for rendering scene trees.  
Scene trees can take aggressive optimizations since ancestors influence how and whether an ancestor renders.

This renderer is focused on reducing memory footprint while maintaining optimal DRY (don't repeat yourself) techniques to optimize CPU impact.

## Motivation
Underlying this initiative is a desire to build a graphics engine that is built closer to microservices philosophy.
Among the obvious benefits of microservices, we hope to tease apart a 2D UI engine into bounded contexts that can be heavily optimized.

## Composition
Our scene graph is organized into 2 types:
- [Element](docs/element/md)
  - renderful
  - no children
  - has size
- [Container](docs/container.md)
  - renderless
  - has children
  - has no size

A [Visual](docs/visual.md) is derived from an [Element](docs/element.md) to provide filling/stroking.
A [Layer](docs/layer.md) is derived from a [Container](docs/container.md) to isolate processing/drawing.

## Additional Information
Here is a list of extended documentation to describe engine.
* [Evolve](docs/evolve.md) - evolutions from [minerva](https://github.com/wsick/minerva)
* [Process Down](docs/process-down.md)
* [Process Up](docs/process-up.md)
