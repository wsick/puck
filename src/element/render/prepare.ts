namespace puck.element.render.prepare {
    export function process(bag: IProcessorBag) {
        bag.ctx.save();
        bag.ctx.preapply(bag.composite.transform);
    }
}
