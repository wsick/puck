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
A scene graph is composed of 3 classes of `Element`: `Layer`, `Container`, or [`Visual`](docs/visual.md).  
* Layer represents an isolated drawing space that can operate independently. (NOTE: Layer is a special version of a Container)
* Container represents a renderless object that contains child Layers/Containers/Visuals.
* [Visual](docs/visual.md) represents a renderful object that contains no children.

## Additional Information
Here is a list of extended documentation to describe engine.
* [Evolve](docs/evolve.md) - evolutions from [minerva](https://github.com/wsick/minerva)
* [Process Down](docs/process-down.md)
* [Process Up](docs/process-up.md)
