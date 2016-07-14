namespace puck.image.up.mock {
    export function bag(): puck.element.up.IProcessorBag {
        return {
            state: puck.image.mock.state(),
            composite: puck.image.mock.composite(),
            ccomposites: null,
        };
    }
}