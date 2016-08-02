namespace puck.font.width {
    var dummy: HTMLCanvasElement;

    export function measure(font: IFont|string, text: string): number {
        if (!dummy) {
            dummy = document.createElement("canvas");
        }
        var ctx = dummy.getContext("2d");
        ctx.font = font.toString();
        return ctx.measureText(text).width;
    }
}