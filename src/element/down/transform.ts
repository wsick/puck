namespace puck.element.down.transform {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        if (!comp.hasDirt(DirtyFlags.transform))
            return false;
        var state = bag.state;
        var xo: IPoint = {
            x: state.transformOrigin.x * state.size.width,
            y: state.transformOrigin.y * state.size.height
        };
        mat3.createTranslate(-xo.x, -xo.y, comp.transform); //Shift into transformOrigin coordinate space
        mat3.apply(comp.transform, state.transform);
        mat3.translate(comp.transform, xo.x, xo.y); //Shift back out of transformOrigin coordinate space
        return true;
    }
}