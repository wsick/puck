namespace puck.element.up.newbounds {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.newbounds) || !comp.visible || (comp.opacity * 255) < 0.5)
            return false;
        comp.invalidate();
        return true;
    }
}