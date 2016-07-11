namespace puck.element.render.validate {
    export function process(bag: IProcessorBag): boolean {
        var comp = bag.composite;
        return !!comp.visible && (comp.opacity * 255) >= 0.5;
    }
}