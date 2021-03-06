namespace puck.element.down {
    export interface IProcessorBag {
        state: IElementState;
        composite: IElementComposite;
        pcomposite: IElementComposite; //parent composite
    }

    export class Processor {
        static instance = new Processor();

        isTainted(bag: IProcessorBag): boolean {
            return bag.composite.hasDirt(DirtyFlags.down);
        }

        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            if (opacity.process(bag))
                dirt |= DirtyFlags.opacity;
            if (visible.process(bag))
                dirt |= DirtyFlags.visible;
            if (transform.process(bag))
                dirt |= DirtyFlags.transform;
            return dirt;
        }

        clear(bag: IProcessorBag): this {
            bag.composite.untaint(DirtyFlags.down);
            return this;
        }
    }
}