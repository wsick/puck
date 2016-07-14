namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        stretch = 1 << 2,
        transform = 1 << 3,

        padding = 1 << 4,
        extents = 1 << 5,
        newbounds = 1 << 6,

        invalidate = 1 << 7,

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.stretch | DirtyFlags.transform,
        up = DirtyFlags.padding | DirtyFlags.extents | DirtyFlags.newbounds
    }
}