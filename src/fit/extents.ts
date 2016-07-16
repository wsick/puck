namespace puck.fit.extents {
    import mat3 = la.mat3;

    export function calc(extents: la.IRect, stretch: Stretch, natural: la.IRect, size: la.ISize) {
        var fitter = fits[stretch];
        fitter && fitter(extents, natural, size);
    }

    interface IFitter {
        (final: la.IRect, natural: la.IRect, size: la.ISize);
    }
    interface IFitterHash {
        [stretch: number]: IFitter;
    }
    var fits: IFitterHash = {};
    fits[Stretch.none] = (final: la.IRect, natural: la.IRect, size: la.ISize) => {
        la.rect.copyTo(natural, final);
    };
    fits[Stretch.fill] = (final: la.IRect, natural: la.IRect, size: la.ISize) => {
        final.width = size.width;
        final.height = size.height;
    };
    fits[Stretch.uniform] = (final: la.IRect, natural: la.IRect, size: la.ISize) => {
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
    fits[Stretch.uniformToFill] = (final: la.IRect, natural: la.IRect, size: la.ISize) => {
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