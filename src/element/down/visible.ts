namespace puck.element.down.visible {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.visible))
            return false;
        var newVisible = bag.pcomposite.visible && (bag.state.visible === true);
        var changed = comp.visible !== newVisible;
        if (changed) {
            //TODO: taint `NewBounds`

        }
        comp.visible = newVisible;
        return changed;
    }
}