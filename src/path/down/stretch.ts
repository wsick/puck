namespace puck.path.down.stretch {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import IElementComposite = puck.element.IElementComposite;
    import DirtyFlags = puck.element.DirtyFlags;
    import mat3 = la.mat3;
    var oldStretchTransform = mat3.identity();

    export function process(bag: IProcessorBag): boolean {
        var state = <IPathState>bag.state,
            comp = <IPathComposite>bag.composite;
        if (!comp.hasDirt(DirtyFlags.stretch))
            return false;
        mat3.copyTo(comp.stretchTransform, oldStretchTransform);

        puck.fit.transform.calc(comp.stretchTransform, state.getEffectiveStretch(comp), comp.natural, state.size);

        if (mat3.equal(comp.stretchTransform, oldStretchTransform))
            return false;
        comp.taint(DirtyFlags.extents);
        return true;
    }

}