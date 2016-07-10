namespace puck.element.up.bounds {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.bounds))
            return false;
        if (!comp.visible || (comp.opacity * 255) < 0.5)
            return false;
        comp.taint(DirtyFlags.invalidate);
        la.rect.union(comp.paint, comp.bounds);
        return true;
    }
}