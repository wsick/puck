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
        rect.grow(comp.extents, comp.padding);
        rect.transform(comp.extents, comp.transform, comp.extents);

        if (rect.equal(comp.extents, oldExtents))
            return false;
        comp.taint(DirtyFlags.newbounds);
        return true;
    }
}