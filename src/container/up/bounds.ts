/// <reference path="../../element/DirtyFlags" />

namespace puck.container.up.bounds {
    import rect = la.rect;
    import DirtyFlags = puck.element.DirtyFlags;
    var oldBounds = rect.init(0, 0, 0, 0);

    // Computes container's bounds
    // Bounds
    //   - union of all child bounds
    //   - owner's coordinate system
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

        if (rect.equal(comp.bounds, oldBounds))
            return false;

        if (!comp.visible || (comp.opacity * 255) < 0.5)
            return false;
        comp.taint(DirtyFlags.invalidate);
        la.rect.union(comp.paint, comp.bounds);
        return true;
    }
}