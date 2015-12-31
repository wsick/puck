namespace puck.element.up {
    export interface IProcessorBag {
        state: IElementState;
        composite: IElementComposite;
        ccomposites: IElementComposite[];
    }

    export class Processor {
        static instance = new Processor();

        isTainted(bag: IProcessorBag): boolean {
            return bag.composite.hasDirt(DirtyFlags.up);
        }

        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            if (extents.process(bag))
                dirt |= DirtyFlags.extents;
            return dirt;
        }

        clear(bag: IProcessorBag): this {
            bag.composite.untaint(DirtyFlags.up);
            return this;
        }
    }
}