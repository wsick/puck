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
        if (!comp.hasDirt(DirtyFlags.bounds))
            return false;
        rect.copyTo(comp.bounds, oldBounds);

        rect.init(0, 0, 0, 0, comp.bounds);
        for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
            rect.union(comp.bounds, ccomps[i].bounds);
        }
        rect.transform(comp.bounds, comp.transform);

        if (rect.equal(comp.bounds, oldBounds))
            return false;

        return puck.element.up.bounds(bag);
    }
}