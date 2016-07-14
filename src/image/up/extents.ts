/// <reference path="../../Stretch.ts" />

namespace puck.image.up.extents {
    import IProcessorBag = puck.element.up.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    import rect = la.rect;
    import mat3 = la.mat3;
    var oldExtents = rect.init(0, 0, 0, 0);

    export function process(bag: IProcessorBag) {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.extents))
            return false;
        var state = <IImageState>bag.state;
        rect.copyTo(comp.extents, oldExtents);

        rect.init(0, 0, 0, 0, comp.extents);
        var fitter = fits[state.getEffectiveStretch()];
        fitter && fitter(comp.extents, state.naturalSize, state.size);
        rect.transform(comp.extents, comp.transform, comp.extents);

        if (rect.equal(comp.extents, oldExtents))
            return false;
        rect.union(comp.paint, oldExtents);
        comp.taint(DirtyFlags.newbounds);
        return true;
    }

    interface IFitter {
        (final: la.ISize, natural: la.ISize, size: la.ISize);
    }
    interface IFitterHash {
        [stretch: number]: IFitter;
    }
    var fits: IFitterHash = {};
    fits[Stretch.none] = (final: la.ISize, natural: la.ISize, size: la.ISize) => {
        final.width = natural.width;
        final.height = natural.height;
    };
    fits[Stretch.fill] = (final: la.ISize, natural: la.ISize, size: la.ISize) => {
        final.width = size.width;
        final.height = size.height;
    };
    fits[Stretch.uniform] = (final: la.ISize, natural: la.ISize, size: la.ISize) => {
        var sx = size.width / natural.width,
            sy = size.height / natural.height;
        final.width = size.width;
        final.height = size.height;
        if (sx < sy) {
            final.height = natural.height * sx;
        } else {
            final.width = natural.width * sy;
        }
    };
    fits[Stretch.uniformToFill] = (final: la.ISize, natural: la.ISize, size: la.ISize) => {
        var sx = size.width / natural.width,
            sy = size.height / natural.height;
        final.width = size.width;
        final.height = size.height;
        if (sx > sy) {
            final.height = natural.height * sx;
        } else {
            final.width = natural.width * sy;
        }
    };
}