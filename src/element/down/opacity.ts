namespace puck.element.down.opacity {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.opacity))
            return false;
        var newOpacity = bag.pcomposite.opacity * bag.state.opacity;
        var changed = comp.opacity === newOpacity;
        comp.opacity = newOpacity;
        return changed;
    }
}