namespace puck.element.down.transform {
    import mat3 = la.mat3;
    var oldTransform = mat3.identity();
    
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.transform))
            return false;
        mat3.copyTo(comp.transform, oldTransform);
        var state = bag.state;

        // Adjust transform for offset
        mat3.createTranslate(state.offset.x, state.offset.y, comp.transform);

        // Apply transform in coordinates of transformOrigin
        var xo: la.IPoint = {
            x: state.transformOrigin.x * state.size.width,
            y: state.transformOrigin.y * state.size.height
        };
        mat3.translate(comp.transform, -xo.x, -xo.y); //Shift into transformOrigin coordinate space
        mat3.apply(comp.transform, state.transform);
        mat3.translate(comp.transform, xo.x, xo.y); //Shift back out of transformOrigin coordinate space

        if (!mat3.equal(comp.transform, oldTransform)) {
            comp.taint(DirtyFlags.extents);
        }
        return true;
    }
}