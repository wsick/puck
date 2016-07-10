namespace puck.element.down.visible {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.visible))
            return false;
        var newVisible = bag.pcomposite.visible && (bag.state.visible === true);
        if (comp.visible === newVisible)
            return false;
        comp.taint(DirtyFlags.newbounds);
        comp.visible = newVisible;
        return true;
    }
}