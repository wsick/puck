namespace puck.container.up.invalidate {
    import DirtyFlags = puck.element.DirtyFlags;

    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.invalidate))
            return false;

        for (var ccomps = bag.ccomposites, i = 0; i < ccomps.length; i++) {
            la.rect.union(comp.paint, ccomps[i].paint);
        }
        return true;
    }
}