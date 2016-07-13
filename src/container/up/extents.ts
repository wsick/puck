/// <reference path="../../element/DirtyFlags" />

namespace puck.container.up.extents {
    import rect = la.rect;
    import DirtyFlags = puck.element.DirtyFlags;
    var oldExtents = rect.init(0, 0, 0, 0);

    // Computes container's bounds
    // Bounds
    //   - union of all child bounds
    //   - owner's coordinate system
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.extents))
            return false;
        rect.copyTo(comp.extents, oldExtents);

        rect.init(0, 0, 0, 0, comp.extents);
        for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
            rect.union(comp.extents, ccomps[i].extents);
        }
        rect.transform(comp.extents, comp.transform, comp.extents);

        if (rect.equal(comp.extents, oldExtents))
            return false;
        rect.union(comp.paint, oldExtents);
        comp.taint(DirtyFlags.newbounds);
        return true;
    }
}