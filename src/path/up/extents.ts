namespace puck.path.up.extents {
    import IProcessorBag = puck.element.up.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    import rect = la.rect;
    import mat3 = la.mat3;
    var oldExtents = rect.init(0, 0, 0, 0);

    export function process(bag: IProcessorBag) {
        var comp = <IPathComposite>bag.composite;
        if (!comp.hasDirt(DirtyFlags.extents))
            return false;
        var state = <IPathState>bag.state;
        rect.copyTo(comp.extents, oldExtents);

        rect.init(0, 0, 0, 0, comp.extents);
        puck.fit.extents.calc(comp.extents, state.getEffectiveStretch(comp), comp.natural, state.size);
        rect.transform(comp.extents, comp.transform, comp.extents);

        if (rect.equal(comp.extents, oldExtents))
            return false;
        rect.union(comp.paint, oldExtents);
        comp.taint(DirtyFlags.newbounds);
        return true;
    }
}