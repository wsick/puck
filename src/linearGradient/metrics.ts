namespace puck.linearGradient {
    export function calcMetrics(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        if (dir.y === 0) {
            if (dir.x < 0)
                W(dir, first, last, bounds);
            else if (dir.x !== 0)
                E(dir, first, last, bounds);
        } else if (dir.x === 0) {
            if (dir.y < 0)
                N(dir, first, last, bounds);
            else if (dir.y !== 0)
                S(dir, first, last, bounds);
        } else if (dir.x < 0 && dir.y < 0) { // e\s
            NW(dir, first, last, bounds);
        } else if (dir.x < 0 && dir.y > 0) { // e/s
            SW(dir, first, last, bounds);
        } else if (dir.x > 0 && dir.y < 0) { // s/e
            NE(dir, first, last, bounds);
        } else if (dir.x > 0 && dir.y > 0) { // s\e
            SE(dir, first, last, bounds);
        }
    }

    //+x,0y
    function E(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxX = bounds.x + bounds.width;
        while (first.x >= bounds.x)
            first.x -= dir.x;
        while (last.x <= maxX)
            last.x += dir.x;
    }

    //-x,0y
    function W(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxX = bounds.x + bounds.width;
        while (first.x <= maxX)
            first.x -= dir.x;
        while (last.x >= bounds.x)
            last.x += dir.x;
    }

    //0x,+y
    function S(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxY = bounds.y + bounds.height;
        while (first.y >= bounds.y)
            first.y -= dir.y;
        while (last.y <= maxY)
            last.y += dir.y;
    }

    //0x,-y
    function N(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxY = bounds.y + bounds.height;
        while (first.y <= maxY)
            first.y -= dir.y;
        while (last.y >= bounds.y)
            last.y += dir.y;
    }

    //-x,-y
    function NW(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxX = bounds.x + bounds.width;
        var maxY = bounds.y + bounds.height;
        while (first.x <= maxX && first.y <= maxY) {
            first.x -= dir.x;
            first.y -= dir.y;
        }
        while (last.x >= bounds.x && last.y >= bounds.y) {
            last.x += dir.x;
            last.y += dir.y;
        }

    }

    //-x,+y
    function SW(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxX = bounds.x + bounds.width;
        var maxY = bounds.y + bounds.height;
        while (first.x <= maxX && first.y >= bounds.y) {
            first.x -= dir.x;
            first.y -= dir.y;
        }
        while (last.x >= bounds.x && last.y <= maxY) {
            last.x += dir.x;
            last.y += dir.y;
        }
    }

    //+x,-y
    function NE(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxX = bounds.x + bounds.width;
        var maxY = bounds.y + bounds.height;
        while (first.x >= bounds.x && first.y <= maxY) {
            first.x -= dir.x;
            first.y -= dir.y;
        }
        while (last.x <= maxX && last.y >= bounds.y) {
            last.x += dir.x;
            last.y += dir.y;
        }
    }

    //+x,+y
    function SE(dir: la.IPoint, first: la.IPoint, last: la.IPoint, bounds: la.IRect) {
        var maxX = bounds.x + bounds.width;
        var maxY = bounds.y + bounds.height;
        while (first.x >= bounds.x && first.y >= bounds.y) {
            first.x -= dir.x;
            first.y -= dir.y;
        }
        while (last.x <= maxX && last.y <= maxY) {
            last.x += dir.x;
            last.y += dir.y;
        }
    }
}