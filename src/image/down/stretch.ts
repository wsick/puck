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

        var fitter = fits[state.getEffectiveStretch()];
        fitter && fitter(comp.stretchTransform, state.naturalSize, state.size);

        if (mat3.equal(comp.stretchTransform, oldStretchTransform))
            return false;
        comp.taint(DirtyFlags.extents);
        return true;
    }

    interface IFitter {
        (final: Float32Array, natural: la.ISize, size: la.ISize);
    }
    interface IFitterHash {
        [stretch: number]: IFitter;
    }
    var fits: IFitterHash = {};
    fits[Stretch.none] = (mat: Float32Array, natural: la.ISize, size: la.ISize) => {
        mat3.identity(mat);
    };
    fits[Stretch.fill] = (mat: Float32Array, natural: la.ISize, size: la.ISize) => {
        mat3.createScale(size.width / natural.width, size.height / natural.height, mat);
    };
    fits[Stretch.uniform] = (mat: Float32Array, natural: la.ISize, size: la.ISize) => {
        var smin = Math.min(size.width / natural.width, size.height / natural.height);
        mat3.createScale(smin, smin, mat);
    };
    fits[Stretch.uniformToFill] = (mat: Float32Array, natural: la.ISize, size: la.ISize) => {
        var smax = Math.max(size.width / natural.width, size.height / natural.height);
        mat3.createScale(smax, smax, mat);
    };
}