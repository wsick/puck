# Container

A container has children.

A container is renderless.

A container by itself has no size. Extents are derived by taking the union of all child extents
transformed by `transform` about `(transformOriginX, transformOriginY)`.