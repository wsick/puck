namespace puck.element.up.extents {
    import rect = la.rect;
    var oldExtents = rect.init(0, 0, 0, 0);

    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.extents))
            return false;
        var state = bag.state;
        rect.copyTo(comp.extents, oldExtents);
        rect.init(0, 0, state.size.width, state.size.height, comp.extents);
        rect.transform(comp.extents, comp.transform);
        return !rect.equal(comp.extents, oldExtents);
    }
}