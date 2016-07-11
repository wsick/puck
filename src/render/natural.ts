namespace puck.render {
    export function getNaturalCanvasSize(canvas: HTMLCanvasElement): la.ISize {
        var zoomFactor = zoom.calc();
        return {
            width: canvas.offsetWidth * zoomFactor,
            height: canvas.offsetHeight * zoomFactor
        };
    }
}