namespace puck.polyline.down.points {
    import IProcessorBag = puck.element.down.IProcessorBag;
    import IPathComposite = puck.path.IPathComposite;
    import DirtyFlags = puck.element.DirtyFlags;

    export function process(bag: IProcessorBag): boolean {
        var state = <IPolylineState>bag.state,
            comp = <IPathComposite>bag.composite,
            path = state.path;

        if (!path) {
            comp.bounder.setPath(path = state.path = new curve.Path());
        } else if (!path.isEmpty) {
            return false;
        }

        for (var first = true, it = state.points.iter(), result = it.next(); !result.done; result = it.next()) {
            let cur = result.value;
            if (first) {
                first = false;
                path.moveTo(cur.x, cur.y);
            } else {
                path.lineTo(cur.x, cur.y);
            }
        }
        if (state.closed)
            path.closePath();

        comp.taint(DirtyFlags.padding); // force recalculation of natural bounds
        return true;
    }
}