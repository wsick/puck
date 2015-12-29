namespace puck.element {
    export enum DirtyFlags {
        none = 0,
        opacity = 1 << 0,
        visible = 1 << 1,
        transform = 1 << 2,

        down = DirtyFlags.opacity | DirtyFlags.visible | DirtyFlags.transform
    }
}