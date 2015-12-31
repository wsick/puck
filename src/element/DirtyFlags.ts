namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        transform = 1 << 2,

        extents = 1 << 3, //single element's paint extents
        bounds = 1 << 4, //container's aggregation of all child (recursive) extents

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.transform,
        up = DirtyFlags.extents | DirtyFlags.bounds
    }
}