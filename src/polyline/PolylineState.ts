/// <reference path="../visual/VisualState" />

namespace puck.polyline {
    export interface IPolylineState extends path.IPathState {
        points: Points;
        closed: boolean;
    }
    export class PolylineState extends path.PathState implements IPolylineState {
        points: Points = new Points();
        closed: boolean = false;

        reset(): this {
            super.reset();
            this.points.clear();
            this.closed = false;
            return this;
        }
    }
}