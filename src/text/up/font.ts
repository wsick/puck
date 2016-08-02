namespace puck.text.up.font {
    import IProcessorBag = puck.element.up.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;

    export function process(bag: IProcessorBag): boolean {
        var state = <ITextState>bag.state,
            comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.font))
            return false;

        var size = state.size,
            oldWidth = size.width,
            oldHeight = size.height;
        size.width = puck.font.width.measure(state.font, state.text);
        size.height = puck.font.height.get(state.font);

        if (oldWidth !== size.width || oldHeight !== size.height) {
            comp.taint(DirtyFlags.extents);
            return true;
        }
        return false;
    }
}