/// <reference path="../../Stretch.ts" />

namespace puck.image.down.stretch {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    import mat3 = la.mat3;
    var oldStretchTransform = mat3.identity();

    export function process(bag: IProcessorBag): boolean {
        var state = <IImageState>bag.state,
            comp = <IImageComposite>bag.composite;
        if (!comp.hasDirt(DirtyFlags.stretch))
            return false;
        mat3.copyTo(comp.stretchTransform, oldStretchTransform);

        puck.fit.transform.calc(comp.stretchTransform, state.getEffectiveStretch(), state.natural, state.size);

        if (mat3.equal(comp.stretchTransform, oldStretchTransform))
            return false;
        comp.taint(DirtyFlags.extents);
        return true;
    }
}