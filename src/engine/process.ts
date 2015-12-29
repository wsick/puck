namespace puck.engine {
    // Process walks entire layer
    // -> Down phase is processed pre-order
    // -> Up phase is processed post-order
    export function process(el: element.IElement, parent?: element.IElement) {
        doDown(el, parent);
        for (var walker = walk.getWalker(el), cur = walker.next(); !!cur; cur = walker.next()) {
            process(cur, el);
        }
        doUp(el, parent);
    }

    function doDown(el: element.IElement, parent: element.IElement) {
        var processor = el.processor.down;
        var bag = {
            walker: walk.getWalker(el),
            state: el.state,
            composite: el.composite,
            pcomposite: parent.composite
        };
        if (processor.isTainted(bag))
            processor.process(bag);
    }

    function doUp(el: element.IElement, parent: element.IElement) {

    }
}