namespace puck.container.up.bounds {
    import rect = la.rect;
    var oldBounds = rect.init(0, 0, 0, 0);

    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.extents))
            return false;
        var state = bag.state;
        rect.copyTo(comp.bounds, oldBounds);

        rect.init(0, 0, 0, 0, comp.bounds);
        for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
            rect.union(comp.bounds, ccomps[i].bounds);
        }
        rect.transform(comp.bounds, comp.transform);
        rect.union(comp.bounds, comp.extents);

        return !rect.equal(comp.bounds, oldBounds);
    }
}