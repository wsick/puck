namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        transform = 1 << 2,

        padding = 1 << 3,
        extents = 1 << 4,
        newbounds = 1 << 5,

        invalidate = 1 << 6,

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.transform,
        up = DirtyFlags.padding | DirtyFlags.extents | DirtyFlags.newbounds
    }
}