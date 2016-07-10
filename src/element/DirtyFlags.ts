namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        transform = 1 << 2,

        extents = 1 << 3,
        newbounds = 1 << 4,
        invalidate = 1 << 5,

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.transform,
        up = DirtyFlags.extents | DirtyFlags.newbounds | DirtyFlags.invalidate
    }
}