namespace puck.element.down.transform {
    import mat3 = la.mat3;
    var oldTransform = mat3.identity();
    
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.transform))
            return false;
        mat3.copyTo(comp.transform, oldTransform);
        var state = bag.state;

        // Apply transform in coordinates of transformOrigin
        var xo = state.mapTransformOrigin(comp);
        mat3.createTranslate(-xo.x, -xo.y, comp.transform); //Shift into transformOrigin coordinate space
        mat3.apply(comp.transform, state.transform);
        mat3.translate(comp.transform, xo.x, xo.y); //Shift back out of transformOrigin coordinate space

        // Adjust transform for offset
        mat3.translate(comp.transform, state.offset.x, state.offset.y);

        if (!mat3.equal(comp.transform, oldTransform)) {
            comp.taint(DirtyFlags.extents);
        }
        return true;
    }
}