namespace puck.fit.transform {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import DirtyFlags = puck.element.DirtyFlags;
    import mat3 = la.mat3;

    export function calc(transform: Float32Array, stretch: Stretch, natural: la.IRect, size: la.ISize) {
        var fitter = fits[stretch];
        fitter && fitter(transform, natural, size);
    }

    interface IFitter {
        (final: Float32Array, natural: la.IRect, size: la.ISize);
    }
    interface IFitterHash {
        [stretch: number]: IFitter;
    }
    var fits: IFitterHash = {};
    fits[Stretch.none] = (mat: Float32Array, natural: la.IRect, size: la.ISize) => {
        mat3.identity(mat);
    };
    fits[Stretch.fill] = (mat: Float32Array, natural: la.IRect, size: la.ISize) => {
        mat3.createTranslate(-natural.x, -natural.y, mat);
        mat3.scale(mat, size.width / natural.width, size.height / natural.height);
    };
    fits[Stretch.uniform] = (mat: Float32Array, natural: la.IRect, size: la.ISize) => {
        mat3.createTranslate(-natural.x, -natural.y, mat);
        var smin = Math.min(size.width / natural.width, size.height / natural.height);
        mat3.scale(mat, smin, smin);
    };
    fits[Stretch.uniformToFill] = (mat: Float32Array, natural: la.IRect, size: la.ISize) => {
        mat3.createTranslate(-natural.x, -natural.y, mat);
        var smax = Math.max(size.width / natural.width, size.height / natural.height);
        mat3.scale(mat, smax, smax);
    };
}