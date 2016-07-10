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

        // We are pushing dirty flags up to parent
        // If extents changed, parent's bounds changed
        // If bounds changed (or extents), parent should be invalidated
        process(bag: IProcessorBag): DirtyFlags {
            var dirt = DirtyFlags.none;
            if (extents.process(bag))
                dirt |= DirtyFlags.bounds;
            if (bounds.process(bag))
                dirt |= DirtyFlags.invalidate;
            return dirt;
        }

        clear(bag: IProcessorBag): this {
            bag.composite.untaint(DirtyFlags.up);
            return this;
        }
    }
}