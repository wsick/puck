namespace puck.image.down.mock {
    export function bag(): puck.element.down.IProcessorBag {
        return {
            state: puck.image.mock.state(),
            composite: puck.image.mock.composite(),
            pcomposite: puck.container.mock.composite(),
        };
    }
}