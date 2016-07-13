namespace puck.container.up.invalidate {
    import DirtyFlags = puck.element.DirtyFlags;

    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.invalidate))
            return false;

        var childPaint = la.rect.init(0, 0, 0, 0);
        for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
            la.rect.union(childPaint, ccomps[i].paint);
        }
        la.rect.transform(childPaint, comp.transform, childPaint);

        la.rect.union(comp.paint, childPaint);
        return true;
    }
}