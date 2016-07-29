namespace puck.font.height {
    var heights = [];

    export var cache = {
        hits: 0,
        misses: 0
    };

    export function get(font: IFont|string): number {
        var serial = font.toString();
        var height = heights[serial];
        if (height == null) {
            heights[serial] = height = measure(serial);
            cache.misses++;
        } else {
            cache.hits++;
        }
        return height;
    }
}