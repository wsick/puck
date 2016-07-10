namespace puck.element.down.opacity {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.opacity))
            return false;
        var newOpacity = bag.pcomposite.opacity * bag.state.opacity;
        if (comp.opacity === newOpacity)
            return false;
        comp.taint(DirtyFlags.newbounds);
        comp.opacity = newOpacity;
        return true;
    }
}