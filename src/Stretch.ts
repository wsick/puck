namespace puck {
    /*
     * aspect ratio (ar) = width/height
     *
     * none:          ignores element's width/height
     * fill:          stretches image to fill width and height
     * uniform:       stretches image to fill width or height (smallest factor)
     *    natural ar > element ar => blank horizontal space
     *    natural ar < element ar => blank vertical space
     * uniformToFill: stretches image to fill width or height (largest factor)
     *    natural ar > element ar => vertical overpaint
     *    natural ar < element ar => horizontal overpaint
     */

    export enum Stretch {
        none = 0,
        fill = 1,
        uniform = 2,
        uniformToFill = 3,
    }
}