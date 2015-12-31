namespace puck.engine {
    // Process walks entire layer
    // -> Down phase is processed pre-order
    // -> Up phase is processed post-order
    export function process(el: element.IElement, parent?: element.IElement) {
        doDown(el, parent);
        var ccomposites: IElementComposite[] = [];
        for (var walker = walk.getWalker(el), cur = walker.next(); !!cur; cur = walker.next()) {
            process(cur, el);
            ccomposites.push(cur.composite);
        }
        doUp(el, parent, ccomposites);
    }

    const EMPTY_DOWN_COMPOSITE = <IContainerComposite>{
        opacity: 1.0,
        visible: true,
        transform: la.mat3.identity(),
        extents: la.rect.init(0, 0, 0, 0),
        hasDirt(match: DirtyFlags) {
            return false
        },
        taint(newDirt: DirtyFlags) {
        },
        untaint(oldDirt: DirtyFlags) {
        },
        reset() {
        }
    };

    function doDown(el: element.IElement, parent: element.IElement) {
        var processor = el.processor.down;
        var bag = <element.down.IProcessorBag>{
            walker: walk.getWalker(el),
            state: el.state,
            composite: el.composite,
            pcomposite: parent ? parent.composite : EMPTY_DOWN_COMPOSITE
        };
        if (processor.isTainted(bag)) {
            processor.process(bag);
            processor.clear(bag);
        }
    }

    function doUp(el: element.IElement, parent: element.IElement, ccomposites: IElementComposite[]) {
        var processor = el.processor.up;
        var bag = <element.up.IProcessorBag>{
            state: el.state,
            composite: el.composite,
            ccomposites: ccomposites
        };
        if (processor.isTainted(bag)) {
            var dirt = processor.process(bag);
            if (parent)
                parent.composite.taint(dirt);
            processor.clear(bag);
        }
    }
}