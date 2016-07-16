namespace puck.path.down.natural {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    var oldNatural = la.rect.init(0, 0, 0, 0);
    var activeFill = la.rect.init(0, 0, 0, 0);
    var activeStroke = la.rect.init(0, 0, 0, 0);

    export function process(bag: IProcessorBag): boolean {
        var state = <IPathState>bag.state,
            comp = <IPathComposite>bag.composite;

        if (!comp.hasDirt(DirtyFlags.padding))
            return false;
        comp.bounder.reset();
        la.rect.copyTo(comp.natural, oldNatural);

        comp.bounder.calc(state)
            .getFillRect(activeFill)
            .getStrokeRect(activeStroke);

        la.rect.union(activeFill, activeStroke, comp.natural);

        if (!la.rect.equal(comp.natural, oldNatural))
            return false;
        comp.taint(DirtyFlags.stretch);
        return true;
    }
}