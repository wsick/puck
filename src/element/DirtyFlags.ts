namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        stretch = 1 << 2,
        transform = 1 << 3,

        font = 1 << 4,
        padding = 1 << 5,
        extents = 1 << 6,
        newbounds = 1 << 7,
        invalidate = 1 << 8,

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.stretch | DirtyFlags.transform,
        up = DirtyFlags.font | DirtyFlags.padding | DirtyFlags.extents | DirtyFlags.newbounds | DirtyFlags.invalidate,
    }
}