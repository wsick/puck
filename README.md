# puck
Canvas scene render library

## Objective
Create canvas tree renderer that is optimized for rendering scene trees.  
Scene trees can take aggressive optimizations since ancestors influence how and whether an ancestor renders.

This renderer is focused on reducing memory footprint while maintaining optimal DRY (don't repeat yourself) techniques to optimize CPU impact.

## Motivation
Underlying this initiative is a desire to build a graphics engine that is built closer to microservices philosophy.
Among the obvious benefits of microservices, we hope to tease apart a 2D UI engine into bounded contexts that can be heavily optimized.

## Components
Puck consists of 3 actors:
* [DownProcessor](docs/process-down.md)
* [UpProcessor](docs/process-up.md)
* [Renderer](docs/render.md)

NOTE: This is expected to change.  There are elements of process down and process up that require dynamic sizing.
This should be done in a layout drafter.
